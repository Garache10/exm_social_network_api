import { Schema, model } from "mongoose";

const Publication = new Schema({
    owner: { type: String, required: true },
    title: { type: String, required: false },
    text: { type: String, required: true },
    images: { type: String, required: false },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default model('t_publications', Publication);

