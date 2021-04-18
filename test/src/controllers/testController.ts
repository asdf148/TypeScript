import {Request, Response, NextFunction} from 'express';
import TestService from '../services/testService';

export default class TestController{
    private testService = new TestService();


    public index = (req: Request, res: Response, next:NextFunction) => {
        const page = this.testService.test();
        res.render(page);
    }

    public testToken = (req: Request, res: Response, next:NextFunction) => {
        const token = this.testService.testToken();
        res.send(token);
    }
}