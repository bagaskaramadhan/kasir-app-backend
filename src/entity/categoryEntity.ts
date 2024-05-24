import { Entity, BaseEntity, PrimaryColumn, Column, getMetadataArgsStorage } from "typeorm"

@Entity({ name: "ks_category" })

export class CategoryEntity extends BaseEntity {
    @PrimaryColumn({ name: "category_id" })
    categoryId: number;

    @Column({ name: "category_name" })
    categoryName: string;
};

// function only for select * from
export const stateCategory = () => {
    const columnsMap = getMetadataArgsStorage()
        .columns
        .map(item => item.options.name);
    const columnName = columnsMap.join(", ");
    return columnName;
};

// function mapping when use query()
export const categoryTransform = async (data: any) => {
    let arrResult: any = [];
    await data.map((item: any) => {
        arrResult.push({
            categoryId: item.category_id,
            categoryName: item.category_name,
        })
    })
    return arrResult;
};