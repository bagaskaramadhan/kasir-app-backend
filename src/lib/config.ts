import * as dotenv from "dotenv"
dotenv.config();

export type Iconfig = Config;
export class Config {
    port = process.env.NODE_PORT || "3001";
	dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
    dbHost = process.env.DB_HOST || ""
    dbPassword = process.env.DB_PASSWORD || ""
    dbUsername = process.env.DB_USERNAME || ""
    dbName = process.env.DB_DATABASE || ""
}