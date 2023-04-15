import { Request } from "express"
import { Connection } from "mysql2/promise"
import { connect } from "../../config/database"
import { ProductVariant } from "../../Models/ProductVariant"
import { ProductDTO } from "../../Models/ProductDTO"
import { ResponseDTO } from "../../Models/ResponseDTO"
import { Product } from "../../Models/Product"

export const GetProducts =  async () : 
Promise<ResponseDTO<ProductDTO[]>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<ProductDTO[]>(0);
    try {
        const [rows,fields] = await db_connection.execute(
            `select product.id, product_variant.id as variantId, product.name, product.rating, 
            product.reviewCount, product_variant.size, product_variant.price,
            product_variant.discountPrice
            from product join product_variant on product.id = product_variant.productId
            where inStock=true`,
            []
        )
        queryResults.success = 1;
        queryResults.data = rows as Array<ProductDTO>;
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    
    }
    db_connection.end();
    return queryResults;
}

export const GetProductsById =  async (productId : string) :
Promise<ResponseDTO<ProductDTO[]>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<ProductDTO[]>(0);
    try {
        const [rows,fields] = await db_connection.execute(
            `select product.id, product_variant.id as variantId, product.name, product.rating, 
            product.reviewCount, product.description, product_variant.size, product_variant.price,
            product_variant.discountPrice
            from product join product_variant on product.id = product_variant.productId
            where inStock=true and product.id=?`,
            [productId],
        )
        queryResults.success = 1;
        queryResults.data = rows as Array<ProductDTO>;
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    
    }
    db_connection.end();
    return queryResults;
}

export const GetProductVariantById =  async (productId : string, productVariantId : string) : 
Promise<ResponseDTO<ProductDTO>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<ProductDTO>(0);
    try {
        const [rows,fields] = await db_connection.execute(
            `select product.id, product_variant.id as variantId, product.name, product.rating, 
            product.reviewCount, product.description, product_variant.size, product_variant.price,
            product_variant.discountPrice
            from product join product_variant on product.id = product_variant.productId
            where inStock=true and product.id = ? and product_variant.id = ?`,
            [productId,productVariantId],
        )
        queryResults.success = 1;
        if((rows as Array<ProductDTO>).length !== 0) {
            queryResults.data = (rows as Array<ProductDTO>)[0];
        } else {
            queryResults.success = 0;
            queryResults.message = 'Not found';
        }
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    
    }
    db_connection.end();
    return queryResults;
}

export const AddNewProduct =  async (product : ProductDTO) : 
Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    // const {name, rating, reviewCount, categoryId, description} : 
    // {name : string, rating? : number | null, reviewCount? : number | null, categoryId? : number | null,
    // description? : string | null} = product
    await db_connection.beginTransaction()
    let existingProduct : any[];
    try {
        const [row,field] = await db_connection.execute(
            `select id from product
            where name = ?`,
            [product.name]
        )
        existingProduct = row as any;
        if(existingProduct.length === 0) {
            //insert into product table
            await db_connection.execute(
                `insert into product(name,rating,reviewCount,categoryId,description)
                values(?,?,?,?,?)`,
                [product.name, 
                product.rating ? product.rating : 0,
                product.reviewCount ? product.reviewCount : 0,
                product.categoryId,
                product.description ? product.description : null]
            )
        }
        let productId;
        if(existingProduct.length !== 0) {
            productId = existingProduct[0].id;
        } else {
            const [row1,field1] = await db_connection.execute(
                `SELECT LAST_INSERT_ID() as productId`
            )
            productId = (row1 as any)[0].productId; 
        }
        //insert product variant
        await db_connection.execute(
            `insert into product_variant(productId,size,price,discountPrice,availableUnits,inStock)
            values(?,?,?,?,?,true)`,
            [productId,
            product.size,
            product.price,
            product.discountPrice? product.discountPrice : null,
            product.availableUnits]
        )
        await db_connection.commit();
        queryResults.success = 1;
        queryResults.message = "Added product successfully"
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    }
    db_connection.end();
    return queryResults;
}

export const UpdateProductVariant = async (productVariant : ProductVariant, productId : string, productVariantId : string) 
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    let updatedValues = Object.values(productVariant);
    updatedValues.push(productVariantId);
    updatedValues.push(productId);
    await db_connection.beginTransaction();
    try {
        await db_connection.execute(
            `UPDATE product_variant SET ${Object.keys(productVariant).map((key,i) => `${key} = ?`).join(',')}
            WHERE id = ? and productId = ?`,
            updatedValues
        );
        await db_connection.commit();
        queryResults.success = 1;
        queryResults.message = "Updated product variant successfully"
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;    
}

export const UpdateProduct = async (product : Product, productId : string) 
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    let updatedValues = Object.values(product);
    updatedValues.push(productId);
    await db_connection.beginTransaction();
    try {
        await db_connection.execute(
            `UPDATE product SET ${Object.keys(product).map((key,i) => `${key} = ?`).join(',')}
            WHERE id = ?`,
            updatedValues
        );
        await db_connection.commit();
        queryResults.success = 1;
        queryResults.message = "Updated product successfully"
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;    
}

export const DeleteProduct = async (productId : string) 
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    try {
        const [rows,fields] = await db_connection.execute(
            `delete from product where product.id = ?`,
            [productId]
        )
        queryResults.success = 1;
        queryResults.message = "Deleted product successfully"
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    
    }
    return queryResults;
}

export const DeleteProductVariant = async (productId : string, productVariantId : string) 
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    try {
        const [rows,fields] = await db_connection.execute(
            `delete from product_variant 
            where product_variant.id = ? and product_variant.productId = ?`,
            [productVariantId ,productId]
        )
        queryResults.success = 1;
        queryResults.message = "Deleted product variant successfully"
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    
    }
    return queryResults;
}
