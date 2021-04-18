import { IPost } from "../interface/IPost";
import { IToken } from "../interface/IToken";
import jwt from "jsonwebtoken";
import Post from "../models/post";
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./src/token');

export default class IndexService{
    
    public index(): string{
        return "index.html";
    }

    public join(): string{
        return "join.html";
    }

    public login(): string{
        return "login.html";
    }

    // public async posts():Promise<Array<string|IPost[]|IToken>|undefined>{
    //     const token = localStorage.getItem("token");
    //     const {TOKEN_SECRET} = process.env;
    //     if(TOKEN_SECRET){
    //         const jsonUser:IToken = jwt.verify(token, TOKEN_SECRET);
    //         const posts :IPost[] = await Post.find({});
    //         // console.log("posts: " + posts);
    //         return ["posts.ejs", posts, jsonUser];
    //     }
    // }

    public async posts():Promise<Array<string|IPost[]|IToken>>{
        const token = localStorage.getItem("token");
        const {TOKEN_SECRET} = process.env;
        let jsonUser:any;
        let posts:any;
        if(TOKEN_SECRET){
            try{
                jsonUser = jwt.verify(token, TOKEN_SECRET);
            }
            catch(error){
                console.error(error.name);
                jsonUser = "user";
            }
            posts = await Post.find({});
            // console.log("posts: " + posts);
            
        }
        return ["posts.ejs", posts, jsonUser];
    }

    public write(): string{
        return "write.html";
    }
}