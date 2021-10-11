import { Router } from 'express';
import { CommentController } from '../controllers/t_comments.controller';

class CommentRouter {
    
    router: Router;
    controller: CommentController;

    constructor () {
        this.router = Router();
        this.controller = new CommentController();
        this.routes();
    }

    routes () {
        this.router.get('/', this.controller.getComments);
        this.router.get('/:id', this.controller.getCommentById);
        this.router.get('/post/:post', this.controller.getCommentByPublication);
        this.router.post('/', this.controller.createComment);
        this.router.put('/:id', this.controller.updateComment);
        this.router.delete('/:id', this.controller.deleteComment);
    }
}

const tRouter = new CommentRouter();
export default tRouter.router;