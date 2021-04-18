import {Document} from 'mongoose';

export interface IUser extends Document{
    nick: string;
    email: string;
    password: string;
}