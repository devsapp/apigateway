import BaseComponent from './common/base';
import { InputProps } from './common/entity';
interface ExecuteApiResult {
    type: 'create' | 'updateNeedlessAbolish' | 'updateNeedAbolish';
    name: string;
    id?: string;
    modifySuccess: boolean;
    publishSuccess?: boolean;
    error?: any;
}
export default class ComponentDemo extends BaseComponent {
    client: any;
    region: any;
    constructor(props: any);
    private titleCase;
    private getClient;
    private invokeApi;
    searchGroupByName(client: any, GroupName: any): Promise<any>;
    tryExecuteFunction(fc: any, currentRetryTime?: number, waittime?: number, retryError?: string): Promise<void>;
    reCreateOrUpdateApi(client: any, params: any): Promise<any>;
    /**
     * 创建api
     */
    createOrUpdateApi(client: any, params: any): Promise<ExecuteApiResult>;
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
        apiResult: any[];
        totalApiNumber: any;
        successApiNumber: number;
        failedApiNumber: number;
        failedApiNames: any[];
    }>;
}
export {};
