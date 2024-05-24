import express from "express";
import http from "http";
import "reflect-metadata"
import { Config } from "../lib/config";
import * as connectionMySQL from "../lib/appMySql/app";
import { baseRouter } from "./allRoutes/appRoutes";
import cors from "cors";

const config = new Config;
const app = express();

app.use('/uploads', express.static('./src/uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

const server = http.createServer(app);

// connectdb
connectionMySQL.connectionMySQL()
connectionMySQL.AppDataSource.initialize();

server.listen(config.port);
app.use("/", baseRouter);

console.info(`Server running on server ${config.port} \n`);