import { Schema, model } from "mongoose";

const Rol = new Schema ({
    name: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
    active: { type: Boolean, default: true }
});

export default model("t_roles", Rol);