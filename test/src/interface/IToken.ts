export interface IToken extends Object{
    nick?: string;
    email?: string;
    iat?: number;
    exp?: number;
    iss?: string;
}