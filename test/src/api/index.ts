import { Router } from "express"
import index from "./route/index"
import test from './route/test';
import auth from "./route/auth";
import post from "./route/post";

export default () =>{
    const app = Router();
    
    index(app);
    test(app);
    auth(app);
    post(app);

    return app;
}