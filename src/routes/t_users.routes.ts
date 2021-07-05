import { Router } from "express";
import { T_User_Controller } from '../controllers/t_users.controller';

class t_user_Router {
    router: Router;
    controller: T_User_Controller;

    constructor(){
        this.router = Router();
        this.controller = new T_User_Controller();
        this.routes();
    }

    routes() {
        this.router.get('/', this.controller.getUsers);
        this.router.get('/:id', this.controller.getUserById);
        this.router.post('/', this.controller.createUser);
        this.router.put('/:id', this.controller.updateUser);
        this.router.delete('/:id', this.controller.deleteUser);
    }
}

const tRouter = new t_user_Router();
export default tRouter.router;