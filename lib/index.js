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
var base_1 = __importDefault(require("./base"));
var logger_1 = __importDefault(require("./logger"));
var entity_1 = require("./entity");
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
                        console.log(e_1);
                        console.log(params);
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
            var credentials, AccountID, apiArn, _a, apis, groupName, _b, stageName, regionId, _c, basePath, _d, description, _e, instanceId, customerDomain, promiseData, client, _f, GroupId, SubDomain, apiNameList;
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
                                                resolve(api.apiName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXNDO0FBQ3RDLGtEQUF1QjtBQUN2QixnREFBbUM7QUFDbkMsb0RBQThCO0FBQzlCLG1DQUF3RDtBQUV4RDtJQUEyQyxpQ0FBYTtJQUl0RCx1QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUdPLGlDQUFTLEdBQWpCLFVBQWtCLElBQUk7UUFBdEIsaUJBa0JDO1FBakJDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUN2QyxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtnQkFDakUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkM7aUJBQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQ3ZFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtvQkFDN0IsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJ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