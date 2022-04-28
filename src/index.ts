import Core from '@alicloud/pop-core';
import _ from 'loadsh';
import BaseComponent from './common/base';
import logger from './common/logger';
import { InputProps, BASIC_API_INPUTS } from './common/entity';

const SHARED_API_INSTANCE = 'api-shared-vpc-001';
const API_SERVICE_ADDRESS_ERROR = 'InvalidApiServiceAddressError';
export default class ComponentDemo extends BaseComponent {

  public client;
  public region;
  constructor(props) {
    super(props);
  }


  private titleCase(data) {
    return Object.keys(data).reduce((map, key) => {
      const newKey = key.slice(0, 1).toUpperCase() + key.slice(1);
      const newData = data[key];
      if (Object.prototype.toString.call(newData) === '[object Object]') {
        map[newKey] = this.titleCase(newData);
      } else if (Object.prototype.toString.call(newData) === '[object Array]') {
        map[newKey] = newData.map((item) => {
          if (Object.prototype.toString.call(item) === '[object Object]' || Object.prototype.toString.call(newData) === '[object Array]') {
            return this.titleCase(item);
          }
          return item;
        });
      } else {
        map[newKey] = newData
      }
      return map;
    }, {})
  }

  private getClient(credentials, region) {
    if (!this.client || this.region !== region) {
      this.region = region;
      this.client = new Core({
        accessKeyId: credentials.AccessKeyID,
        accessKeySecret: credentials.AccessKeySecret,
        endpoint: `https://apigateway.${region}.aliyuncs.com`,
        apiVersion: '2016-07-14'
      });
    }
    return this.client;
  }

  private async invokeApi(method, client, params) {
    const requestOption = {
      method: 'POST',
      timeout: 20000
    };
    return await client.request(method, params, requestOption);
  }


  async searchGroupByName(client, GroupName) {
    return await this.invokeApi('DescribeApiGroups', client, { GroupName })
  }

