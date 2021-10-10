import { Schema, model, Document } from "mongoose";
import Bcrypt from 'bcrypt';

export interface IUser extends Document {
    firstname: string;
    secondname: string;
    firstLastname: string;
    secondLastname: string;
    username: string;
    password: string;
    email: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
};

const User = new Schema<IUser>({
    firstname: { type: String, required: true },
    secondname: { type: String, required: false },
    firstLastname: { type: String, required: true },
    secondLastname: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    Active: { type: Boolean, default: true }
}, {
    timestamps: true
});

User.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await Bcrypt.genSalt(10);
    return Bcrypt.hash(password, salt);
};

User.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await Bcrypt.compare(password, this.password);
};

export default model<IUser>('t_users', User);