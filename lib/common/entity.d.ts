export interface ICredentials {
    AccountID?: string;
    AccessKeyID?: string;
    AccessKeySecret?: string;
    SecretID?: string;
    SecretKey?: string;
    SecretAccessKey?: string;
    KeyVaultName?: string;
    TenantID?: string;
    ClientID?: string;
    ClientSecret?: string;
    PrivateKeyData?: string;
}
export interface InputProps {
    props: any;
    credentials: ICredentials;
    appName: string;
    project: {
        component: string;
        access: string;
        projectName: string;
    };
    command: string;
    args: string;
    path: {
        configPath: string;
    };
}
export interface RequestConfig {
    RequestProtocol: string;
    RequestHttpMethod: string;
    RequestPath: string;
    RequestMode: string;
    BodyFormat: string;
    PostBodyDescription: string;
}
export interface FunctionComputeConfig {
    fcRegionId: string;
    serviceName: string;
    functionName: string;
    roleArn: string;
}
export interface ServiceConfig {
    ServiceProtocol: string;
    ServiceAddress?: string;
    ServicePath?: string;
    ServiceHttpMethod?: string;
    ServiceTimeout: string;
    ContentTypeCatagory?: string;
    ContentTypeValue?: string;
    Mock?: string;
    MockResult?: string;
    VpcConfig?: string;
    FunctionComputeConfig: FunctionComputeConfig;
}
export interface RequestParameter {
    ApiParameterName: string;
    Location: string;
    ParameterType: string;
    Required: 'REQUIRED' | 'OPTIONAL';
    DefaultValue: string;
    DemoValue: string;
    MaxValue: string;
    MinValue: string;
    MaxLength: string;
    MinLength: string;
    RegularExpression: string;
    JsonScheme: string;
    EnumValue: string;
    DocShow: string;
    DocOrder: string;
    Description: string;
}
export interface ServiceParameter {
    ServiceParameterName: string;
    Location: string;
    ParameterType: string;
    ParameterCatalog: string;
}
export interface ServiceParameterMap {
    ServiceParameterName: string;
    RequestParameterName: string;
}
export interface ApiInputProps {
    GroupId: string;
    ApiName: string;
    Visibility: 'PUBLIC' | 'PRIVATE';
    Description?: string;
    AuthType?: string;
    RequestConfig: RequestConfig;
    ServiceConfig: ServiceConfig;
    RequestParameters?: RequestParameter[];
    ConstantParameters?: string;
    ServiceParameters?: ServiceParameter[];
    ServiceParametersMap: ServiceParameterMap[];
    ResultType: string;
    ResultSample: string;
    FailResultSample: string;
    ErrorCodeSamples: string;
    ResultDescriptions: string;
    OpenIdConnectConfig: string;
    AllowSignatureMethod: string;
    WebSocketApiType: string;
    ResultBodyModel: string;
}
export declare const BASIC_API_INPUTS: {
    apiName: string;
    groupId: string;
    forceNonceCheck: boolean;
    disableInternet: boolean;
    authType: string;
    visibility: string;
    requestConfig: {
        requestProtocol: string;
        requestHttpMethod: string;
        requestPath: string;
        requestMode: string;
        bodyModel: string;
        bodyFormat: string;
        postBodyDescription: string;
    };
    serviceConfig: {
        serviceProtocol: string;
        serviceHttpMethod: string;
        serviceAddress: string;
        serviceTimeout: number;
        servicePath: string;
        contentTypeValue: string;
        contentTypeCatagory: string;
        mock: string;
        mockResult: string;
        ossConfig: {
            action: string;
        };
        serviceVpcEnable: string;
        vpcConfig: {
            vpcScheme: string;
        };
        functionComputeConfig: {
            fcType: string;
            fcRegionId: string;
            roleArn: string;
            method: string;
            fcBaseUrl: string;
            path: string;
            contentTypeCategory: string;
            contentTypeValue: string;
            onlyBusinessPath: boolean;
        };
    };
    resultType: string;
    resultSample: string;
    failResultSample: string;
    errorCodeSamples: any[];
    requestParameters: any[];
    serviceParametersMap: any[];
    serviceParameters: any[];
    allowSignatureMethod: string;
    appCodeAuthType: string;
    webSocketApiType: string;
};
