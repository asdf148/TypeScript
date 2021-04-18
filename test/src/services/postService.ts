import Post from "../models/post";
import jwt from "jsonwebtoken";
import { IToken } from "../interface/IToken";
import { IPost } from "../interface/IPost";
import { isValidObjectId } from "mongoose";
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./src/token');
const {TOKEN_SECRET} = process.env;

export default class PostService{
    public updatePage(post:string, user:string):string[] {
        console.log("postService updatePage: " + post, user);
        return ["update.ejs", post, user];
    }

    public async create(title: string, content: string ):Promise<object|undefined>{
        try{
            
            if(TOKEN_SECRET){
                const token = localStorage.getItem("token");
                const jsonUser:IToken = jwt.verify(token, TOKEN_SECRET);
                console.log(jsonUser);

                const post:IPost = await Post.create({
                    title,
                    content,
                    writer: jsonUser.nick,
                });

                console.log("postService: "+post);

                return post;
            }
        }
        catch(error){
            console.log(error);
        }
    }
    
    public async update(id:string, title:string, content:string){
        // if(TOKEN_SECRET){
        //     const token = localStorage.getItem("token");
        //     const jsonUser:IToken = jwt.verify(token, TOKEN_SECRET);
        //     console.log(jsonUser);

            
        // }

        console.log("postService update " + id, title, content);

        await Post.updateOne({
            _id:id,
        },
        {
            title: title,
            content: content,
        });
    }

    public async delete(id:string):Promise<void>{
        console.log("postService delete: "+id);
        await Post.remove({_id:id});
        console.log("Post removed?");
    }
}