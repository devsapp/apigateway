"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pop_core_1 = __importDefault(require("@alicloud/pop-core"));
var loadsh_1 = __importDefault(require("loadsh"));
var base_1 = __importDefault(require("./common/base"));
var logger_1 = __importDefault(require("./common/logger"));
var entity_1 = require("./common/entity");
var SHARED_API_INSTANCE = 'api-shared-vpc-001';
var API_SERVICE_ADDRESS_ERROR = 'InvalidApiServiceAddressError';
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    ComponentDemo.prototype.titleCase = function (data) {
        var _this = this;
        return Object.keys(data).reduce(function (map, key) {
            var newKey = key.slice(0, 1).toUpperCase() + key.slice(1);
            var newData = data[key];
            if (Object.prototype.toString.call(newData) === '[object Object]') {
                map[newKey] = _this.titleCase(newData);
            }
            else if (Object.prototype.toString.call(newData) === '[object Array]') {
                map[newKey] = newData.map(function (item) {
                    if (Object.prototype.toString.call(item) === '[object Object]' || Object.prototype.toString.call(newData) === '[object Array]') {
                        return _this.titleCase(item);
                    }
                    return item;
                });
            }
            else {
                map[newKey] = newData;
            }
            return map;
        }, {});
    };
    ComponentDemo.prototype.getClient = function (credentials, region) {
        if (!this.client || this.region !== region) {
            this.region = region;
            var defaultCredential = {
                accessKeyId: credentials.AccessKeyID,
                accessKeySecret: credentials.AccessKeySecret,
                endpoint: "https://apigateway." + region + ".aliyuncs.com",
                apiVersion: '2016-07-14'
            };
            if (credentials.SecurityToken) {
                defaultCredential['securityToken'] = credentials.SecurityToken;
            }
            this.client = new pop_core_1.default(defaultCredential);
        }
        return this.client;
    };
    ComponentDemo.prototype.invokeApi = function (method, client, params) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOption = {
                            method: 'POST',
                            timeout: 20000
                        };
                        return [4 /*yield*/, client.request(method, params, requestOption)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.searchGroupByName = function (client, GroupName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('DescribeApiGroups', client, { GroupName: GroupName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.tryExecuteFunction = function (fc, currentRetryTime, waittime, retryError) {
        if (currentRetryTime === void 0) { currentRetryTime = 1; }
        if (waittime === void 0) { waittime = 5; }
        if (retryError === void 0) { retryError = API_SERVICE_ADDRESS_ERROR; }
        return __awaiter(this, void 0, void 0, function () {
            var retryTime, waitFun, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger_1.default.info('The current number of retries is ' + currentRetryTime);
                        retryTime = 5;
                        waitFun = function () {
                            return new Promise(function (resolve, reject) {
                                setTimeout(function () {
                                    resolve('');
                                }, waittime * 1000);
                            });
                        };
                        return [4 /*yield*/, waitFun()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 7]);
                        return [4 /*yield*/, fc()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        e_1 = _a.sent();
                        if (!(e_1.name.indexOf(retryError) !== -1 && currentRetryTime < retryTime)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.tryExecuteFunction(fc, ++currentRetryTime, waittime, retryError)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.reCreateOrUpdateApi = function (client, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('CreateApi', client, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 创建api
     */
    ComponentDemo.prototype.createOrUpdateApi = function (client, params) {
        return __awaiter(this, void 0, void 0, function () {
            var name, result, e_2, errorName, api, _a, singleApi, apiId, e_3, GroupId, ApiId, _b, StageName, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        name = params.ApiName;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 16]);
                        return [4 /*yield*/, this.invokeApi('CreateApi', client, params)];
                    case 2:
                        result = _c.sent();
                        return [2 /*return*/, {
                                name: name,
                                type: 'create',
                                modifySuccess: true,
                                id: loadsh_1.default.get(result, 'ApiId', '')
                            }];
                    case 3:
                        e_2 = _c.sent();
                        errorName = e_2.name || '';
                        if (errorName.indexOf(API_SERVICE_ADDRESS_ERROR) !== -1) { //遇到绑定后端服务的地址错误，进行重试
                            // console.log('params is', JSON.stringify(params, null, 4));
                            // console.log('Error tag:', e.name);
                            // logger.info('start retry');
                            // await this.tryExecuteFunction(async () => {
                            //   await this.reCreateOrUpdateApi(client, params);
                            // });
                            return [2 /*return*/, {
                                    name: name,
                                    type: 'create',
                                    modifySuccess: false,
                                    error: e_2,
                                    id: ''
                                }];
                        }
                        return [4 /*yield*/, this.QueryApiByName(client, { ApiName: params.ApiName, GroupId: params.GroupId })];
                    case 4:
                        api = _c.sent();
                        _a = loadsh_1.default.get(api, 'ApiSummarys.ApiSummary', [])[0], singleApi = _a === void 0 ? {} : _a;
                        apiId = singleApi.ApiId;
                        if (singleApi) {
                            apiId = singleApi.ApiId;
                        }
                        if (!apiId) return [3 /*break*/, 14];
                        params.ApiId = apiId;
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 13]);
                        return [4 /*yield*/, this.invokeApi('ModifyApi', client, params)];
                    case 6:
                        _c.sent();
                        return [2 /*return*/, {
                                name: name,
                                type: 'updateNeedlessAbolish',
                                modifySuccess: true,
                                id: apiId
                            }];
                    case 7:
                        e_3 = _c.sent();
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 11, , 12]);
                        GroupId = params.GroupId, ApiId = params.ApiId, _b = params.StageName, StageName = _b === void 0 ? 'RELEASE' : _b;
                        return [4 /*yield*/, this.invokeApi('AbolishApi', client, { GroupId: GroupId, ApiId: ApiId, StageName: StageName })];
                    case 9:
                        _c.sent(); // 下线
                        return [4 /*yield*/, this.invokeApi('ModifyApi', client, params)];
                    case 10:
                        _c.sent(); // 再更新
                        return [2 /*return*/, {
                                name: '',
                                type: 'updateNeedAbolish',
                                modifySuccess: true,
                                id: ''
                            }];
                    case 11:
                        e_4 = _c.sent();
                        return [2 /*return*/, {
                                name: name,
                                type: 'updateNeedAbolish',
                                modifySuccess: false,
                                id: apiId,
                                error: e_4
                            }];
                    case 12: return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 15];
                    case 14: return [2 /*return*/, {
                            name: name,
                            type: 'create',
                            modifySuccess: false,
                            error: e_2,
                            id: ''
                        }];
                    case 15: return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.QueryApiByName = function (client, _a) {
        var ApiName = _a.ApiName, GroupId = _a.GroupId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('DescribeApis', client, { ApiName: ApiName, GroupId: GroupId })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     *
     * @param client 创建分组
     * @param params
     */
    ComponentDemo.prototype.getGroupId = function (client, params) {
        return __awaiter(this, void 0, void 0, function () {
            var groupName, groupNow, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupName = params.groupName;
                        return [4 /*yield*/, this.searchGroupByName(client, groupName)];
                    case 1:
                        groupNow = _a.sent();
                        result = {};
                        if (!groupNow) return [3 /*break*/, 4];
                        result = loadsh_1.default.get(groupNow, 'ApiGroupAttributes.ApiGroupAttribute[0]');
                        if (!(result && result.GroupId)) return [3 /*break*/, 2];
                        return [2 /*return*/, result];
                    case 2:
                        params = this.titleCase(params);
                        return [4 /*yield*/, this.invokeApi('CreateApiGroup', client, params)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.modifyGroup = function (client, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('ModifyApiGroup', client, params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentDemo.prototype.publishApi = function (client, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.invokeApi('DeployApi', client, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.executeGroup = function (client, _a) {
        var groupName = _a.groupName, regionId = _a.regionId, basePath = _a.basePath, description = _a.description, instanceId = _a.instanceId;
        return __awaiter(this, void 0, void 0, function () {
            var _b, GroupId, SubDomain, e_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getGroupId(client, { groupName: groupName, regionId: regionId, basePath: basePath, description: description, instanceId: instanceId })];
                    case 1:
                        _b = _c.sent(), GroupId = _b.GroupId, SubDomain = _b.SubDomain;
                        if (!GroupId) return [3 /*break*/, 5];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.modifyGroup(client, { PassthroughHeaders: '', GroupId: GroupId })];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_5 = _c.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, { GroupId: GroupId, SubDomain: SubDomain }];
                }
            });
        });
    };
    ComponentDemo.prototype.setDomain = function (client, params) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultDomainData, data, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultDomainData = {
                            DomainName: '',
                            CustomDomainType: 'internet',
                            BindStageName: 'RELEASE'
                        };
                        data = loadsh_1.default.merge({}, defaultDomainData, params);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.invokeApi('SetDomain', client, data)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 域名绑定
     * @param inputs
     */
    ComponentDemo.prototype.bindDomain = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _a, groupName, _b, stageName, regionId, _c, basePath, _d, description, _e, instanceId, customerDomain, client, GroupId;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        credentials = inputs.credentials;
                        _a = inputs.props, groupName = _a.groupName, _b = _a.stageName, stageName = _b === void 0 ? 'RELEASE' : _b, regionId = _a.regionId, _c = _a.basePath, basePath = _c === void 0 ? '/' : _c, _d = _a.description, description = _d === void 0 ? '' : _d, _e = _a.instanceId, instanceId = _e === void 0 ? SHARED_API_INSTANCE : _e, customerDomain = _a.customerDomain;
                        client = this.getClient(credentials, regionId);
                        return [4 /*yield*/, this.executeGroup(client, { groupName: groupName, regionId: regionId, basePath: basePath, description: description, instanceId: instanceId })];
                    case 1:
                        GroupId = (_f.sent()).GroupId;
                        if (!customerDomain) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.setDomain(client, {
                                GroupId: GroupId,
                                DomainName: customerDomain,
                                RegionId: regionId,
                                BindStageName: stageName
                            })];
                    case 2:
                        _f.sent();
                        _f.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * demo 实例
    * @param inputs
    * @returns
    */
    ComponentDemo.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, AccountID, apiArn, _a, apis, groupName, _b, stageName, regionId, _c, basePath, _d, description, _e, instanceId, client, _f, GroupId, SubDomain, successApiNumber, failedApiNumber, failedApiNames, doCreateApi, totalApiNumber, executedApiResult, _i, apis_1, api, result;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        credentials = inputs.credentials;
                        AccountID = credentials.AccountID;
                        apiArn = "acs:ram::" + AccountID + ":role/aliyunserviceroleforapigateway";
                        _a = inputs.props, apis = _a.apis, groupName = _a.groupName, _b = _a.stageName, stageName = _b === void 0 ? 'RELEASE' : _b, regionId = _a.regionId, _c = _a.basePath, basePath = _c === void 0 ? '/' : _c, _d = _a.description, description = _d === void 0 ? '' : _d, _e = _a.instanceId, instanceId = _e === void 0 ? SHARED_API_INSTANCE : _e;
                        client = this.getClient(credentials, regionId);
                        return [4 /*yield*/, this.executeGroup(client, { groupName: groupName, regionId: regionId, basePath: basePath, description: description, instanceId: instanceId })];
                    case 1:
                        _f = _g.sent(), GroupId = _f.GroupId, SubDomain = _f.SubDomain;
                        successApiNumber = 0;
                        failedApiNumber = 0;
                        failedApiNames = [];
                        doCreateApi = function (api) { return __awaiter(_this, void 0, void 0, function () {
                            var clonedApiData, groupData, newData, transformedData, data, publishResult, StageName, Description, GroupId_1, e_7;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        clonedApiData = loadsh_1.default.cloneDeepWith(entity_1.BASIC_API_INPUTS);
                                        groupName = api.groupName || groupName; // 可以在api单独指定groupName;
                                        instanceId = api.instanceId || instanceId; //可以在api单独指定instanceId;
                                        regionId = api.regionId || regionId;
                                        if (!(this.region == regionId)) return [3 /*break*/, 2];
                                        client = this.getClient(credentials, regionId);
                                        return [4 /*yield*/, this.executeGroup(client, { groupName: groupName, regionId: regionId, basePath: basePath, description: description, instanceId: instanceId })];
                                    case 1:
                                        groupData = _a.sent();
                                        GroupId = groupData.GroupId;
                                        SubDomain = groupData.SubDomain;
                                        _a.label = 2;
                                    case 2:
                                        newData = loadsh_1.default.merge({}, clonedApiData, api, { GroupId: GroupId });
                                        newData.serviceConfig.functionComputeConfig.roleArn = apiArn;
                                        transformedData = this.titleCase(newData);
                                        transformedData.RequestConfig = JSON.stringify(transformedData.RequestConfig);
                                        transformedData.ServiceConfig = JSON.stringify(transformedData.ServiceConfig);
                                        transformedData.RequestParameters = JSON.stringify(transformedData.RequestParameters);
                                        transformedData.ServiceParametersMap = JSON.stringify(transformedData.ServiceParametersMap);
                                        transformedData.ServiceParameters = JSON.stringify(transformedData.ServiceParameters);
                                        return [4 /*yield*/, this.createOrUpdateApi(client, transformedData)];
                                    case 3:
                                        data = _a.sent();
                                        publishResult = {};
                                        if (!data.modifySuccess) return [3 /*break*/, 8];
                                        StageName = transformedData.StageName, Description = transformedData.Description, GroupId_1 = transformedData.GroupId;
                                        StageName = StageName || stageName;
                                        _a.label = 4;
                                    case 4:
                                        _a.trys.push([4, 6, , 7]);
                                        return [4 /*yield*/, this.publishApi(client, { StageName: StageName, ApiId: data.id, Description: Description, GroupId: GroupId_1 })];
                                    case 5:
                                        publishResult = _a.sent();
                                        data.publishSuccess = true;
                                        successApiNumber++;
                                        return [3 /*break*/, 7];
                                    case 6:
                                        e_7 = _a.sent();
                                        data.error = e_7;
                                        data.publishSuccess = false;
                                        failedApiNumber++;
                                        failedApiNames.push(data.name);
                                        return [3 /*break*/, 7];
                                    case 7: return [3 /*break*/, 9];
                                    case 8:
                                        failedApiNames.push(data.name);
                                        failedApiNumber++;
                                        _a.label = 9;
                                    case 9: return [2 /*return*/, __assign(__assign({}, data), { requestId: publishResult.RequestId || '' })];
                                }
                            });
                        }); };
                        totalApiNumber = apis.length;
                        executedApiResult = [];
                        _i = 0, apis_1 = apis;
                        _g.label = 2;
                    case 2:
                        if (!(_i < apis_1.length)) return [3 /*break*/, 5];
                        api = apis_1[_i];
                        return [4 /*yield*/, doCreateApi(api)];
                    case 3:
                        result = _g.sent();
                        executedApiResult.push(result);
                        _g.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, { domain: SubDomain, apiResult: executedApiResult, totalApiNumber: totalApiNumber, successApiNumber: successApiNumber, failedApiNumber: failedApiNumber, failedApiNames: failedApiNames }];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBc0M7QUFDdEMsa0RBQXVCO0FBQ3ZCLHVEQUEwQztBQUMxQywyREFBcUM7QUFDckMsMENBQStEO0FBRS9ELElBQU0sbUJBQW1CLEdBQUcsb0JBQW9CLENBQUM7QUFDakQsSUFBTSx5QkFBeUIsR0FBRywrQkFBK0IsQ0FBQztBQVVsRTtJQUEyQyxpQ0FBYTtJQUl0RCx1QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUdPLGlDQUFTLEdBQWpCLFVBQWtCLElBQUk7UUFBdEIsaUJBa0JDO1FBakJDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUN2QyxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtnQkFDakUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkM7aUJBQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQ3ZFLEdBQUcsQ0FBQyxNQUFNLENBQUMs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