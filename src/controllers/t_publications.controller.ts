import { Request, Response } from "express";
import Publication from "../models/t_publications";

class PublicationController {

    public async getPublications(req: Request, res: Response): Promise<void> {
        const publications = await Publication.find();
        res.json(publications);
    }

    public async getPublicationById(req: Request, res: Response): Promise<void> {
        const publication = await Publication.findById(req.params.id);
        if (publication == null) {
            res.json({ status: 404, message: 'publication not found' });
        } else {
            res.json(publication);
        }
    }

    public async getPublicationsByOwner(req: Request, res: Response): Promise<void> {
        const publications = await Publication.find({ owner: req.params.owner });
        if (publications == null) {
            res.json({ status: 404, message: 'this user not have publications' });
        } else {
            res.json(publications);
        }
    }

    public async createPublication(req: Request, res: Response): Promise<void> {
        const newPublication = new Publication(req.body);
        await newPublication.save();
        res.json({ status: 200, message: 'publication created' });
    }

    public async updatePublication(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const Now = Date.now();
        req.body.lastModifiedDate = Now;
        const publication = await Publication.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: 'publication updated', publication });
    }

    public async deletePublication(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const publication = await Publication.findByIdAndRemove(id);
        res.json({ message: 'publication deleted', publication });
    }
}

export { PublicationController };