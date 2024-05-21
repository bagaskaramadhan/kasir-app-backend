import * as dotenv from "dotenv"
dotenv.config();

export type Iconfig = Config;
export class Config {
    port = process.env.NODE_PORT || "3001";
}