import {Request, Response, NextFunction} from "express";
import PostService from "../services/postService";

export default class PostController{
    private postService = new PostService();

    public updatePage = (req:Request, res:Response):void => {
        const {post, user} = req.query;
        let page:string[];
        console.log(post, user);
        console.log(typeof post, typeof user);
        if(typeof post == "string" && typeof user == "string"){
            page = this.postService.updatePage(post, user);
            res.render(page[0],{post:page[1], user:page[2]})
        }
        else{
            res.send("Server Error");
        }
    }

    public create = (req:Request, res:Response, next:NextFunction):Response => {
        const {title, content} = req.body;
        const post = this.postService.create(title, content);
        console.log("postController: "+post);
        return res.send(post);
    }

    public update = (req:Request, res:Response):void => {
        const {post, title, content} = req.body;
        this.postService.update(post, title, content);
        res.redirect("/posts");
    }

    public delete = (req:Request, res:Response):void => {
        this.postService.delete(req.params.id);
        res.redirect("/posts");
    }
}