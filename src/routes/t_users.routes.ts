import { Router } from "express";
import { UserController } from '../controllers/t_users.controller';

class UserRouter {
    router: Router;
    controller: UserController;

    constructor() {
        this.router = Router();
        this.controller = new UserController();
        this.routes();
    }

    routes() {
        this.router.get('/', this.controller.getUsers);
        this.router.get('/:id', this.controller.getUserById);
        this.router.post('/', this.controller.createUser);
        this.router.put('/:id', this.controller.updateUser);
        this.router.delete('/:id', this.controller.deleteUser);
        this.router.post('/login', this.controller.loginUser);
    }
}

const tRouter = new UserRouter();
export default tRouter.router;