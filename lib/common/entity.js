"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASIC_API_INPUTS = void 0;
exports.BASIC_API_INPUTS = {
    apiName: '',
    groupId: '',
    forceNonceCheck: false,
    disableInternet: false,
    authType: 'ANONYMOUS',
    visibility: 'PRIVATE',
    requestConfig: {
        requestProtocol: 'HTTP,HTTPS,WS',
        requestHttpMethod: 'ANY',
        requestPath: '/*',
        requestMode: 'PASSTHROUGH',
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9lbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBbUhlLFFBQUEsZ0JBQWdCLEdBQUc7SUFDOUIsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLGFBQWEsRUFBRTtRQUNiLGVBQWUsRUFBQyxlQUFlO1FBQy9CLGlCQUFpQixFQUFFLEtBQUs7UUFDeEIsV0FBVyxFQUFFLElBQUk7UUFDakIsV0FBVyxFQUFDLGFBQWE7UUFDekIsU0FBUyxFQUFFLEVBQUU7UUFDYixVQUFVLEVBQUUsRUFBRTtRQUNkLG1CQUFtQixFQUFFLEVBQUU7S0FDeEI7SUFDRCxhQUFhLEVBQUU7UUFDYixlQUFlLEVBQUUsaUJBQWlCO1FBQ2xDLGlCQUFpQixFQUFFLEtBQUs7UUFDeEIsY0FBYyxFQUFFLEVBQUU7UUFDbEIsY0FBYyxFQUFFLEtBQUs7UUFDckIsV0FBVyxFQUFFLEdBQUc7UUFDaEIsZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixtQkFBbUIsRUFBRSxRQUFRO1FBQzdCLElBQUksRUFBRSxPQUFPO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxTQUFTLEVBQUU7WUFDVCxNQUFNLEVBQUUsV0FBVztTQUNwQjtRQUNELGdCQUFnQixFQUFFLE9BQU87UUFDekIsU0FBUyxFQUFFO1lBQ1QsU0FBUyxFQUFFLEVBQUU7U0FDZDtRQUNELHFCQUFxQixFQUFFO1lBQ3JCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxFQUFFLEVBQUU7WUFDUixtQkFBbUIsRUFBRSxRQUFRO1lBQzdCLGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsZ0JBQWdCLEVBQUUsS0FBSztTQUN4QjtLQUVGO0lBQ0QsVUFBVSxFQUFFLE1BQU07SUFDbEIsWUFBWSxFQUFFLEVBQUU7SUFDaEIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGlCQUFpQixFQUFFLEVBQUU7SUFDckIsb0JBQW9CLEVBQUUsRUFBRTtJQUN4QixpQkFBaUIsRUFBRSxFQUFFO0lBQ3JCLG9CQUFvQixFQUFFLFlBQVk7SUFDbEMsZUFBZSxFQUFFLEVBQUU7SUFDbkIsZ0JBQWdCLEVBQUUsUUFBUTtDQUMzQixDQUFBIn0=