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
            this.client = new pop_core_1.default({
                accessKeyId: credentials.AccessKeyID,
                accessKeySecret: credentials.AccessKeySecret,
                endpoint: "https://apigateway." + region + ".aliyuncs.com",
                apiVersion: '2016-07-14'
            });
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
            var credentials, AccountID, apiArn, _a, apis, groupName, _b, stageName, regionId, _c, basePath, _d, description, _e, instanceId, customerDomain, client, _f, GroupId, SubDomain, successApiNumber, failedApiNumber, failedApiNames, doCreateApi, totalApiNumber, executedApiResult, _i, apis_1, api, result;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        credentials = inputs.credentials;
                        AccountID = credentials.AccountID;
                        apiArn = "acs:ram::" + AccountID + ":role/aliyunserviceroleforapigateway";
                        _a = inputs.props, apis = _a.apis, groupName = _a.groupName, _b = _a.stageName, stageName = _b === void 0 ? 'RELEASE' : _b, regionId = _a.regionId, _c = _a.basePath, basePath = _c === void 0 ? '/' : _c, _d = _a.description, description = _d === void 0 ? '' : _d, _e = _a.instanceId, instanceId = _e === void 0 ? SHARED_API_INSTANCE : _e, customerDomain = _a.customerDomain;
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