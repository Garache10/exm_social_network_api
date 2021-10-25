import { Router } from "express";
import { ProfileController } from "../controllers/t_profile.controller";

class ProfileRouter {

    router: Router;
    controller: ProfileController;

    constructor () {
        this.router = Router();
        this.controller = new ProfileController();     
        this.routes();   
    }

    routes() {
        this.router.get('/:user', this.controller.getProfileByUser);
        this.router.put('/:id', this.controller.updateProfile);
    }
}

const tRouter = new ProfileRouter();
export default tRouter.router;