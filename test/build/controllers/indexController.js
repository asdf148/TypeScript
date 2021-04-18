"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var indexService_1 = __importDefault(require("../services/indexService"));
var IndexController = /** @class */ (function () {
    function IndexController() {
        var _this = this;
        this.indexService = new indexService_1.default();
        this.index = function (req, res, next) {
            var page = _this.indexService.index();
            res.render(page);
        };
        this.join = function (req, res, next) {
            var page = _this.indexService.join();
            res.render(page);
        };
        this.login = function (req, res, next) {
            var page = _this.indexService.login();
            res.render(page);
        };
        this.posts = function (req, res, next) {
            var page = _this.indexService.posts();
            page.then(function (pages) {
                // console.log(pages);
                if (typeof pages[0] == "string" && typeof pages[2] == "string") {
                    res.render(pages[0], { posts: pages[1], user: pages[2] });
                }
                else if (typeof (pages[0]) == "string") {
                    var OUser = pages[2];
                    res.render(pages[0], { posts: pages[1], user: OUser.nick });
                }
            });
        };
        this.write = function (req, res, next) {
            var page = _this.indexService.write();
            res.render(page);
        };
    }
    return IndexController;
}());
exports.default = IndexController;
