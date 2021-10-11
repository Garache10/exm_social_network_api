import { Request, Response } from "express";
import Publication from "../models/t_publications";

class PublicationController {

    public async getPublications(req: Request, res: Response): Promise<void> {
        try {
            const publications = await Publication.find();
            res.json(publications);
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }

    public async getPublicationById(req: Request, res: Response): Promise<void> {
        try {
            const publication = await Publication.findById(req.params.id);
            if (publication == null) {
                res.json({ status: 404, message: 'publication not found' });
            } else {
                res.json(publication);
            }   
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }

    public async getPublicationsByOwner(req: Request, res: Response): Promise<void> {
        try {
            const publications = await Publication.find({ owner: req.params.owner });
            if (publications == null) {
                res.json({ status: 404, message: 'this user not have publications' });
            } else {
                res.json(publications);
            } 
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }

    public async createPublication(req: Request, res: Response): Promise<void> {
        const newPublication = new Publication(req.body);
        try {
            await newPublication.save();
            res.json({ status: 200, message: 'publication created', newPublication });
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }

    public async updatePublication(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const publication = await Publication.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ message: 'publication updated', publication });
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }

    public async deletePublication(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const publication = await Publication.findByIdAndRemove(id);
            res.json({ message: 'publication deleted', publication });
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }
}

export { PublicationController };