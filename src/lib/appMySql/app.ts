import * as mysql from "mysql2"
import { Config } from "../config"
import { DataSource } from "typeorm";
import { CategoryEntity, ProductsEntity } from "../../entity/main";

const config = new Config()
export const connectionMySQL = async () => {

    const connection = mysql.createConnection({
        host: config.dbHost,
        user: config.dbUsername,
        password: config.dbPassword,
        database: config.dbName,
        port: config.dbPort
    });

    connection.connect((err) => {
        if (err) {
            console.log("Error @connectionMySQL", err);
        } else {
            console.error(`CONNECTED ON ${config.dbName}`);
        }
    });
};

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbName,
    entities: [ProductsEntity, CategoryEntity],
    synchronize: false,
    logging: false,
});