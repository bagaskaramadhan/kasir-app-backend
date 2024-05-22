import { Router } from "express";
import { GetAllProduct } from "./get/getAllProduct";

const baseRouter = Router();
const prefix = "/api/v1";

// GET
baseRouter.get(`${prefix}/products`, GetAllProduct);


export { baseRouter };