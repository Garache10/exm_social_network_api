import { Schema, model } from "mongoose";
import User from "./t_users";

const Profile = new Schema({
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    bio: { type: String, required: false },
    picture: { type: String }
});

export default model('t_profile', Profile);