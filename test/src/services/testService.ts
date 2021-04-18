import jwt from "jsonwebtoken";
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./src/token');

export default class TestService{
    public test(): string{
        return "test.html"
    }

    public testToken(): string{
        return localStorage.getItem("token");
    }
}