## 组件说明
这是阿里云 apigateway 的组件，可以帮助您创建 api 服务
## 使用场景

## 具体用法

### s cli 方式

```
s cli <componentname> -d
```

### 应用编排使用方式

查看 example下 s.yaml

```yaml
edition: 1.0.0 #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: component-test #  项目名称
access: simplemvc
vars: # [全局变量，提供给各个服务使用]
  region: cn-hongkong
  groupName: test
services:
  gateway: #  服务名称
    component: apigateway # 这里引入的是相对路径，正式配置替换成你自己的component名称即可
    props:
      apis:
        - apiName: test
          regionId: ${vars.region}
          requestConfig:
            requestHttpMethod: PATCH
            requestMode: PASSTHROUGH
            requestPath: /v1/xxx/[id]/xxx
            requestProtocol: HTTPS
          requestParameters:
              - apiParameterName: id
                location: PATH
                parameterType: String
                required: REQUIRED
                defaultValue: dddddd
                description: ddddddddd
              - apiParameterName: CaClientIp
                location: Head
                parameterType: String
                required: REQUIRED
                defaultValue: 
                description: 
          serviceParameters:
              - serviceParameterName: id
                location: PATH
                type: String
                parameterCatalog: REQUEST
              - serviceParameterName: caipd   #系统参数类型
                location: Head
                type: String
                parameterCatalog: SYSTEM
          serviceParametersMap:
              - serviceParameterName: id
                requestParameterName: id
               - serviceParameterName: caipd  # 系统参数类型跟服务的映射，系统参数列表及说明https://help.aliyun.com/zh/api-gateway/user-guide/create-an-api?spm=a2c4g.11186623.0.0.603c26decTauOL
                requestParameterName: CaClientIp  
          serviceConfig:
            functionComputeConfig:
              fcRegionId: ${vars.region}
              fcType: FCEvent
              functionName: auto
              serviceName: test
            resultType: JSON
            servicePath: /
            serviceProtocol: FunctionCompute
            serviceTimeout: 30000
      groupName: ${vars.groupName}
      regionId: ${vars.region}
      stageName: RELEASE
        
  # dns: # 网站解析
  #   componnet: dns
  #   props:
  #     domain: ${vars.domain}

```
## 更多说明
apis属性对齐apigateway createApi 内容，详细地址
https://help.aliyun.com/document_detail/394364.html

