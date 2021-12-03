import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class ComponentDemo extends BaseComponent {
    client: any;
    region: any;
    constructor(props: any);
    private titleCase;
    private getClient;
    private invokeApi;
    searchGroupByName(client: any, GroupName: any): Promise<any>;
    /**
     * 创建api
     */
    createOrUpdateApi(client: any, params: any): Promise<any>;
    QueryApiByName(client: any, { ApiName, GroupId }: {
        ApiName: any;
        GroupId: any;
    }): Promise<any>;
    /**
     *
     * @param client 创建分组
     * @param params
     */
    private getGroupId;
    private modifyGroup;
    private publishApi;
    private executeGroup;
    private setDomain;
    /**
     * 域名绑定
     * @param inputs
     */
    bindDomain(inputs: InputProps): Promise<void>;
    /**
    * demo 实例
    * @param inputs
    * @returns
    */
    deploy(inputs: InputProps): Promise<{
        domain: any;
    }>;
}
