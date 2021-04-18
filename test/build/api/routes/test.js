"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var indexController_1 = __importDefault(require("../../controllers/indexController"));
var route = express_1.Router();
exports.default = (function (app) {
    var indexController = new indexController_1.default();
    app.use('/test', route);
    route.get('/', indexController.index);
});
