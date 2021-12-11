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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUF5R2UsUUFBQSxnQkFBZ0IsR0FBRztJQUM5QixPQUFPLEVBQUUsRUFBRTtJQUNYLE9BQU8sRUFBRSxFQUFFO0lBQ1gsZUFBZSxFQUFFLEtBQUs7SUFDdEIsZUFBZSxFQUFFLEtBQUs7SUFDdEIsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLFNBQVM7SUFDckIsYUFBYSxFQUFFO1FBQ2IsZUFBZSxFQUFDLGVBQWU7UUFDL0IsaUJBQWlCLEVBQUUsS0FBSztRQUN4QixXQUFXLEVBQUUsSUFBSTtRQUNqQixXQUFXLEVBQUMsYUFBYTtRQUN6QixTQUFTLEVBQUUsRUFBRTtRQUNiLFVBQVUsRUFBRSxFQUFFO1FBQ2QsbUJBQW1CLEVBQUUsRUFBRTtLQUN4QjtJQUNELGFBQWEsRUFBRTtRQUNiLGVBQWUsRUFBRSxpQkFBaUI7UUFDbEMsaUJBQWlCLEVBQUUsS0FBSztRQUN4QixjQUFjLEVBQUUsRUFBRTtRQUNsQixjQUFjLEVBQUUsS0FBSztRQUNyQixXQUFXLEVBQUUsR0FBRztRQUNoQixJQUFJLEVBQUUsT0FBTztRQUNiLFVBQVUsRUFBRSxFQUFFO1FBQ2QsU0FBUyxFQUFFO1lBQ1QsTUFBTSxFQUFFLFdBQVc7U0FDcEI7UUFDRCxnQkFBZ0IsRUFBRSxPQUFPO1FBQ3pCLFNBQVMsRUFBRTtZQUNULFNBQVMsRUFBRSxFQUFFO1NBQ2Q7UUFDRCxxQkFBcUIsRUFBRTtZQUNyQixNQUFNLEVBQUUsYUFBYTtZQUNyQixVQUFVLEVBQUUsRUFBRTtZQUNkLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsRUFBRTtZQUNiLElBQUksRUFBRSxFQUFFO1lBQ1IsbUJBQW1CLEVBQUUsUUFBUTtZQUM3QixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLGdCQUFnQixFQUFFLEtBQUs7U0FDeEI7S0FFRjtJQUNELFVBQVUsRUFBRSxNQUFNO0lBQ2xCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixpQkFBaUIsRUFBRSxFQUFFO0lBQ3JCLG9CQUFvQixFQUFFLEVBQUU7SUFDeEIsaUJBQWlCLEVBQUUsRUFBRTtJQUNyQixvQkFBb0IsRUFBRSxZQUFZO0lBQ2xDLGVBQWUsRUFBRSxFQUFFO0lBQ25CLGdCQUFnQixFQUFFLFFBQVE7Q0FDM0IsQ0FBQSJ9