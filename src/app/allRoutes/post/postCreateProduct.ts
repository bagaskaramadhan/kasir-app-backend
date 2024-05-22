import { RequestHandler } from "express";
import { v4 as uuid } from 'uuid';
import joi from "joi"
import dayjs from "dayjs";
import { ProductsEntity, productTransform, stateProduct } from "../../../entity/productEntity";

export const PostCreateProduct: RequestHandler = async (req, res, { }) => {
    try {
        const bodyFormat = joi.object({
            productName: joi.string().min(3).required(),
            categoryId: joi.string().required(),
            stock: joi.number().required(),
            price: joi.number().required(),
            description: joi.string(),
            imgUrl: joi.string(),
        })
        const { error, value } = bodyFormat.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        // create custom id
        // check how many data today
        let getId: any;
        let customId: any;
        const startDate = dayjs().format("YYYY-MM-DD 00:00:00");
        const endDate = dayjs().format("YYYY-MM-DD 23:59:59");

        let query = `
        SELECT ${stateProduct()} 
        FROM ks_product
        WHERE ((created_at >= '${startDate}' AND created_at <= '${endDate}'))
        `;
        const rawQuery = await ProductsEntity.query(query);
        const checkProduct = await productTransform(rawQuery)

        for (let i = checkProduct.length; i < checkProduct.length + 1; i++) {
            customId = `ID${dayjs().format("YYMMDD-")}${i++}`;
        }
        customId = customId.split("-");
        customId = customId[1]

        // looping to get all index and fill the empty index
        let numberProductId = Number(customId);
        for (let i = 0; i <= numberProductId; i++) {
            customId = `ID${dayjs().format("YYMMDD-")}${i}`;
            const rawQuery = await ProductsEntity.query(`
            SELECT ${stateProduct()}
            FROM ks_product
            WHERE LOWER(product_id) = LOWER("${customId}"); `)
            const resultCheckProduct = await productTransform(rawQuery)
            if (resultCheckProduct.length < 1) {
                getId = `ID${dayjs().format("YYMMDD-")}${i}`;
            }
        }
        customId = getId

        const productData = new ProductsEntity();
        productData.idProduct = customId
        productData.productName = value.productName
        productData.categoryId = value.categoryId
        productData.stock = value.stock
        productData.price = value.price
        productData.description = !value.description ? "" : value.description
        productData.imgUrl = !value.imgUrl ? "" : value.imgUrl
        productData.createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss")
        // console.log("productData", productData)
        await productData.save()

        return res.sendStatus(200)
    } catch (err) {
        console.error("Error @PostCreateProduct", err)
        return res.status(400).send({ error: "Data failed to create" })
    }
}