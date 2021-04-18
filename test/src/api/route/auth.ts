import {Router} from "express";
import AuthController from "../../controllers/authController";
const route = Router();

export default (app: Router) => {
    const authController = new AuthController();
    app.use('/auth', route);

    route.post("/certification", authController.auth)

    route.post('/join', authController.join);

    route.post('/login', authController.login);
}