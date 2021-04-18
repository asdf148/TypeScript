import { Schema } from "mongoose";
import mongoose from "mongoose";
import {IUser} from "../interface/IUser";

const UserSchema:Schema = new Schema({
    nick:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

export default mongoose.model<IUser>("User", UserSchema);