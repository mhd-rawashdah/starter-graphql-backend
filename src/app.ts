import express, { Application } from 'express';
import cors from 'cors';
import logger from 'morgan';
import hpp from 'hpp';
import { ErrorsHandlerMiddleware } from './middlewares/';


const { NODE_ENV, PORT } = process.env;

class App {
    private app: Application;
    private port: (string | number);
    private prodEnv: boolean;

    constructor() {
        this.app = express();
        this.port = PORT || 5000;
        this.prodEnv = NODE_ENV === 'prod';

        // TODO connect to DB
        this.connectDB();

        // Don't change the order
        this.initMiddlewares();
        this.initApi();
        this.initErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port} in ${NODE_ENV} environment...`);
        });
    }

    private async connectDB() {
        try {
            // CONNECT TO DB
            console.log("DB Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }

    private initMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(logger( this.prodEnv? 'combined' : 'dev'));
        this.app.use(hpp());
    }

    private initApi() {
        // TODO Init APIs
    }

    private initErrorHandling() {
        this.app.use(ErrorsHandlerMiddleware.notFound);
        this.app.use(ErrorsHandlerMiddleware.errorHandle);
    }

    // TODO init sawgger
}

export default App;