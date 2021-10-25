import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from "../models/t_users";
import Profile from '../models/t_profile';
import TransactionLog from '../models/admin.models/t_logs';

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
        newUser.password = await newUser.encryptPassword(newUser.password);
        try {
            await newUser.save();
            const newProfile = new Profile();
            newProfile.user = newUser._id;
            await newProfile.save();
            res.json({ status: 200, newUser });
        } catch (error) {
            console.log("ERROR: " + error);
            res.json({ message: error });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
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

    public async loginUser(req: Request, res: Response): Promise<void> {
        const transaction = new TransactionLog({
            process: 'API_loginUser',
            jsonRequest: JSON.stringify(req.body)
        }); //Create log object
        
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const credentials = await user.validatePassword(req.body.password);
                if (credentials) {
                    const Sessiontoken: string = jwt.sign({ _id: user._id }, process.env.SECRET_KEY || 'SECRET_KEY');
                    transaction.jsonResponse = JSON.stringify({
                        message: 'Welcome ' + user.username, 
                        userData: {
                            username: user.username,
                            firstname: user.firstname,
                            secondname: user.secondname,
                            firstLastname: user.firstLastname,
                            secondLastname: user.secondLastname,
                            email: user.email,
                            _id: user._id
                        }, 
                        sessionToken: Sessiontoken});  // add json request to log object
                    transaction.complete = true; // status of log object
                    await transaction.save(); // save log
                    res.status(200).json({ 
                        message: 'Welcome ' + user.username, 
                        userData: {
                            username: user.username,
                            firstname: user.firstname,
                            secondname: user.secondname,
                            firstLastname: user.firstLastname,
                            secondLastname: user.secondLastname,
                            email: user.email,
                            _id: user._id
                        }, 
                        sessionToken: Sessiontoken});  // WS response
                } else {
                    res.status(400).json({ message: 'Invalid Password, try again!' });
                }
            } else {
                res.status(400).json({ message: 'Invalid Credentials, try again!' });
            }
        } catch (error) {
            res.status(400).json({ message: 'A problem occurred, try again!' });
        }
    }
}

export { UserController };