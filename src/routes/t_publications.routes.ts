import { Router } from "express";
import { PublicationController } from "../controllers/t_publications.controller";

class PublicationRouter {

    router: Router;
    controller: PublicationController;

    constructor () {
        this.router = Router();
        this.controller = new PublicationController();
        this.routes();
    }

    routes () {
        this.router.get('/', this.controller.getPublications);
        this.router.get('/:id', this.controller.getPublicationById);
        this.router.get('/owner/:owner', this.controller.getPublicationsByOwner);
        this.router.post('/', this.controller.createPublication);
        this.router.put('/:id', this.controller.updatePublication);
        this.router.delete('/:id', this.controller.deletePublication);
    }
}

const tRouter = new PublicationRouter();
export default tRouter.router;