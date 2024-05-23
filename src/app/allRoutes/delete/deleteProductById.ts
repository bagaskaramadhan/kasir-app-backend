import { RequestHandler } from "express";
import { ProductsEntity } from "../../../entity/productEntity";

export const DeleteProductById: RequestHandler = async (req, res, { }) => {
    try {
        const id = req.params.id;
        const checkProductId = await ProductsEntity.findOneBy({ idProduct: id })

        if (!checkProductId || checkProductId === null || checkProductId === undefined) {
            return res.status(404).send({ message: "Id not found" })
        }
        await ProductsEntity.delete({ idProduct: id })
        return res.sendStatus(200);
    } catch (err) {
        console.log("Error @DeleteProductById", err);
        return res.status(400).send({ message: "Failed to delete" })
    }
}