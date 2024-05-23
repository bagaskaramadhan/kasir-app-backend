import { RequestHandler } from "express";
import { ProductsEntity } from "../../../entity/productEntity";
import dayjs from "dayjs";

export const GetAllProduct: RequestHandler = async (req, res, { }) => {
    try {
        // let query = `
        // SELECT 
        // ${stateProduct()} 
        // FROM
        // ${TableName.PRODUCT}`;
        // const getAllProduct = await ProductsEntity.query(query)
        // const result = await productTransform(getAllProduct)
        // return res.status(200).send(result)
        const getAllProduct = await ProductsEntity.find();
        let result: any = []
        await getAllProduct.map(item => {
            result.push({
                idProduct: item.idProduct,
                productName: item.productName,
                categoryId: item.categoryId,
                stock: item.stock,
                price: item.price,
                description: item.description,
                imgUrl: item.imgUrl,
                updatedAt: !item.updatedAt ? item.updatedAt : dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
                createdAt: !item.createdAt ? item.createdAt : dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
            })
        })
        return res.status(200).send(result)
    } catch (err) {
        console.error("Error @GetAllProduct", err)
        return res.status(404).send({ error: "Not found" })
    }
}