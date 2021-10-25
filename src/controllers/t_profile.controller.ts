import { Request, Response } from "express";
import Profile from "../models/t_profile";

class ProfileController {

    public async getProfileByUser (req: Request, res: Response): Promise<void> {
        try {
            const profile = await Profile.findOne({ user: req.params.user }).populate('user', 'username firstname secondname firstLastname secondLastname email');
            if (profile == null) {
                res.json({ status: 404, message: 'this profile doesnt exists' });
            } else {
                res.json(profile);
            }
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }

    public async updateProfile (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const profile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ message: 'profile updated', profile });
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });   
        }
    }
}

export { ProfileController };