import { RequestHandler } from "express";
import { v4 as uuid } from 'uuid';
import joi from "joi"
import dayjs from "dayjs";
import { ProductsEntity, productTransform, stateProduct } from "../../../entity/productEntity";
import { upload } from "../../../lib/helper/upload";
import { TableName } from "../../../lib/helper/constant";

export const PostCreateProduct: RequestHandler = async (req, res, { }) => {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error("Error uploading file:", err);
                return res.status(400).json({ error: err.message });
            }

            const bodyFormat = joi.object({
                productName: joi.string().min(3).required(),
                categoryId: joi.string().required(),
                stock: joi.number().required(),
                price: joi.number().required(),
                description: joi.string(),
            })

            const { error, value } = bodyFormat.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }

            // create custom id
            // check how many data today
            let customId;
            const state = stateProduct()
            const currentDate = dayjs().format("YYMMDD");

            // looping to find id not used
            for (let i = 0; ; i++) {
                customId = `ID${currentDate}-${i}`;
                const query = `
                SELECT ${state}
                FROM ${TableName.PRODUCT}
                WHERE LOWER(product_id) = LOWER("${customId}")
            `;
                const rawQuery = await ProductsEntity.query(query);
                const resultCheckProduct = await productTransform(rawQuery);
                if (resultCheckProduct.length < 1) {
                    break; // stop if any id not used
                }
            }
            // custom id finish

            const productData = new ProductsEntity();
            productData.idProduct = customId;
            productData.productName = value.productName;
            productData.categoryId = value.categoryId;
            productData.stock = value.stock;
            productData.price = value.price;
            productData.description = value.description || "";
            productData.imgUrl = !req.file ? "default.png" : req.file.filename;
            productData.createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
            await productData.save();
            return res.sendStatus(200);
        });

    } catch (err) {
        console.error("Error @PostCreateProduct", err)
        return res.status(400).send({ error: "Data failed to create" })
    }
}