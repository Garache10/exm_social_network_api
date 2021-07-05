import { Request, Response } from 'express';
import TUser from "../models/t_users";

class T_User_Controller {
 
    public async getUsers(req: Request, res: Response): Promise<void> {
        const users = await TUser.find();
        res.json(users);
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const user = await TUser.findById(req.params.id);
        if(user == null){
            res.json({ status: 404, message: 'user not found'});
        } else{
            res.json(user);
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const newUser = new TUser(req.body);
        await newUser.save();
        res.json({ status: 200, newUser});
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const Now = Date.now();
        req.body.LastModifiedDate = Now;
        const user = await TUser.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: 'user updated', user });
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await TUser.findByIdAndRemove(id); 
        res.json({ message: 'user deleted', user });
    }
}

// Export controller
export { T_User_Controller };