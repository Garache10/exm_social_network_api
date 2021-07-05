import { Schema, model } from "mongoose";
//import { timeStamp } from "node:console";

const t_user = new Schema({
    firstname: { type: String, required: true },
    secondname: { type: String, required: false },
    firstLastname: { type: String, required: true },
    secondLastname: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
    LastModifiedDate: { type: Date, default: Date.now() },
    Active: { type: Boolean, default: true }
    //TimeStamp: { type: timeStamp, default: Date.now() }
});

export default model('t_users', t_user);