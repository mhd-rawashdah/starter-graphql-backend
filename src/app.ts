import "reflect-metadata";
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import logger from 'morgan';
import hpp from 'hpp';
import { ErrorsHandlerMiddleware } from './middlewares/';
import { buildSchema, Query } from 'type-graphql';
import { AppDataSource } from '../db';
import { RegsiterResolver } from "./graphql";

const { NODE_ENV, PORT } = process.env;


class WelcomeResolver {
    @Query(() => String)
    async welcome() {
        return "Welcome onboard!!";
    }
}

class App {
    private app: Application;
    private port: (string | number);
    private prodEnv: boolean;

    constructor() {
        this.app = express();
        this.port = PORT || 5000;
        this.prodEnv = NODE_ENV === 'prod';

        this.connectDB();

        // Don't change the order
        this.initMiddlewares();
        this.initGraphQL(this.app);
        // this.initErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port} in ${NODE_ENV} environment...`);
        });
    }

    private async connectDB() {
        try {
            await AppDataSource.initialize();
            console.log("DB Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }

    private initMiddlewares(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(logger( this.prodEnv? 'combined' : 'dev'));
        this.app.use(hpp());
    }

    private async initGraphQL(app: Application) {
        const schema = await buildSchema({
            resolvers: [RegsiterResolver, WelcomeResolver]
        });
        const apolloServer = new ApolloServer({schema});

        await apolloServer.start();

        apolloServer.applyMiddleware({app});
    }

    // private initApi(): void {
    //     // TODO Init APIs
    // }

    // private initErrorHandling(): void {
    //     this.app.use(ErrorsHandlerMiddleware.notFound);
    //     this.app.use(ErrorsHandlerMiddleware.errorHandle);
    // }

    // TODO init sawgger
}

export default App;