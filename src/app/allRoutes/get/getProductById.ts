import { RequestHandler } from "express";
import { ProductsEntity } from "../../../entity/productEntity";
import dayjs from "dayjs";

export const GetProductById: RequestHandler = async (req, res, { }) => {
    try {
        const id = req.params.id
        const getProductId = await ProductsEntity.findOneBy({ idProduct: id });
        const result = {
            idProduct: getProductId?.idProduct,
            productName: getProductId?.productName,
            categoryId: getProductId?.categoryId,
            stock: getProductId?.stock,
            price: getProductId?.price,
            description: getProductId?.description,
            imgUrl: getProductId?.imgUrl,
            updatedAt: !getProductId?.updatedAt?getProductId?.updatedAt:dayjs(getProductId?.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            createdAt: !getProductId?.createdAt?getProductId?.createdAt:dayjs(getProductId?.createdAt).format("YYYY-MM-DD HH:mm:ss")
        }
        return res.status(200).send(result)
    } catch (err) {
        console.error("Error @GetProductById", err)
        return res.status(404).send({ error: "Not found" })
    }
}