  async tryExecuteFunction(fc, currentRetryTime = 1, waittime = 5, retryError = API_SERVICE_ADDRESS_ERROR) {
    logger.info('The current number of retries is ' + currentRetryTime)
    const retryTime = 5;
    const waitFun: any = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('');
        }, waittime * 1000)
      });
    }
    await waitFun();
    try {
      await fc();
    } catch (e) {
      if (e.name.indexOf(retryError) !== -1 && currentRetryTime < retryTime) {
        await this.tryExecuteFunction(fc, ++currentRetryTime, waittime, retryError);
      }
    }
  }

  async reCreateOrUpdateApi(client, params) {
    return await this.invokeApi('CreateApi', client, params);
  }
  /**
   * 创建api
   */
  async createOrUpdateApi(client, params) {
    try {
      return await this.invokeApi('CreateApi', client, params);
    } catch (e) {
      
      if (e.name.indexOf(API_SERVICE_ADDRESS_ERROR) !== -1) { //遇到绑定后端服务的地址错误，进行重试
        console.log('params is', JSON.stringify(params,null,4));
        console.log('Error tag:', e.name);
        logger.info('start retry');
        await this.tryExecuteFunction(async () => {
          await this.reCreateOrUpdateApi(client, params);
        });
      }
      const api = await this.QueryApiByName(client, { ApiName: params.ApiName, GroupId: params.GroupId });
      const [singleApi = {}] = _.get(api, 'ApiSummarys.ApiSummary', []);
      let apiId = singleApi.ApiId
      if (singleApi) {
        apiId = singleApi.ApiId;
      }
      if (apiId) {
        params.ApiId = apiId;
        try {
          await this.invokeApi('ModifyApi', client, params);
        } catch (e) {
          // 限制线上环境的自由变更
          const { GroupId, ApiId, StageName = 'RELEASE' } = params;
          await this.invokeApi('AbolishApi', client, { GroupId, ApiId, StageName }); // 下线
          await this.invokeApi('ModifyApi', client, params); // 再更新
        }

      }
      return { ApiId: apiId };
    }

  }

  async QueryApiByName(client, { ApiName, GroupId }) {
    return await this.invokeApi('DescribeApis', client, { ApiName, GroupId });

  }

  /**
   * 
   * @param client 创建分组
   * @param params 
   */
  private async getGroupId(client, params) {
    const { groupName } = params;
    const groupNow = await this.searchGroupByName(client, groupName);
    let result: any = {};
    if (groupNow) {
      result = _.get(groupNow, 'ApiGroupAttributes.ApiGroupAttribute[0]');
      if (result && result.GroupId) {
        return result;
      } else {

        params = this.titleCase(params);
        result = await this.invokeApi('CreateApiGroup', client, params);
        return result;
      }
    }

  }

  private async modifyGroup(client, params) {
    await this.invokeApi('ModifyApiGroup', client, params);
  }

  private async publishApi(client, params) {
    return await this.invokeApi('DeployApi', client, params);
  }

  private async executeGroup(client, { groupName, regionId, basePath, description, instanceId }) {
    const { GroupId, SubDomain } = await this.getGroupId(client, { groupName, regionId, basePath, description, instanceId });
    if (GroupId) {
      try {
        await this.modifyGroup(client, { PassthroughHeaders: '', GroupId });
      } catch (e) {
      }
    }
    return { GroupId, SubDomain }
  }

  private async setDomain(client, params) {
    const defaultDomainData = {
      DomainName: '',
      CustomDomainType: 'internet',
      BindStageName: 'RELEASE'
    };
    const data = _.merge({}, defaultDomainData, params);
    try {
      await this.invokeApi('SetDomain', client, data);
    } catch (e) {

    }

  }
  /**
   * 域名绑定
   * @param inputs 
   */
  public async bindDomain(inputs: InputProps) {
    const { credentials } = inputs;

    let { groupName, stageName = 'RELEASE', regionId, basePath = '/', description = '', instanceId = SHARED_API_INSTANCE, customerDomain } = inputs.props;
    let client = this.getClient(credentials, regionId);
    let { GroupId } = await this.executeGroup(client, { groupName, regionId, basePath, description, instanceId });

    if (customerDomain) { // 如果设定了自定义域名
      await this.setDomain(client, {
        GroupId,
        DomainName: customerDomain,
        RegionId: regionId,
        BindStageName: stageName
      })
    }
  }

  /**
  * demo 实例
  * @param inputs
  * @returns
  */
  public async deploy(inputs: InputProps) {
    const { credentials } = inputs;
    const { AccountID } = credentials;
    const apiArn = `acs:ram::${AccountID}:role/aliyunserviceroleforapigateway`;
    let { apis, groupName, stageName = 'RELEASE', regionId, basePath = '/', description = '', instanceId = SHARED_API_INSTANCE, customerDomain } = inputs.props;
    const promiseData = [];
    let client = this.getClient(credentials, regionId);
    let { GroupId, SubDomain } = await this.executeGroup(client, { groupName, regionId, basePath, description, instanceId });
    apis.forEach((api) => {
      promiseData.push(new Promise(async (resolve, reject) => {
        try {
          const clonedApiData = _.cloneDeepWith(BASIC_API_INPUTS);
          groupName = api.groupName || groupName; // 可以在api单独指定groupName;
          instanceId = api.instanceId || instanceId; //可以在api单独指定instanceId;
          regionId = api.regionId || regionId;
          if (this.region! == regionId) { //  当自定义的api 与全局不同的时候重新处理
            client = this.getClient(credentials, regionId);
            let groupData = await this.executeGroup(client, { groupName, regionId, basePath, description, instanceId });
            GroupId = groupData.GroupId;
            SubDomain = groupData.SubDomain;
          }
          const newData = _.merge({}, clonedApiData, api, { GroupId });
          newData.serviceConfig.functionComputeConfig.roleArn = apiArn;
          let transformedData: any = this.titleCase(newData);
          transformedData.RequestConfig = JSON.stringify(transformedData.RequestConfig);
          transformedData.ServiceConfig = JSON.stringify(transformedData.ServiceConfig);
          const data = await this.createOrUpdateApi(client, transformedData);
          if (data.ApiId) {
            let { StageName, Description, GroupId } = transformedData;
            StageName = StageName || stageName;
            await this.publishApi(client, { StageName, ApiId: data.ApiId, Description, GroupId })
          }
          setTimeout(() => {
            if (data.ApiId) {
              console.log(`${api.apiName} is successed deployed`);
            } else {
              console.log(`${api.apiName} is failed to deployed`);
            }

            resolve(api.apiName);
          }, 500);
        } catch (e) {
          reject(e);
        }
      }))

    });

    const apiNameList = await Promise.all(promiseData);

    this.__report({
      name: 'apigateway',
      access: _.get(inputs, 'project.access'),
      content: {
        groupName,
        apis: apiNameList,
        domain: customerDomain || SubDomain
      }
    })
    return { domain: SubDomain };
  }

}
