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
            onlyBusinessPath: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9lbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBeUdlLFFBQUEsZ0JBQWdCLEdBQUc7SUFDOUIsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLGFBQWEsRUFBRTtRQUNiLGVBQWUsRUFBQyxlQUFlO1FBQy9CLGlCQUFpQixFQUFFLEtBQUs7UUFDeEIsV0FBVyxFQUFFLElBQUk7UUFDakIsV0FBVyxFQUFDLGFBQWE7UUFDekIsU0FBUyxFQUFFLEVBQUU7UUFDYixVQUFVLEVBQUUsRUFBRTtRQUNkLG1CQUFtQixFQUFFLEVBQUU7S0FDeEI7SUFDRCxhQUFhLEVBQUU7UUFDYixlQUFlLEVBQUUsaUJBQWlCO1FBQ2xDLGlCQUFpQixFQUFFLEtBQUs7UUFDeEIsY0FBYyxFQUFFLEVBQUU7UUFDbEIsY0FBYyxFQUFFLEtBQUs7UUFDckIsV0FBVyxFQUFFLEdBQUc7UUFDaEIsSUFBSSxFQUFFLE9BQU87UUFDYixVQUFVLEVBQUUsRUFBRTtRQUNkLFNBQVMsRUFBRTtZQUNULE1BQU0sRUFBRSxXQUFXO1NBQ3BCO1FBQ0QsZ0JBQWdCLEVBQUUsT0FBTztRQUN6QixTQUFTLEVBQUU7WUFDVCxTQUFTLEVBQUUsRUFBRTtTQUNkO1FBQ0QscUJBQXFCLEVBQUU7WUFDckIsTUFBTSxFQUFFLGFBQWE7WUFDckIsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsRUFBRTtZQUNSLG1CQUFtQixFQUFFLFFBQVE7WUFDN0IsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixnQkFBZ0IsRUFBRSxJQUFJO1NBQ3ZCO0tBRUY7SUFDRCxVQUFVLEVBQUUsTUFBTTtJQUNsQixZQUFZLEVBQUUsRUFBRTtJQUNoQixnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsaUJBQWlCLEVBQUUsRUFBRTtJQUNyQixvQkFBb0IsRUFBRSxFQUFFO0lBQ3hCLGlCQUFpQixFQUFFLEVBQUU7SUFDckIsb0JBQW9CLEVBQUUsWUFBWTtJQUNsQyxlQUFlLEVBQUUsRUFBRTtJQUNuQixnQkFBZ0IsRUFBRSxRQUFRO0NBQzNCLENBQUEifQ==