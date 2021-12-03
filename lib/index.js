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
    /**
     * 创建api
     */
    ComponentDemo.prototype.createOrUpdateApi = function (client, params) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, api, _a, singleApi, apiId, e_2, GroupId, ApiId, _b, StageName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 10]);
                        return [4 /*yield*/, this.invokeApi('CreateApi', client, params)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        e_1 = _c.sent();
                        return [4 /*yield*/, this.QueryApiByName(client, { ApiName: params.ApiName, GroupId: params.GroupId })];
                    case 3:
                        api = _c.sent();
                        _a = loadsh_1.default.get(api, 'ApiSummarys.ApiSummary', [])[0], singleApi = _a === void 0 ? {} : _a;
                        apiId = singleApi.ApiId;
                        if (singleApi) {
                            apiId = singleApi.ApiId;
                        }
                        if (!apiId) return [3 /*break*/, 9];
                        params.ApiId = apiId;
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 9]);
                        return [4 /*yield*/, this.invokeApi('ModifyApi', client, params)];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        e_2 = _c.sent();
                        GroupId = params.GroupId, ApiId = params.ApiId, _b = params.StageName, StageName = _b === void 0 ? 'RELEASE' : _b;
                        return [4 /*yield*/, this.invokeApi('AbolishApi', client, { GroupId: GroupId, ApiId: ApiId, StageName: StageName })];
                    case 7:
                        _c.sent(); // 下线
                        return [4 /*yield*/, this.invokeApi('ModifyApi', client, params)];
                    case 8:
                        _c.sent(); // 再更新
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, { ApiId: apiId }];
                    case 10: return [2 /*return*/];
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
            var _b, GroupId, SubDomain, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getGroupId(client, { groupName: groupName, regionId: regionId, basePath: basePath, description: description, instanceId: instanceId })];
                    case 1:
                        _b = _c.sent(), GroupId = _b.GroupId, SubDomain = _b.SubDomain;
                        if (!GroupId) return [3 /*break*/, 5];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.modifyGroup(client, { PassthroughHeaders: 'host', GroupId: GroupId })];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _c.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, { GroupId: GroupId, SubDomain: SubDomain }];
                }
            });
        });
    };
    ComponentDemo.prototype.setDomain = function (client, params) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultDomainData, data, e_4;
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
                        e_4 = _a.sent();
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
                        _a = inputs.props, groupName = _a.groupName, _b = _a.stageName, stageName = _b === void 0 ? 'RELEASE' : _b, regionId = _a.regionId, _c = _a.basePath, basePath = _c === void 0 ? '/' : _c, _d = _a.description, description = _d === void 0 ? '' : _d, _e = _a.instanceId, instanceId = _e === void 0 ? 'api-shared-vpc-001' : _e, customerDomain = _a.customerDomain;
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
            var credentials, AccountID, apiArn, _a, apis, groupName, _b, stageName, regionId, _c, basePath, _d, description, _e, instanceId, customerDomain, promiseData, client, _f, GroupId, SubDomain;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        logger_1.default.info('deploy test');
                        credentials = inputs.credentials;
                        AccountID = credentials.AccountID;
                        apiArn = "acs:ram::" + AccountID + ":role/aliyunserviceroleforapigateway";
                        _a = inputs.props, apis = _a.apis, groupName = _a.groupName, _b = _a.stageName, stageName = _b === void 0 ? 'RELEASE' : _b, regionId = _a.regionId, _c = _a.basePath, basePath = _c === void 0 ? '/' : _c, _d = _a.description, description = _d === void 0 ? '' : _d, _e = _a.instanceId, instanceId = _e === void 0 ? 'api-shared-vpc-001' : _e, customerDomain = _a.customerDomain;
                        promiseData = [];
                        client = this.getClient(credentials, regionId);
                        return [4 /*yield*/, this.executeGroup(client, { groupName: groupName, regionId: regionId, basePath: basePath, description: description, instanceId: instanceId })];
                    case 1:
                        _f = _g.sent(), GroupId = _f.GroupId, SubDomain = _f.SubDomain;
                        apis.forEach(function (api) {
                            promiseData.push(new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var clonedApiData, groupData, newData, transformedData, data, StageName, Description, GroupId_1, e_5;
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
                                            data = _a.sent();
                                            if (!data.ApiId) return [3 /*break*/, 5];
                                            StageName = transformedData.StageName, Description = transformedData.Description, GroupId_1 = transformedData.GroupId;
                                            StageName = StageName || stageName;
                                            return [4 /*yield*/, this.publishApi(client, { StageName: StageName, ApiId: data.ApiId, Description: Description, GroupId: GroupId_1 })];
                                        case 4:
                                            _a.sent();
                                            _a.label = 5;
                                        case 5:
                                            setTimeout(function () {
                                                console.log(api.apiName + " is successed deployed");
                                                resolve('');
                                            }, 500);
                                            return [3 /*break*/, 7];
                                        case 6:
                                            e_5 = _a.sent();
                                            reject(e_5);
                                            return [3 /*break*/, 7];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); }));
                        });
                        return [4 /*yield*/, Promise.all(promiseData)];
                    case 2:
                        _g.sent();
                        this.__report({
                            name: 'apigateway',
                            access: loadsh_1.default.get(inputs, 'project.access'),
                            content: {
                                groupName: groupName,
                                apis: apis,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXNDO0FBQ3RDLGtEQUF1QjtBQUN2Qix1REFBMEM7QUFDMUMsMkRBQXFDO0FBQ3JDLDBDQUErRDtBQUUvRDtJQUEyQyxpQ0FBYTtJQUl0RCx1QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUdPLGlDQUFTLEdBQWpCLFVBQWtCLElBQUk7UUFBdEIsaUJBa0JDO1FBakJDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUN2QyxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtnQkFDakUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkM7aUJBQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQ3ZFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtvQkFDN0IsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJ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