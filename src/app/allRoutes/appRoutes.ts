import { Router } from "express";
import { GetAllProduct } from "./get/getAllProduct";
import { PostCreateProduct } from "./post/postCreateProduct";

const baseRouter = Router();
const prefix = "/api/v1";

// GET
baseRouter.get(`${prefix}/products`, GetAllProduct);

// POST
baseRouter.post(`${prefix}/products`, PostCreateProduct)


export { baseRouter };