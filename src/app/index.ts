import express from "express";
import http from "http";
import { Config } from "../lib/config";

const config = new Config;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
server.listen(config.port);
console.info(`Server running on server ${config.port}`);