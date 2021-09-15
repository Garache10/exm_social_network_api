import { Request, Response } from 'express';
import User from "../models/t_users";

class UserController {
 
    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.log("ERROR: " + error);
            res.json({ message: error });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.params.id);
            if(user == null){
                res.json({ status: 404, message: 'user not found' });
            } else{
                res.json(user);
            }
        } catch (error) {
            console.log("ERROR: " + error);
            res.json({ message: error });
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const newUser = new User(req.body);
        try {
            await newUser.save();
            res.json({ status: 200, newUser });
        } catch (error) {
            console.log("ERROR: " + error);
            res.json({ message: error });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const Now = Date.now();
        req.body.LastModifiedDate = Now;
        try {
            const user = await User.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ message: 'user updated', user });
        } catch (error) {
            console.log("ERROR: " + error);
            res.json({ message: error });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndRemove(id); 
            res.json({ message: 'user deleted', user });
        } catch (error) {
            console.log("ERROR: " + error);
            res.json({ message: error });
        }
    }
}

export { UserController };