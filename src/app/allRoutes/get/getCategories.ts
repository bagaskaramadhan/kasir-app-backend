import { RequestHandler } from "express";
import { CategoryEntity, categoryTransform, stateCategory } from "../../../entity/categoryEntity";
import { TableName } from "../../../lib/helper/constant";

export const GetCategories: RequestHandler = async (req, res, { }) => {
    try {
        const state = stateCategory(CategoryEntity)
        const query = `
        SELECT ${state}
        FROM ${TableName.CATEGORY}
        ORDER BY category_id ASC
        `
        const rawQuery = await CategoryEntity.query(query);
        const result = await categoryTransform(rawQuery)
        return res.status(200).send(result)
    } catch (err) {
        console.log("Error @GetCategories", err)
        return res.status(400).send(err)
    }
}