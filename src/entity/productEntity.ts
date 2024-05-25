import { Entity, BaseEntity, PrimaryColumn, Column, getMetadataArgsStorage } from "typeorm"
import dayjs from "dayjs";

@Entity({ name: "ks_product" })

export class ProductsEntity extends BaseEntity {
    @PrimaryColumn({ name: "product_id" })
    idProduct: string;

    @Column({ name: "product_name" })
    productName: string;

    @Column({ name: "category_id" })
    categoryId: number;

    @Column({ name: "stock" })
    stock: string;

    @Column({ name: "price" })
    price: string;

    @Column({ name: "description" })
    description: string;

    @Column({ name: "img_url" })
    imgUrl: string;

    @Column({ name: "updated_at", type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date | string;

    @Column({ name: "created_at", type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date | string;

};

// function untuk select * from
export const stateProduct = (entityClass: any) => {
    const columnsMap = getMetadataArgsStorage()
    .columns;
    const filteredColumns = columnsMap.filter(column => column.target === entityClass);
    
    const columnNames = filteredColumns.map(item => item.options.name);
    const columnNameString = columnNames.join(", ");
    return columnNameString;
}

// function mapping ketika pakai query()
export const productTransform = async (data: any) => {
    let arrResult: any = [];
    await data.map((item: any) => {
        arrResult.push({
            idProduct: item.product_id,
            productName: item.product_name,
            categoryId: item.category_id,
            stock: item.stock,
            price: item.price,
            description: item.description,
            imgUrl: item.img_url,
            updatedAt: !item.updated_at ? item.updated_at : dayjs(item.updated_at).format("YYYY-MM-DD HH:mm:ss"),
            createdAt: !item.created_at ? item.created_at : dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss"),
        })
    })
    return arrResult;
};