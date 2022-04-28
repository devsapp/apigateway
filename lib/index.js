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
            var e_2, api, _a, singleApi, apiId, e_3, GroupId, ApiId, _b, StageName;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 12]);
                        return [4 /*yield*/, this.invokeApi('CreateApi', client, params)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        e_2 = _c.sent();
                        if (!(e_2.name.indexOf(API_SERVICE_ADDRESS_ERROR) !== -1)) return [3 /*break*/, 4];
                        console.log('params is', JSON.stringify(params, null, 4));
                        console.log('Error tag:', e_2.name);
                        logger_1.default.info('start retry');
                        return [4 /*yield*/, this.tryExecuteFunction(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.reCreateOrUpdateApi(client, params)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [4 /*yield*/, this.QueryApiByName(client, { ApiName: params.ApiName, GroupId: params.GroupId })];
                    case 5:
                        api = _c.sent();
                        _a = loadsh_1.default.get(api, 'ApiSummarys.ApiSummary', [])[0], singleApi = _a === void 0 ? {} : _a;
                        apiId = singleApi.ApiId;
                        if (singleApi) {
                            apiId = singleApi.ApiId;
                        }
                        if (!apiId) return [3 /*break*/, 11];
                        params.ApiId = apiId;
                        _c.label = 6;
                    case 6:
                        _c.trys.push([6, 8, , 11]);
                        return [4 /*yield*/, this.invokeApi('ModifyApi', client, params)];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 8:
                        e_3 = _c.sent();
                        GroupId = params.GroupId, ApiId = params.ApiId, _b = params.StageName, StageName = _b === void 0 ? 'RELEASE' : _b;
                        return [4 /*yield*/, this.invokeApi('AbolishApi', client, { GroupId: GroupId, ApiId: ApiId, StageName: StageName })];
                    case 9:
                        _c.sent(); // 下线
                        return [4 /*yield*/, this.invokeApi('ModifyApi', client, params)];
                    case 10:
                        _c.sent(); // 再更新
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/, { ApiId: apiId }];
                    case 12: return [2 /*return*/];
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
            var _b, GroupId, SubDomain, e_4;
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
                        e_4 = _c.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, { GroupId: GroupId, SubDomain: SubDomain }];
                }
            });
        });
    };
    ComponentDemo.prototype.setDomain = function (client, params) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultDomainData, data, e_5;
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
                        e_5 = _a.sent();
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
            var credentials, AccountID, apiArn, _a, apis, groupName, _b, stageName, regionId, _c, basePath, _d, description, _e, instanceId, customerDomain, promiseData, client, _f, GroupId, SubDomain, apiNameList;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        credentials = inputs.credentials;
                        AccountID = credentials.AccountID;
                        apiArn = "acs:ram::" + AccountID + ":role/aliyunserviceroleforapigateway";
                        _a = inputs.props, apis = _a.apis, groupName = _a.groupName, _b = _a.stageName, stageName = _b === void 0 ? 'RELEASE' : _b, regionId = _a.regionId, _c = _a.basePath, basePath = _c === void 0 ? '/' : _c, _d = _a.description, description = _d === void 0 ? '' : _d, _e = _a.instanceId, instanceId = _e === void 0 ? SHARED_API_INSTANCE : _e, customerDomain = _a.customerDomain;
                        promiseData = [];
                        client = this.getClient(credentials, regionId);
                        return [4 /*yield*/, this.executeGroup(client, { groupName: groupName, regionId: regionId, basePath: basePath, description: description, instanceId: instanceId })];
                    case 1:
                        _f = _g.sent(), GroupId = _f.GroupId, SubDomain = _f.SubDomain;
                        apis.forEach(function (api) {
                            promiseData.push(new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var clonedApiData, groupData, newData, transformedData, data_1, StageName, Description, GroupId_1, e_6;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 6, , 7]);
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
                                            return [4 /*yield*/, this.createOrUpdateApi(client, transformedData)];
                                        case 3:
                                            data_1 = _a.sent();
                                            if (!data_1.ApiId) return [3 /*break*/, 5];
                                            StageName = transformedData.StageName, Description = transformedData.Description, GroupId_1 = transformedData.GroupId;
                                            StageName = StageName || stageName;
                                            return [4 /*yield*/, this.publishApi(client, { StageName: StageName, ApiId: data_1.ApiId, Description: Description, GroupId: GroupId_1 })];
                                        case 4:
                                            _a.sent();
                                            _a.label = 5;
                                        case 5:
                                            setTimeout(function () {
                                                if (data_1.ApiId) {
                                                    console.log(api.apiName + " is successed deployed");
                                                }
                                                else {
                                                    console.log(api.apiName + " is failed to deployed");
                                                }
                                                resolve(api.apiName);
                                            }, 500);
                                            return [3 /*break*/, 7];
                                        case 6:
                                            e_6 = _a.sent();
                                            reject(e_6);
                                            return [3 /*break*/, 7];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); }));
                        });
                        return [4 /*yield*/, Promise.all(promiseData)];
                    case 2:
                        apiNameList = _g.sent();
                        this.__report({
                            name: 'apigateway',
                            access: loadsh_1.default.get(inputs, 'project.access'),
                            content: {
                                groupName: groupName,
                                apis: apiNameList,
                                domain: customerDomain || SubDomain
                            }
                        });
                        return [2 /*return*/, { domain: SubDomain }];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXNDO0FBQ3RDLGtEQUF1QjtBQUN2Qix1REFBMEM7QUFDMUMsMkRBQXFDO0FBQ3JDLDBDQUErRDtBQUUvRCxJQUFNLG1CQUFtQixHQUFHLG9CQUFvQixDQUFDO0FBQ2pELElBQU0seUJBQXlCLEdBQUcsK0JBQStCLENBQUM7QUFDbEU7SUFBMkMsaUNBQWE7SUFJdEQsdUJBQVksS0FBSztlQUNmLGtCQUFNLEtBQUssQ0FBQztJQUNkLENBQUM7SUFHTyxpQ0FBUyxHQUFqQixVQUFrQixJQUFJO1FBQXRCLGlCQWtCQztRQWpCQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUc7WUFDdkMsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssaUJBQWlCLEVBQUU7Z0JBQ2pFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZDO2lCQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLGdCQUFnQixFQUFFO2dCQUN2RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7b0JBQzdCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTt3QkFDOUgsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUM3QjtvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUE7YUFDdEI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNSLENBQUM7SUFFTyxpQ0FBUyxHQUFqQixVQUFrQixXQUFXLEVBQUUsTUFBTTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0JBQUksQ0FBQztnQkFDckIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXO2dCQUNwQyxlQUFlLEVBQUUsV0FBVyxDQUFDLGVBQWU7Z0JBQzVDLFFBQVEsRUFBRSx3QkFBc0IsTUFBTSxrQkFBZTtnQkFDckQsVUFBVSxFQUFFLFlBQVk7YUFDekIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVhLGlDQUFTLEdBQXZCLFVBQXdCLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTs7Ozs7O3dCQUN0QyxhQUFhLEdBQUc7NEJBQ3BCLE1BQU0sRUFBRSxNQUFNOzRCQUNkLE9BQU8sRUFBRSxLQUFLO3lCQUNmLENBQUM7d0JBQ0sscUJBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxFQUFBOzRCQUExRCxzQkFBTyxTQUFtRCxFQUFDOzs7O0tBQzVEO0lBR0sseUNBQWlCLEdBQXZCLFVBQXdCLE1BQU0sRUFBRSxTQUFTOzs7OzRCQUNoQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUMsRUFBQTs0QkFBdkUsc0JBQU8sU0FBZ0UsRUFBQTs7OztLQUN4RTtJQUVLLDBDQUFrQixHQUF4QixVQUF5QixFQUFFLEVBQUUsZ0JBQW9CLEVBQUUsUUFBWSxFQUFFLFVBQXNDO1FBQTFFLGlDQUFBLEVBQUEsb0JBQW9CO1FBQUUseUJBQUEsRUFBQSxZQUFZO1FBQUUsMkJBQUEsRUFBQSxzQ0FBc0M7Ozs7Ozt3QkFDckcsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQTt3QkFDN0QsU0FBUyxHQUFHLENBQUMsQ0FBQzt3QkFDZCxPQUFPLEdBQVE7NEJBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQ0FDakMsVUFBVSxDQUFDO29DQUNULE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FDZCxDQUFDLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFBOzRCQUNyQixDQUFDLENBQUMsQ0FBQzt3QkFDTCxDQUFDLENBQUE7d0JBQ0QscUJBQU0sT0FBTyxFQUFFLEVBQUE7O3dCQUFmLFNBQWUsQ0FBQzs7Ozt3QkFFZCxxQkFBTSxFQUFFLEVBQUUsRUFBQTs7d0JBQVYsU0FBVSxDQUFDOzs7OzZCQUVQLENBQUEsR0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksZ0JBQWdCLEdBQUcsU0FBUyxDQUFBLEVBQWpFLHdCQUFpRTt3QkFDbkUscUJBQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsRUFBQTs7d0JBQTNFLFNBQTJFLENBQUM7Ozs7Ozs7S0FHakY7SUFFSywyQ0FBbUIsR0FBekIsVUFBMEIsTUFBTSxFQUFFLE1BQU07Ozs7NEJBQy9CLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBQTs0QkFBeEQsc0JBQU8sU0FBaUQsRUFBQzs7OztLQUMxRDtJQUNEOztPQUVHO0lBQ0cseUNBQWlCLEdBQXZCLFVBQXdCLE1BQU0sRUFBRSxNQUFNOzs7Ozs7Ozt3QkFFM0IscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFBOzRCQUF4RCxzQkFBTyxTQUFpRCxFQUFDOzs7NkJBR3JELENBQUEsR0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxFQUFoRCx3QkFBZ0Q7d0JBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xDLGdCQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUMzQixxQkFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUM7OztnREFDNUIscUJBQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBQTs7NENBQTlDLFNBQThDLENBQUM7Ozs7aUNBQ2hELENBQUMsRUFBQTs7d0JBRkYsU0FFRSxDQUFDOzs0QkFFTyxxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBQTs7d0JBQTdGLEdBQUcsR0FBRyxTQUF1Rjt3QkFDNUYsS0FBa0IsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxHQUE1QyxFQUFkLFNBQVMsbUJBQUcsRUFBRSxLQUFBLENBQTZDO3dCQUM5RCxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQTt3QkFDM0IsSUFBSSxTQUFTLEVBQUU7NEJBQ2IsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7eUJBQ3pCOzZCQUNHLEtBQUssRUFBTCx5QkFBSzt3QkFDUCxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Ozt3QkFFbkIscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBakQsU0FBaUQsQ0FBQzs7Ozt3QkFHMUMsT0FBTyxHQUFtQyxNQUFNLFFBQXpDLEVBQUUsS0FBSyxHQUE0QixNQUFNLE1BQWxDLEVBQUUsS0FBMEIsTUFBTSxVQUFYLEVBQXJCLFNBQVMsbUJBQUcsU0FBUyxLQUFBLENBQVk7d0JBQ3pELHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUMsRUFBQTs7d0JBQXpFLFNBQXlFLENBQUMsQ0FBQyxLQUFLO3dCQUNoRixxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUE7O3dCQUFqRCxTQUFpRCxDQUFDLENBQUMsTUFBTTs7NkJBSTdELHNCQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFDOzs7OztLQUczQjtJQUVLLHNDQUFjLEdBQXBCLFVBQXFCLE1BQU0sRUFBRSxFQUFvQjtZQUFsQixPQUFPLGFBQUEsRUFBRSxPQUFPLGFBQUE7Ozs7NEJBQ3RDLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsRUFBQTs0QkFBekUsc0JBQU8sU0FBa0UsRUFBQzs7OztLQUUzRTtJQUVEOzs7O09BSUc7SUFDVyxrQ0FBVSxHQUF4QixVQUF5QixNQUFNLEVBQUUsTUFBTTs7Ozs7O3dCQUM3QixTQUFTLEdBQUssTUFBTSxVQUFYLENBQVk7d0JBQ1oscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQTFELFFBQVEsR0FBRyxTQUErQzt3QkFDNUQsTUFBTSxHQUFRLEVBQUUsQ0FBQzs2QkFDakIsUUFBUSxFQUFSLHdCQUFRO3dCQUNWLE1BQU0sR0FBRyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUseUNBQXlDLENBQUMsQ0FBQzs2QkFDaEUsQ0FBQSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQSxFQUF4Qix3QkFBd0I7d0JBQzFCLHNCQUFPLE1BQU0sRUFBQzs7d0JBR2QsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3ZCLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBL0QsTUFBTSxHQUFHLFNBQXNELENBQUM7d0JBQ2hFLHNCQUFPLE1BQU0sRUFBQzs7Ozs7S0FJbkI7SUFFYSxtQ0FBVyxHQUF6QixVQUEwQixNQUFNLEVBQUUsTUFBTTs7Ozs0QkFDdEMscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUE7O3dCQUF0RCxTQUFzRCxDQUFDOzs7OztLQUN4RDtJQUVhLGtDQUFVLEdBQXhCLFVBQXlCLE1BQU0sRUFBRSxNQUFNOzs7OzRCQUM5QixxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUE7NEJBQXhELHNCQUFPLFNBQWlELEVBQUM7Ozs7S0FDMUQ7SUFFYSxvQ0FBWSxHQUExQixVQUEyQixNQUFNLEVBQUUsRUFBMEQ7WUFBeEQsU0FBUyxlQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsV0FBVyxpQkFBQSxFQUFFLFVBQVUsZ0JBQUE7Ozs7OzRCQUMxRCxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsV0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLFdBQVcsYUFBQSxFQUFFLFVBQVUsWUFBQSxFQUFFLENBQUMsRUFBQTs7d0JBQWxILEtBQXlCLFNBQXlGLEVBQWhILE9BQU8sYUFBQSxFQUFFLFNBQVMsZUFBQTs2QkFDdEIsT0FBTyxFQUFQLHdCQUFPOzs7O3dCQUVQLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsRUFBQTs7d0JBQW5FLFNBQW1FLENBQUM7Ozs7OzRCQUl4RSxzQkFBTyxFQUFFLE9BQU8sU0FBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLEVBQUE7Ozs7S0FDOUI7SUFFYSxpQ0FBUyxHQUF2QixVQUF3QixNQUFNLEVBQUUsTUFBTTs7Ozs7O3dCQUM5QixpQkFBaUIsR0FBRzs0QkFDeEIsVUFBVSxFQUFFLEVBQUU7NEJBQ2QsZ0JBQWdCLEVBQUUsVUFBVTs0QkFDNUIsYUFBYSxFQUFFLFNBQVM7eUJBQ3pCLENBQUM7d0JBQ0ksSUFBSSxHQUFHLGdCQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs7Ozt3QkFFbEQscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFBOzt3QkFBL0MsU0FBK0MsQ0FBQzs7Ozs7Ozs7O0tBS25EO0lBQ0Q7OztPQUdHO0lBQ1Usa0NBQVUsR0FBdkIsVUFBd0IsTUFBa0I7Ozs7Ozt3QkFDaEMsV0FBVyxHQUFLLE1BQU0sWUFBWCxDQUFZO3dCQUUzQixLQUFxSSxNQUFNLENBQUMsS0FBSyxFQUEvSSxTQUFTLGVBQUEsRUFBRSxpQkFBcUIsRUFBckIsU0FBUyxtQkFBRyxTQUFTLEtBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBYyxFQUFkLFFBQVEsbUJBQUcsR0FBRyxLQUFBLEVBQUUsbUJBQWdCLEVBQWhCLFdBQVcsbUJBQUcsRUFBRSxLQUFBLEVBQUUsa0JBQWdDLEVBQWhDLFVBQVUsbUJBQUcsbUJBQW1CLEtBQUEsRUFBRSxjQUFjLG9CQUFBLENBQWtCO3dCQUNsSixNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ2pDLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsU0FBUyxXQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBdkcsT0FBTyxHQUFLLENBQUEsU0FBMkYsQ0FBQSxRQUFoRzs2QkFFVCxjQUFjLEVBQWQsd0JBQWM7d0JBQ2hCLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO2dDQUMzQixPQUFPLFNBQUE7Z0NBQ1AsVUFBVSxFQUFFLGNBQWM7Z0NBQzFCLFFBQVEsRUFBRSxRQUFRO2dDQUNsQixhQUFhLEVBQUUsU0FBUzs2QkFDekIsQ0FBQyxFQUFBOzt3QkFMRixTQUtFLENBQUE7Ozs7OztLQUVMO0lBRUQ7Ozs7TUFJRTtJQUNXLDhCQUFNLEdBQW5CLFVBQW9CLE1BQWtCOzs7Ozs7O3dCQUM1QixXQUFXLEdBQUssTUFBTSxZQUFYLENBQVk7d0JBQ3ZCLFNBQVMsR0FBSyxXQUFXLFVBQWhCLENBQWlCO3dCQUM1QixNQUFNLEdBQUcsY0FBWSxTQUFTLHlDQUFzQyxDQUFDO3dCQUN2RSxLQUEySSxNQUFNLENBQUMsS0FBSyxFQUFySixJQUFJLFVBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxpQkFBcUIsRUFBckIsU0FBUyxtQkFBRyxTQUFTLEtBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBYyxFQUFkLFFBQVEsbUJBQUcsR0FBRyxLQUFBLEVBQUUsbUJBQWdCLEVBQWhCLFdBQVcsbUJBQUcsRUFBRSxLQUFBLEVBQUUsa0JBQWdDLEVBQWhDLFVBQVUsbUJBQUcsbUJBQW1CLEtBQUEsRUFBRSxjQUFjLG9CQUFBLENBQWtCO3dCQUN0SixXQUFXLEdBQUcsRUFBRSxDQUFDO3dCQUNuQixNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ3RCLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsU0FBUyxXQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBcEgsS0FBeUIsU0FBMkYsRUFBbEgsT0FBTyxhQUFBLEVBQUUsU0FBUyxlQUFBO3dCQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRzs0QkFDZixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQU8sT0FBTyxFQUFFLE1BQU07Ozs7Ozs0Q0FFekMsYUFBYSxHQUFHLGdCQUFDLENBQUMsYUFBYSxDQUFDLHlCQUFnQixDQUFDLENBQUM7NENBQ3hELFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxDQUFDLHVCQUF1Qjs0Q0FDL0QsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLENBQUMsdUJBQXVCOzRDQUNsRSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUM7aURBQ2hDLENBQUEsSUFBSSxDQUFDLE1BQU8sSUFBSSxRQUFRLENBQUEsRUFBeEIsd0JBQXdCOzRDQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7NENBQy9CLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsU0FBUyxXQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQyxFQUFBOzs0Q0FBdkcsU0FBUyxHQUFHLFNBQTJGOzRDQUMzRyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQzs0Q0FDNUIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7Ozs0Q0FFNUIsT0FBTyxHQUFHLGdCQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDOzRDQUM3RCxPQUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7NENBQ3pELGVBQWUsR0FBUSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRDQUNuRCxlQUFlLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRDQUM5RSxlQUFlLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRDQUNqRSxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxFQUFBOzs0Q0FBNUQsU0FBTyxTQUFxRDtpREFDOUQsTUFBSSxDQUFDLEtBQUssRUFBVix3QkFBVTs0Q0FDTixTQUFTLEdBQTJCLGVBQWUsVUFBMUMsRUFBRSxXQUFXLEdBQWMsZUFBZSxZQUE3QixFQUFFLFlBQVksZUFBZSxRQUFwQixDQUFxQjs0Q0FDMUQsU0FBUyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUM7NENBQ25DLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsU0FBUyxXQUFBLEVBQUUsS0FBSyxFQUFFLE1BQUksQ0FBQyxLQUFLLEVBQUUsV0FBVyxhQUFBLEVBQUUsT0FBTyxXQUFBLEVBQUUsQ0FBQyxFQUFBOzs0Q0FBckYsU0FBcUYsQ0FBQTs7OzRDQUV2RixVQUFVLENBQUM7Z0RBQ1QsSUFBSSxNQUFJLENBQUMsS0FBSyxFQUFFO29EQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUksR0FBRyxDQUFDLE9BQU8sMkJBQXdCLENBQUMsQ0FBQztpREFDckQ7cURBQU07b0RBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBSSxHQUFHLENBQUMsT0FBTywyQkFBd0IsQ0FBQyxDQUFDO2lEQUNyRDtnREFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRDQUN2QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Ozs7NENBRVIsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDOzs7OztpQ0FFYixDQUFDLENBQUMsQ0FBQTt3QkFFTCxDQUFDLENBQUMsQ0FBQzt3QkFFaUIscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQTVDLFdBQVcsR0FBRyxTQUE4Qjt3QkFFbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQzs0QkFDWixJQUFJLEVBQUUsWUFBWTs0QkFDbEIsTUFBTSxFQUFFLGdCQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQzs0QkFDdkMsT0FBTyxFQUFFO2dDQUNQLFNBQVMsV0FBQTtnQ0FDVCxJQUFJLEVBQUUsV0FBVztnQ0FDakIsTUFBTSxFQUFFLGNBQWMsSUFBSSxTQUFTOzZCQUNwQzt5QkFDRixDQUFDLENBQUE7d0JBQ0Ysc0JBQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUM7Ozs7S0FDOUI7SUFFSCxvQkFBQztBQUFELENBQUMsQUExUUQsQ0FBMkMsY0FBYSxHQTBRdkQifQ==