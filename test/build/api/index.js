"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = __importDefault(require("./route/index"));
var test_1 = __importDefault(require("./route/test"));
var auth_1 = __importDefault(require("./route/auth"));
var post_1 = __importDefault(require("./route/post"));
exports.default = (function () {
    var app = express_1.Router();
    index_1.default(app);
    test_1.default(app);
    auth_1.default(app);
    post_1.default(app);
    return app;
});
