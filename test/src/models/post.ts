import { Schema } from "mongoose";
import mongoose from "mongoose";
import {IPost} from "../interface/IPost";

const PostSchema:Schema = new Schema({
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

export default mongoose.model<IPost>("Post", PostSchema);