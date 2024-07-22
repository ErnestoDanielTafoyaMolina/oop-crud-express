import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { conf } from "./config.js";
import usersRoutes from "./routes/users.routes.js";
class AppServer{
    app = express();
    port;
    constructor(){
        this.SetSettings();
        this.SetMiddlewares();
        this.SetRoutes();
    }

    SetSettings(){
        this.app.set( 'port',conf.getPort() );
        this.port = this.app.get('port');
    }

    SetMiddlewares(){
        this.app.use(morgan( "dev" ));
        this.app.use( json() );
        this.app.use(urlencoded({ extended: false }));
    }

    SetRoutes(){
        this.app.use('/api/users', usersRoutes.getRoutes() );

        this.app.use(( req, res ) => {
            res.status( 404 ).json({ error: 'Not found' });
        } );
    }

    Init(){
        console.log(this.port)
        this.app.listen(this.port);
    }
}

export const app = new AppServer();