import { RequestHandler } from "express";
import Joi from "joi";
import { ProductsEntity } from "../../../entity/productEntity";
import dayjs from "dayjs";

export const PutUpdateProduct: RequestHandler = async (req, res, { }) => {
    try {
        const id = req.params.id
        const bodyFormat = Joi.object({
            productName: Joi.string().min(3),
            categoryId: Joi.string(),
            stock: Joi.number(),
            price: Joi.number(),
            description: Joi.string(),
            imgUrl: Joi.string(),
        })

        const { error, value } = bodyFormat.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const checkProductId = await ProductsEntity.findOneBy({ idProduct: id })
        if (!checkProductId || checkProductId === null || checkProductId === undefined) {
            return res.status(404).send({ message: "Id not found" })
        }

        const updateProduct = new ProductsEntity();
        updateProduct.idProduct = checkProductId.idProduct;
        updateProduct.productName = !value.productName ? checkProductId.productName : value.productName;
        updateProduct.categoryId = !value.categoryId ? checkProductId.categoryId : value.categoryId;
        updateProduct.stock = !value.stock ? checkProductId.stock : value.stock;
        updateProduct.price = !value.price ? checkProductId.price : value.price;
        updateProduct.description = !value.description ? checkProductId.description : value.description;
        updateProduct.imgUrl = !value.imgUrl ? checkProductId.imgUrl : value.imgUrl;
        updateProduct.updatedAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
        // console.log("updateProduct", updateProduct)
        await updateProduct.save()

        return res.status(200).send(updateProduct)
    } catch (err) {
        console.log("Error @PutUpdateProduct", err)
        return res.status(400).send({ message: "Failed update" })
    }
}