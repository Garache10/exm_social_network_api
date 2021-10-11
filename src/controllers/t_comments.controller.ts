import { Console } from "console";
import { Request, Response } from "express";
import Comment from "../models/t_comments";

class CommentController {

    public async getComments(req: Request, res: Response): Promise<void> {
        try {
            const comments = await Comment.find();
            res.json(comments);
        } catch (error) {
            console.log('Error: ' + error);
            res.json({ message: error });
        }
    }

    public async getCommentById(req: Request, res: Response): Promise<void> {
        try {
            const comment = await Comment.findById(req.params.id);
            if (comment == null) {
                res.status(404).json({ status: 404 , message: 'comment not found' });
            } else {
                res.json(comment);
            }
        } catch (error) {
            console.log('Error: ' + error);
            res.json({ message: error });
        }
    }

    public async getCommentByPublication(req: Request, res: Response): Promise<void> {
        try {
            const comments = await Comment.find({ post: req.params.post }).populate('owner', 'firstname firstLastname username')
            .populate('post', 'title');
            if (comments == null) {
                res.status(404).json({ status: 404 , message: 'No comments found' });
            } else {
                res.json(comments);
            }
        } catch (error) {
            console.log('Error: ' + error);
            res.json({ message: error });
        }
    }

    public async createComment(req: Request, res: Response): Promise<void> {
        const newComment = new Comment(req.body);
        try {
            await newComment.save();
            res.json({ status: 200, message: 'comment added', newComment });
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }

    public async updateComment(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const comment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ message: 'comment updated', comment });
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }

    public async deleteComment(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const comment = await Comment.findByIdAndRemove(id);
            res.json({ message: 'comment deleted', comment });
        } catch (error) {
            console.log("Error: " + error);
            res.json({ message: error });
        }
    }
}

export { CommentController };