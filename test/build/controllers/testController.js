"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var testService_1 = __importDefault(require("../services/testService"));
var TestController = /** @class */ (function () {
    function TestController() {
        var _this = this;
        this.testService = new testService_1.default();
        this.index = function (req, res, next) {
            var page = _this.testService.test();
            res.render(page);
        };
        this.testToken = function (req, res, next) {
            var token = _this.testService.testToken();
            res.send(token);
        };
    }
    return TestController;
}());
exports.default = TestController;
