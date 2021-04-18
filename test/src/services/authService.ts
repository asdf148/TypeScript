import User from "../models/user";
import bcrypt from "bcrypt";
import smtpTransport from "../config/email";
import {IUser} from "../interface/IUser";
import jwt from "jsonwebtoken";
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./src/token');
const generateRandom = () => {
    var ranNum = Math.floor(Math.random()*(999999-111111+1)) + 111111;
    return ranNum;
}
const rancode = generateRandom();

export default class AuthService {

    public async userCreate(user: IUser, code: string): Promise<string> {
        console.log(user);
        if(Number(code) == rancode){
            await User.create({
                email: user.email,
                nick: user.nick,
                password: user.password,
            });
            return "/";
        }
        else{
            return "code was wrong";
        }
    }

    public async join(nick: string, email: string, password: string) {
        try{
            const hash = await bcrypt.hash(password, 12);
            const user = {
                nick: nick,
                email: email,
                password: hash,
            };
            const mailOptions = {
                from: "TEST.site",
                to: email,
                subject: "이메일 인증번호",
                text: `이메일 인증번호: ${rancode}`
            };
            const result = await smtpTransport.sendMail(mailOptions);
            smtpTransport.close();
            console.log(result);
            return user;
        }
        catch(error){
            console.log(error)
        }
    } 

    

    // public userCreate(nick: string, email: string, password: string): object{
    //     const user = {
    //         nick,
    //         email,
    //         password,
    //     }
    //     return user;
    // }   

    public async login(email:string, password:string):Promise<string> {
        const {TOKEN_SECRET} = process.env;
        console.log(email);
        const dbUser = await User.findOne({
            email,
        });
        const user = {
            nick: dbUser?.nick,
            email: dbUser?.email,
        }
        if(localStorage.getItem('token')){
            localStorage.clear();
        }
        if(dbUser?.password && TOKEN_SECRET){
            if(await bcrypt.compare(password, dbUser?.password)){
                const token = jwt.sign(user, TOKEN_SECRET,{expiresIn: '10m', issuer: 'me'});
                localStorage.setItem("token", token);
                console.log(token);
            }
        }
        console.log(user);
        return "/";
    }
}