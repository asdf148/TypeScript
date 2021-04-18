import { Router } from "express";
import IndexController from "../../controllers/indexController";
const route = Router();

export default (app: Router) =>{
    const indexController = new IndexController();
    app.use('/', route);

    route.get('/', indexController.index);

    route.get('/join', indexController.join);

    route.get('/login', indexController.login);

    route.get('/posts', indexController.posts);

    route.get('/write', indexController.write);
}