import { Schema, model } from "mongoose";
import User from "./t_users";

const Publication = new Schema({
    owner: { type: User, required: true },
    title: { type: String, required: false },
    text: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
    lastModifiedDate: { type: Date, default: Date.now() },
    images: { type: String, required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default model('t_publications', Publication);

