import Express from 'express';
import Morgan from 'morgan';
import Helmet from 'helmet';
import Compression from 'compression';
import Cors from 'cors';
import 'dotenv/config';

// Routes imports
import UserRouter from './routes/t_users.routes';
import RolRouter from './routes/t_roles.routes';
import PublicationRouter from './routes/t_publications.routes';

// Class to run the server
class Server {

    public app: Express.Application;

    // Class constructor
    constructor() {
        this.app = Express();
        this.config();
        this.routes();
    }

    // Configurations of server
    public config(): void {
        // App settings
        this.app.set('port', process.env.PORT || 5000);

        // Middlewares
        this.app.use(Morgan('dev'));
        this.app.use(Express.json());
        this.app.use(Express.urlencoded({ extended: false}));
        this.app.use(Helmet());
        this.app.use(Compression());
        this.app.use(Cors());
    }

    // Routes of other controllers
    public routes(): void {
        this.app.use('/api/users', UserRouter);
        this.app.use('api/roles', RolRouter);
        this.app.use('api/publications', PublicationRouter);
    }

    // Main Method
    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server running on port ${this.app.get('port')}`);
            console.log('Welcome to Social Network Rest API');
        });
    }
}

// Exports of this File
export { Server };