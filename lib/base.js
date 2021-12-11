"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var tty_table_1 = __importDefault(require("tty-table"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var BaseComponent = /** @class */ (function () {
    function BaseComponent(inputs) {
        this.inputs = inputs;
        var libBasePath = this.__getBasePath();
        var pkgPath = path_1.default.join(libBasePath, '..', 'package.json');
        if (pkgPath) {
            var pkg = JSON.parse(fs_1.default.readFileSync(path_1.default.join(pkgPath), 'utf8'));
            this.name = pkg.name;
        }
    }
    BaseComponent.prototype.__getBasePath = function () {
        if (this.basePath) {
            return this.basePath;
        }
        // const baseName = path.basename(__dirname);
        // if (baseName !== 'lib') {
        //     this.basePath = path.join(__dirname, '..');
        // } else {
        this.basePath = __dirname;
        // }
        return this.basePath;
    };
    BaseComponent.prototype.__doc = function (projectName) {
        var libBasePath = this.__getBasePath();
        var docPath = path_1.default.join(libBasePath, '..', 'doc', 'doc.json');
        if (fs_1.default.existsSync(docPath)) {
            var fileContent = fs_1.default.readFileSync(docPath).toString();
            var result = JSON.parse(fileContent);
            var options = {
                borderStyle: "solid",
                borderColor: "blue",
                headerAlign: "center",
                align: "left",
                color: "cyan",
                width: "100%"
            };
            var header = [{
                    value: "方法",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: "auto",
                    formatter: function (value) {
                        return value;
                    }
                }, {
                    value: "方法说明",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: "auto",
                    formatter: function (value) {
                        return value;
                    }
                }, {
                    value: "入参示例",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    }
                }, {
                    value: "命令行调用示例",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    }
                }];
            var rows_1 = [];
            var data = lodash_get_1.default(result, 'children[0].children', []).filter(function (item) { return item.kindString === 'Method' && lodash_get_1.default(item, 'flags.isPublic'); });
            var cliStr_1 = projectName ? "s " + projectName : "s cli " + this.name; // 独立组件执行使用cli
            data.forEach(function (item) {
                var params = lodash_get_1.default(item, 'signatures[0].parameters[0]', {});
                var paramText = lodash_get_1.default(params, 'comment.text', '');
                rows_1.push([item.name, lodash_get_1.default(item, 'signatures[0].comment.shortText', ''), paramText, cliStr_1 + " " + item.name]);
            });
            return tty_table_1.default(header, rows_1, options).render();
        }
        else {
            return 'not found doc content';
        }
    };
    BaseComponent.prototype.__report = function (reportData) {
        if (process && process.send) {
            var name_1 = reportData.name, content = reportData.content, access = reportData.access;
            process.send({
                action: 'resource',
                data: {
                    access: access,
                    name: name_1,
                    content: JSON.stringify(content)
                }
            });
            return content;
        }
        ;
    };
    return BaseComponent;
}());
exports.default = BaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsMENBQW9CO0FBQ3BCLDhDQUF3QjtBQUN4Qix3REFBOEI7QUFDOUIsMERBQTZCO0FBRTdCO0lBS0ksdUJBQXNCLE1BQVc7UUFBWCxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBQzdCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxJQUFNLE9BQU8sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDN0QsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxxQ0FBYSxHQUFiO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3hCO1FBQ0QsNkNBQTZDO1FBQzdDLDRCQUE0QjtRQUM1QixrREFBa0Q7UUFDbEQsV0FBVztRQUNQLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzlCLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELDZCQUFLLEdBQUwsVUFBTSxXQUFvQjtRQUN0QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekMsSUFBTSxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRSxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDeEIsSUFBTSxXQUFXLEdBQVcsWUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLElBQU0sT0FBTyxHQUFHO2dCQUNaLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsV0FBVyxFQUFFLFFBQVE7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxNQUFNO2FBQ2hCLENBQUE7WUFDRCxJQUFNLE1BQU0sR0FBRyxDQUFDO29CQUNaLEtBQUssRUFBRSxJQUFJO29CQUNYLFdBQVcsRUFBRSxNQUFNO29CQUNuQixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixTQUFTLEVBQUUsVUFBVSxLQUFLO3dCQUN0QixPQUFPLEtBQUssQ0FBQztvQkFDakIsQ0FBQztpQkFDSixFQUFFO29CQUNDLEtBQUssRUFBRSxNQUFNO29CQUNiLFdBQVcsRUFBRSxNQUFNO29CQUNuQixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixTQUFTLEVBQUUsVUFBVSxLQUFLO3dCQUN0QixPQUFPLEtBQUssQ0FBQztvQkFDakIsQ0FBQztpQkFDSixFQUFFO29CQUNDLEtBQUssRUFBRSxNQUFNO29CQUNiLFdBQVcsRUFBRSxNQUFNO29CQUNuQixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixTQUFTLEVBQUUsVUFBVSxLQUFLO3dCQUN0QixPQUFPLEtBQUssQ0FBQztvQkFDakIsQ0FBQztpQkFDSixFQUFFO29CQUNDLEtBQUssRUFBRSxTQUFTO29CQUNoQixXQUFXLEVBQUUsTUFBTTtvQkFDbkIsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsU0FBUyxFQUFFLFVBQVUsS0FBSzt3QkFDdEIsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLENBQUM7aUJBQ0osQ0FBQyxDQUFBO1lBQ0YsSUFBTSxNQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQU0sSUFBSSxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxJQUFJLG9CQUFHLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLEVBQTNELENBQTJELENBQUMsQ0FBQztZQUNuSSxJQUFJLFFBQU0sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQUssV0FBYSxDQUFDLENBQUMsQ0FBQyxXQUFTLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQyxjQUFjO1lBQ3BGLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dCQUNkLElBQU0sTUFBTSxHQUFHLG9CQUFHLENBQUMsSUFBSSxFQUFFLDZCQUE2QixFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCxJQUFNLFNBQVMsR0FBRyxvQkFBRyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELE1BQUksQ0FBQyxJQUFJLENBQ0wsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFHLENBQUMsSUFBSSxFQUFFLGlDQUFpQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBSyxRQUFNLFNBQUksSUFBSSxDQUFDLElBQU0sQ0FBQyxDQUNyRyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUE7WUFFRixPQUFPLG1CQUFLLENBQUMsTUFBTSxFQUFFLE1BQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNoRDthQUFNO1lBQ0gsT0FBTyx1QkFBdUIsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFUyxnQ0FBUSxHQUFsQixVQUFtQixVQUFVO1FBQ3pCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDakIsSUFBQSxNQUFJLEdBQXNCLFVBQVUsS0FBaEMsRUFBRSxPQUFPLEdBQWEsVUFBVSxRQUF2QixFQUFFLE1BQU0sR0FBSyxVQUFVLE9BQWYsQ0FBZTtZQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNULE1BQU0sRUFBRSxVQUFVO2dCQUNsQixJQUFJLEVBQUU7b0JBQ0YsTUFBTSxRQUFBO29CQUNOLElBQUksUUFBQTtvQkFDSixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7aUJBQ25DO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsT0FBTyxPQUFPLENBQUM7U0FDbEI7UUFBQSxDQUFDO0lBQ04sQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQTdHRCxJQTZHQyJ9