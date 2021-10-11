import { Schema, model } from "mongoose";
import User from './t_users';

const Publication = new Schema({
    owner: { type: String, ref: User, required: true },
    title: { type: String, required: false },
    text: { type: String, required: true },
    images: { type: String, required: false },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default model('t_publications', Publication);

