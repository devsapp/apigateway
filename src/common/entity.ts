export interface ICredentials {
    AccountID?: string,
    AccessKeyID?: string,
    AccessKeySecret?: string,
    SecretID?: string,
    SecretKey?: string,
    SecretAccessKey?: string,
    KeyVaultName?: string,
    TenantID?: string,
    ClientID?: string,
    ClientSecret?: string,
    PrivateKeyData?: string
  
  }
  export interface InputProps {
    props: any, // 用户自定义输入
    credentials: ICredentials, // 用户秘钥
    appName: string, // 
    project: {
      component: string, // 组件名（支持本地绝对路径）
      access: string, // 访问秘钥名
      projectName: string, // 项目名
    },
    command: string, // 执行指令
    args: string, // 命令行 扩展参数
    path: {
      configPath: string // 配置路径
    }
  }

  export interface RequestConfig {
    RequestProtocol: string, // API 支持的协议类型，可以多选，多选情况下以英文逗号隔开，如："HTTP,HTTPS"，取值为：HTTP、HTTPS
    RequestHttpMethod: string, // HTTP Method，取值为：GET、POST、DELETE、PUT、HEADER、TRACE、PATCH、CONNECT、OPTIONS
    RequestPath: string,  // API path
    RequestMode: string, // 请求的模式，取值为：MAPPING、PASSTHROUGH，分别表示入参映射、入参透传
    BodyFormat: string, // POST/PUT请求时，表示数据以何种方式传递给服务器，取值为：FORM、STREAM，分别表示表单形式(k-v对应)、字节流形式。当RequestMode值为MAPPING时有效。
    PostBodyDescription: string // Body描述
  }

  export interface FunctionComputeConfig {
    fcRegionId: string, // 函数计算所在Region
    serviceName: string, // 函数计算定义的ServiceName
    functionName: string,  // 函数计算定义的FunctionName
    roleArn: string, // Ram授权给API网关访问函数计算的arn
  }

  export interface ServiceConfig {
    ServiceProtocol: string, // 后端服务协议类型，目前只支持HTTP/HTTPS/FunctionCompute
    ServiceAddress?: string, // 调用后端服务地址
    ServicePath?: string,  // 调用后端服务path
    ServiceHttpMethod?: string, // 调用后端服务HTTP协议时的Method，取值为：GET、POST、DELETE、PUT、HEADER、TRACE、PATCH、CONNECT、OPTIONS
    ServiceTimeout: string, // 后端服务超时时间，单位：毫秒
    ContentTypeCatagory?: string, // 	调用后端服务HTTP服务时，ContentType头的取值策略： DEFAULT：使用API网关默认的值 CUSTOM：自定义 CLIENT：使用客户端上行的ContentType的头
    ContentTypeValue?: string, // 调用后端服务HTTP服务，ContentTypeCatagory的值为DEFAULT或者CUSTOM时，ContentType头的取值
    Mock?: string // 调用后端服务HTTP服务，ContentTypeCatagory的值为DEFAULT或者CUSTOM时，ContentType头的取值
    MockResult?:string,
    VpcConfig?:string, //如果启用VPC通道，VPC通道相关配置项，详情见 VpcConfig
    FunctionComputeConfig: FunctionComputeConfig // 当后端是函数计算时，即ServiceProtocol=FunctionCompute，需要配置函数计算相关参数，详情见 FunctionComputeConfig
  }

  export interface RequestParameter {
    ApiParameterName: string,  //参数名
    Location: string, // 参数位置，取值为：BODY、HEAD、QUERY、PATH
    ParameterType: string,  // 参数类型，取值为：String、Int、Long、Float、Double、Boolean，分别表示字符、整型、长整型、单精度浮点型、双精度浮点型、布尔
    Required: 'REQUIRED'|'OPTIONAL', // 是否必填，取值为：REQUIRED、OPTIONAL，分别表示必填、不必填
    DefaultValue: string, // 默认值
    DemoValue: string, // 示例
    MaxValue: string, // 当ParameterType=Int、Long、Float、Double，参数的最大值限定
    MinValue: string, // 当ParameterType=Int、Long、Float、Double，参数的最小值限定
    MaxLength: string, // 	当ParameterType=String，参数的最大长度限定
    MinLength: string, // 当ParameterType=String，参数的最小长度限定
    RegularExpression: string, // 当ParameterType=String，参数验证（正则表达式）
    JsonScheme: string, // 	当ParameterType=String，JSON验证（Json Scheme）
    EnumValue: string, // 	当ParameterType=Int、Long、Float、Double或String，允许输入的散列值，不同的值用英文的逗号分隔，形如：1,2,3,4,9或A,B,C,E,F
    DocShow: string, // 文档可见，取值为：PUBLIC、PRIVATE
    DocOrder: string, // 文档中顺序
    Description: string // 参数描述
  }
  
  export interface ServiceParameter {
    ServiceParameterName: string,
    Location: string, // BODY、HEAD、QUERY、PATH
    ParameterType: string, // STRING、NUMBER、BOOLEAN分别表示字符、数值、布尔
    ParameterCatalog: string // 请求参数的类型，取值为：REQUEST、CONSTANT、SYSTEM，分别表示普通请求参数，常量参数和系统参数。其中REQUEST是需要API调用者传值，CONSTANT、SYSTEM两种类型对API调用者不可见
  }
  export interface ServiceParameterMap {
    ServiceParameterName: string,
    RequestParameterName: string
  }
  export interface ApiInputProps {
    GroupId: string,
    ApiName: string,
    Visibility: 'PUBLIC'|'PRIVATE',
    Description?:string,
    AuthType?:string,
    RequestConfig: RequestConfig, // Consumer向网关发送API请求的相关配置项。
    ServiceConfig: ServiceConfig,  // 网关向后端服务发送API请求的相关配置项。
    RequestParameters?: RequestParameter[], // Consumer向网关发送API请求的参数描述。
    SystemParameters?: string,  // 参数取值来源 API：
    ConstantParameters?:string, // 参数取值来源 API：
    ServiceParameters?: ServiceParameter[], // 网关向后端服务发送API请求的参数描述。
    ServiceParametersMap: ServiceParameterMap[], // Consumer向网关发送请求的参数和网关向后端服务发送的请求的参数的映射关系。
    ResultType: string,  // 后端服务返回应答的格式，目前可以设置为：JSON、TEXT、BINARY、XML、HTML。默认为JSON。
    ResultSample: string, // 后端服务返回应答的示例
    FailResultSample: string, // 后端服务失败返回应答的示例
    ErrorCodeSamples: string, // 后端服务返回的错误码示例
    ResultDescriptions: string,
    OpenIdConnectConfig: string,
    AllowSignatureMethod: string,  // 当AuthType为APP认证时，需要传该值明确签名算法。可选值如下，不传默认是HmacSHA256： HmacSHA1,HmacSHA256
    WebSocketApiType: string,
    ResultBodyModel: string
  }



  export const BASIC_API_INPUTS = {
    apiName: '',
    groupId: '',
    forceNonceCheck: false,
    disableInternet: false,
    authType: 'ANONYMOUS',
    visibility: 'PRIVATE',
    requestConfig: {
      requestProtocol:'HTTP,HTTPS,WS',
      requestHttpMethod: 'ANY',
      requestPath: '/*',
      requestMode:'PASSTHROUGH',
      bodyModel: '',
      bodyFormat: '',
      postBodyDescription: ''
    },
    serviceConfig: {
      serviceProtocol: 'FunctionCompute',
      serviceHttpMethod: 'ANY',
      serviceAddress: "",
      serviceTimeout: 10000,
      servicePath: '/',
      contentTypeValue: "",
      contentTypeCatagory: "CLIENT",
      mock: 'FALSE',
      mockResult: '',
      ossConfig: {
        action: 'GetObject'
      },
      serviceVpcEnable: 'FALSE',
      vpcConfig: {
        vpcScheme: ''
      },
      functionComputeConfig: {
        fcType: 'HttpTrigger',
        fcRegionId: '',
        roleArn: '',
        method: 'ANY',
        fcBaseUrl: '',
        path: '',
        contentTypeCategory: 'CLIENT',
        contentTypeValue: '',
        onlyBusinessPath: false,
      }

    },
    resultType: 'JSON',
    resultSample: '',
    failResultSample: '',
    errorCodeSamples: [],
    requestParameters: [],
    serviceParametersMap: [],
    serviceParameters: [],
    allowSignatureMethod: 'HmacSHA256',
    appCodeAuthType: '',
    webSocketApiType: 'COMMON'
  }
  
  
  