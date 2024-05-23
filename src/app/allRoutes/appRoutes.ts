import { Router } from "express";
import { GetAllProduct } from "./get/getAllProduct";
import { PostCreateProduct } from "./post/postCreateProduct";
import { PutUpdateProduct } from "./put/putUpdateProduct";
import { DeleteProductById } from "./delete/deleteProductById";

const baseRouter = Router();
const prefix = "/api/v1";

// GET
baseRouter.get(`${prefix}/products`, GetAllProduct);

// POST
baseRouter.post(`${prefix}/products`, PostCreateProduct)

// PUT
baseRouter.put(`${prefix}/products/:id`, PutUpdateProduct)

// DELETE
baseRouter.delete(`${prefix}/products/:id`, DeleteProductById)


export { baseRouter };