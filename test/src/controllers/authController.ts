import {Request, Response, NextFunction} from "express";
import AuthService from "../services/authService";

export default class AuthController {
    private authService = new AuthService();

    public auth = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
        const {user, code} = req.body;
        console.log(user);
        const router = await this.authService.userCreate(JSON.parse(user), code);
        return res.redirect(router);
    }

    public join = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        const {email, nick, password, repassword} = req.body;
        if(password == repassword){
            const user = await this.authService.join(nick, email, password);
            console.log(JSON.stringify(user));
            return res.render("auth.ejs",{user: JSON.stringify(user) });
        }
        else{
            res.send("passwords are different");
        }
    }

    public login = async(req: Request, res:Response, next:NextFunction) => {
        const {email, password} = req.body;
        const path = await this.authService.login(email, password);
        res.redirect(path);
    }
}