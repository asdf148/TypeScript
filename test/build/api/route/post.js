"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var method_override_1 = __importDefault(require("method-override"));
var postController_1 = __importDefault(require("../../controllers/postController"));
var route = express_1.Router();
exports.default = (function (app) {
    var postController = new postController_1.default();
    app.use(method_override_1.default("_method"));
    app.use("/posts", route);
    route.get("/update", postController.updatePage);
    route.post("/write", postController.create);
    route.put("/update", postController.update);
    route.delete("/delete/:id", postController.delete);
});
