"use strict";
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
var SHARED_API_INSTANCE = 'api-shared-vpc-001';
var API_SERVICE_ADDRESS_ERROR = 'InvalidApiServiceAddressError';
var ComponentDemo = /** @class */ (function () {
    function ComponentDemo() {
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
    ComponentDemo.prototype.getClient = function (region) {
        if (region === void 0) { region = 'cn-hangzhou'; }
        if (!this.client || this.region !== region) {
            this.region = region;
            this.client = new pop_core_1.default({
                accessKeyId: 'STS.NTMNTmPHqdfS9aQdfpnJxEPWT',
                accessKeySecret: 'Aavf3KsKXiwrz3JSiWCf2ZLD6QLEhyregGm8xBTd4bq7',
                securityToken: 'CAISgwJ1q6Ft5B2yfSjIr5f4Be7ZvZdQ06S4O0fggGYlYsVUqpX8tjz2IHlOfHBgBe8ct/8zmmhV7vkflq1vRoRZHdot6Q/htsY5yxioRqacke7XhOV2pf/IMGyXDAGBr622Su7lTdTbV+6wYlTf7EFayqf7cjPQND7Mc+f+6/hdY88QQxOzYBdfGd5SPXECksIBMmbLPvvfWXyDwEioVRQx41Es1jgjtP3imJPEsyCz1gOqlrUnwK3qOYWhYsVWO5Nybsy4xuQedNCaiXQIskgWq/0v1/AaoWqf4YyHS0dc5RmBKeHO9cZ0JQRyYbU8B6tDoPX4jvZ/ouHJkID625f9+QOItIy0GoABWLS1JDznhQdvP8MJ3A15OxEpYzrSuoNEO1uCMp5JaV6tDAPuNJk4ffFqdZTYy/y4KLHXd25Ud5y1qS2uBiIqQJv+cc52jk/Fgqg38OgcO1B/c+3tPItS3O79AWSNO3uK2QGd3MdhxIUPBa0MZS4Zu7gun0Qc6OWUBYvxrpD05I0=',
                endpoint: "https://fc-open.cn-hangzhou.aliyuncs.com",
                apiVersion: '2020-03-10'
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
                            method: 'GET',
                            timeout: 20000
                        };
                        return [4 /*yield*/, client.request(method, params, requestOption)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ComponentDemo.prototype.deploy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.getClient();
                        return [4 /*yield*/, this.invokeApi('OpenFcService', client, { path: '/service/open' })];
                    case 1:
                        result = _a.sent();
                        console.log(result, 'result');
                        return [2 /*return*/];
                }
            });
        });
    };
    return ComponentDemo;
}());
exports.default = ComponentDemo;
var a = new ComponentDemo();
a.deploy();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdG9wZW5mYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0b3BlbmZjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXNDO0FBTXRDLElBQU0sbUJBQW1CLEdBQUcsb0JBQW9CLENBQUM7QUFDakQsSUFBTSx5QkFBeUIsR0FBRywrQkFBK0IsQ0FBQztBQVVsRTtJQUlJO0lBRUEsQ0FBQztJQUdPLGlDQUFTLEdBQWpCLFVBQWtCLElBQUk7UUFBdEIsaUJBa0JDO1FBakJHLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUNyQyxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtnQkFDL0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDekM7aUJBQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQ3JFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtvQkFDM0IsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssaUJBQWlCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLGdCQUFnQixFQUFFO3dCQUM1SCxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQy9CO29CQUNELE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUE7YUFDeEI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFFTyxpQ0FBUyxHQUFqQixVQUFrQixNQUFzQjtRQUF0Qix1QkFBQSxFQUFBLHNCQUFzQjtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0JBQUksQ0FBQztnQkFDbkIsV0FBVyxFQUFFLCtCQUErQjtnQkFDNUMsZUFBZSxFQUFFLDhDQUE4QztnQkFDL0QsYUFBYSxFQUFFLGtoQkFBa2hCO2dCQUNqaUIsUUFBUSxFQUFFLDBDQUEwQztnQkFDcEQsVUFBVSxFQUFFLFlBQVk7YUFDM0IsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVhLGlDQUFTLEdBQXZCLFVBQXdCLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTs7Ozs7O3dCQUNwQyxhQUFhLEdBQUc7NEJBQ2xCLE1BQU0sRUFBRSxLQUFLOzRCQUNiLE9BQU8sRUFBRSxLQUFLO3lCQUNqQixDQUFDO3dCQUNLLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsRUFBQTs0QkFBMUQsc0JBQU8sU0FBbUQsRUFBQzs7OztLQUM5RDtJQUdZLDhCQUFNLEdBQW5COzs7Ozs7d0JBRVEsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDZixxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFDLENBQUMsRUFBQTs7d0JBQS9FLE1BQU0sR0FBRyxTQUFzRTt3QkFDckYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7Ozs7O0tBRWhDO0lBRUwsb0JBQUM7QUFBRCxDQUFDLEFBNURELElBNERDOztBQUlELElBQU0sQ0FBQyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7QUFDOUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBIn0=