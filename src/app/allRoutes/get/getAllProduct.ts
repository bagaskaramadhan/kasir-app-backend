import { RequestHandler } from "express";
import { ProductsEntity, productTransform, stateProduct } from "../../../entity/productEntity";
import dayjs from "dayjs";
import joi from "joi"
import { TableName } from "../../../lib/helper/constant";

export const GetAllProduct: RequestHandler = async (req, res, { }) => {
    try {
        const defaultMaxSizeData = parseInt(process.env.MAX_SIZE_DATA ? process.env.MAX_SIZE_DATA : "10");
        const params = joi.object({
            productName: joi.string(),
            categoryId: joi.number(),
            page: joi.number().default(1),
            size: joi.number().default(defaultMaxSizeData),
            sort: joi.string().default("created_date"),
            order: joi.string().default("ASC")
        })

        const { error, value } = params.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const state = stateProduct(ProductsEntity);
        let query = ` FROM ${TableName.PRODUCT} `;
        query = query + " WHERE ";
        query = query + ` ${TableName.PRODUCT}.stock IS NOT NULL `;

        if (value?.productName) {
            query = query + ` AND LOWER(${TableName.PRODUCT}.product_name) LIKE '%${value?.productName.toLowerCase()}%' `;
        }

        if (value?.categoryId) {
            query = query + ` AND ${TableName.PRODUCT}.category_id = ${value?.categoryId} `;
        }

        query = `SELECT ${state} ` + query;
        const rawQuery = await ProductsEntity.query(query);
        const result = await productTransform(rawQuery)

        return res.status(200).send(result)
    } catch (err) {
        console.error("Error @GetAllProduct", err)
        return res.status(404).send({ error: "Not found" })
    }
}