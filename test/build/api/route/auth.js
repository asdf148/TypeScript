"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = __importDefault(require("../../controllers/authController"));
var route = express_1.Router();
exports.default = (function (app) {
    var authController = new authController_1.default();
    app.use('/auth', route);
    route.post("/certification", authController.auth);
    route.post('/join', authController.join);
    route.post('/login', authController.login);
});
