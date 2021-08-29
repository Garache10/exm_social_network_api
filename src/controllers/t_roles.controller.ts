import { Request, Response } from "express";
import Rol from "../models/t_roles";

class RolController {
    
    public async getRoles(req: Request, res: Response): Promise<void> {
        const roles = await Rol.find();
        res.json(roles);
    }

    public async getRolById(req: Request, res: Response): Promise<void> {
        const rol = await Rol.findById(req.params.id);
        if(rol == null){
            res.json({ status: 404, message: 'rol not found' });
        } else {
            res.json(rol);
        }
    }

    public async createRol(req: Request, res: Response): Promise<void> {
        const newRol = new Rol(req.body);
        await newRol.save();
        res.json({ status: 200, newRol });
    }

    public async updateRol(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const rol = await Rol.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: 'rol updated', rol });
    }

    public async deleteRol(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const rol = await Rol.findByIdAndRemove(id);
        res.json({ message: 'rol deleted', rol });
    }
}

//Export controller
export { RolController };