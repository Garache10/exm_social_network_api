import { Router } from "express";
import { RolController } from "../controllers/t_roles.controller";

class RolRouter {
    router: Router;
    controller: RolController;

    constructor() {
        this.router = Router();
        this.controller = new RolController();
        this.routes();
    }

    routes() {
        this.router.get('/', this.controller.getRoles);
        this.router.get('/:id', this.controller.getRolById);
        this.router.post('/', this.controller.createRol);
        this.router.put('/:id', this.controller.updateRol);
        this.router.delete('/:id', this.controller.deleteRol);
    }
}

const tRouter = new RolRouter();
export default tRouter.router;