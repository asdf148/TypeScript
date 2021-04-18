"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var postService_1 = __importDefault(require("../services/postService"));
var PostController = /** @class */ (function () {
    function PostController() {
        var _this = this;
        this.postService = new postService_1.default();
        this.updatePage = function (req, res) {
            var _a = req.query, post = _a.post, user = _a.user;
            var page;
            console.log(post, user);
            console.log(typeof post, typeof user);
            if (typeof post == "string" && typeof user == "string") {
                page = _this.postService.updatePage(post, user);
                res.render(page[0], { post: page[1], user: page[2] });
            }
            else {
                res.send("Server Error");
            }
        };
        this.create = function (req, res, next) {
            var _a = req.body, title = _a.title, content = _a.content;
            var post = _this.postService.create(title, content);
            console.log("postController: " + post);
            return res.send(post);
        };
        this.update = function (req, res) {
            var _a = req.body, post = _a.post, title = _a.title, content = _a.content;
            _this.postService.update(post, title, content);
            res.redirect("/posts");
        };
        this.delete = function (req, res) {
            _this.postService.delete(req.params.id);
            res.redirect("/posts");
        };
    }
    return PostController;
}());
exports.default = PostController;
