import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "tutors-dev2",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.*"],
    migrations: ["migrations/*.*"],
    subscribers: [],
});

export default AppDataSource;