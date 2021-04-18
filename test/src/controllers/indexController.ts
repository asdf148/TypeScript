import {Request, Response, NextFunction} from 'express';
import { IToken } from '../interface/IToken';
import { IUser } from '../interface/IUser';
import IndexService from '../services/indexService';

export default class IndexController{
    private indexService = new IndexService();


    public index = (req: Request, res: Response, next:NextFunction) => {
        const page = this.indexService.index();
        res.render(page);
    }

    public join = (req: Request, res: Response, next:NextFunction) => {
        const page = this.indexService.join();
        res.render(page);
    }

    public login = (req: Request, res: Response, next:NextFunction) => {
        const page = this.indexService.login();
        res.render(page);
    }

    public posts = (req: Request, res: Response, next:NextFunction) => {
        const page: Promise<Array<string|IUser[]|IToken>> = this.indexService.posts();
        page.then((pages)=>{
            // console.log(pages);
            if(typeof pages[0] == "string" && typeof pages[2]  == "string"){
                res.render(pages[0], {posts: pages[1], user: pages[2]});
            }
            else if(typeof(pages[0]) == "string"){
                const OUser:IToken = pages[2];
                res.render(pages[0], {posts: pages[1], user: OUser.nick});
            }
        });
    }

    public write = (req: Request, res: Response, next:NextFunction) => {
        const page = this.indexService.write();
        res.render(page);
    }
}