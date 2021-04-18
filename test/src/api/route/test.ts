import { Router } from "express";
import TestController from '../../controllers/testController';
const route = Router();

export default (app: Router) => {
    const testController = new TestController();
    app.use('/test', route);

    route.get('/', testController.index);

    route.get('/token', testController.testToken);
}