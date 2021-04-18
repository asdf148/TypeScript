"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorage = require('node-localstorage').LocalStorage, localStorage = new LocalStorage('./src/token');
var TestService = /** @class */ (function () {
    function TestService() {
    }
    TestService.prototype.test = function () {
        return "test.html";
    };
    TestService.prototype.testToken = function () {
        return localStorage.getItem("token");
    };
    return TestService;
}());
exports.default = TestService;
