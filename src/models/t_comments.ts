import { Schema, model } from "mongoose";
import Publication from "./t_publications";
import User from "./t_users";

const Comment = new Schema({
    text: { type: String, required: true },
    image: { type: String, required: false },
    owner: { type: Schema.Types.ObjectId, ref: User, required: true },
    post: { type: Schema.Types.ObjectId, ref: Publication, required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default model('t_comments', Comment);