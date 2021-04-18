"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var testController_1 = __importDefault(require("../../controllers/testController"));
var route = express_1.Router();
exports.default = (function (app) {
    var testController = new testController_1.default();
    app.use('/test', route);
    route.get('/', testController.index);
    route.get('/token', testController.testToken);
});
