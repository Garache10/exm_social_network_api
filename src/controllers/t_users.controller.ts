import { Request, Response } from 'express';
import User from "../models/t_users";

class UserController {
 
    public async getUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find();
        res.json(users);
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const user = await User.findById(req.params.id);
        if(user == null){
            res.json({ status: 404, message: 'user not found' });
        } else{
            res.json(user);
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ status: 200, newUser });
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const Now = Date.now();
        req.body.LastModifiedDate = Now;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: 'user updated', user });
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await User.findByIdAndRemove(id); 
        res.json({ message: 'user deleted', user });
    }
}

// Export controller
export { UserController };