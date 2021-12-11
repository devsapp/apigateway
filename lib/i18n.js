"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultProfilePath = exports.getProfileFile = exports.getConfig = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var i18n_1 = require("i18n");
var core = require('@serverless-devs/core');
function getConfig(key) {
    var profile = getProfileFile();
    return profile[key];
}
exports.getConfig = getConfig;
function getProfileFile() {
    var profileResult = {};
    try {
        var profileFilePath = getDefaultProfilePath();
        profileResult = js_yaml_1.default.load(fs_1.default.readFileSync(profileFilePath, 'utf8')) || {};
    }
    catch (e) {
        console.log(e);
    }
    return profileResult;
}
exports.getProfileFile = getProfileFile;
function getDefaultProfilePath() {
    console.log(core);
    return path_1.default.join(core.getRootHome(), 'set-config.yml');
}
exports.getDefaultProfilePath = getDefaultProfilePath;
var i18n = new i18n_1.I18n({
    locales: ['en', 'zh'],
    directory: path_1.default.join(__dirname, '..', 'locales'),
});
var locale = getConfig('locale');
if (locale) {
    i18n.setLocale(locale);
}
else {
    i18n.setLocale('en');
}
exports.default = i18n;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBDQUFvQjtBQUNwQiw4Q0FBd0I7QUFDeEIsb0RBQTJCO0FBQzNCLDZCQUE0QjtBQUM1QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUU5QyxTQUFnQixTQUFTLENBQUMsR0FBVztJQUNqQyxJQUFNLE9BQU8sR0FBRyxjQUFjLEVBQUUsQ0FBQztJQUNqQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBSEQsOEJBR0M7QUFHRCxTQUFnQixjQUFjO0lBQzFCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQTtJQUN0QixJQUFJO1FBQ0EsSUFBTSxlQUFlLEdBQUcscUJBQXFCLEVBQUUsQ0FBQztRQUNoRCxhQUFhLEdBQUcsaUJBQUksQ0FBQyxJQUFJLENBQUMsWUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDN0U7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEI7SUFFRCxPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDO0FBVkQsd0NBVUM7QUFHRCxTQUFnQixxQkFBcUI7SUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQixPQUFPLGNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUhELHNEQUdDO0FBRUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUM7SUFDbEIsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNyQixTQUFTLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQztDQUNuRCxDQUFDLENBQUM7QUFHSCxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkMsSUFBSSxNQUFNLEVBQUU7SUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzFCO0tBQU07SUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3hCO0FBRUQsa0JBQWUsSUFBSSxDQUFDIn0=