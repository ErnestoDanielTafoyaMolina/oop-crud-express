import { Router } from "express";
import usersControllers from "../controllers/users.controllers.js";

class UserRoutes{
    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get('/all',usersControllers.getAllUsers );
        this.router.post( '/create',usersControllers.createUser );
        this.router.route( '/:idUser' )
            .get( usersControllers.getUserById )
            .put( usersControllers.updateUser )
            .delete( usersControllers.deleteUser );
    }

        getRoutes(){
            return this.router;
        }
    }

export default new UserRoutes();