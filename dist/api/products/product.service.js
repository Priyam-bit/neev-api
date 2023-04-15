"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductVariant = exports.DeleteProduct = exports.UpdateProduct = exports.UpdateProductVariant = exports.AddNewProduct = exports.GetProductVariantById = exports.GetProductsById = exports.GetProducts = void 0;
const database_1 = require("../../config/database");
const ResponseDTO_1 = require("../../Models/ResponseDTO");
const GetProducts = async () => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, fields] = await db_connection.execute(`select product.id, product_variant.id as variantId, product.name, product.rating, 
            product.reviewCount, product_variant.size, product_variant.price,
            product_variant.discountPrice
            from product join product_variant on product.id = product_variant.productId
            where inStock=true`, []);
        queryResults.success = 1;
        queryResults.data = rows;
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.GetProducts = GetProducts;
const GetProductsById = async (productId) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, fields] = await db_connection.execute(`select product.id, product_variant.id as variantId, product.name, product.rating, 
            product.reviewCount, product.description, product_variant.size, product_variant.price,
            product_variant.discountPrice
            from product join product_variant on product.id = product_variant.productId
            where inStock=true and product.id=?`, [productId]);
        queryResults.success = 1;
        queryResults.data = rows;
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.GetProductsById = GetProductsById;
const GetProductVariantById = async (productId, productVariantId) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, fields] = await db_connection.execute(`select product.id, product_variant.id as variantId, product.name, product.rating, 
            product.reviewCount, product.description, product_variant.size, product_variant.price,
            product_variant.discountPrice
            from product join product_variant on product.id = product_variant.productId
            where inStock=true and product.id = ? and product_variant.id = ?`, [productId, productVariantId]);
        queryResults.success = 1;
        if (rows.length !== 0) {
            queryResults.data = rows[0];
        }
        else {
            queryResults.success = 0;
            queryResults.message = 'Not found';
        }
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.GetProductVariantById = GetProductVariantById;
const AddNewProduct = async (product) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    // const {name, rating, reviewCount, categoryId, description} : 
    // {name : string, rating? : number | null, reviewCount? : number | null, categoryId? : number | null,
    // description? : string | null} = product
    await db_connection.beginTransaction();
    let existingProduct;
    try {
        const [row, field] = await db_connection.execute(`select id from product
            where name = ?`, [product.name]);
        existingProduct = row;
        if (existingProduct.length === 0) {
            //insert into product table
            await db_connection.execute(`insert into product(name,rating,reviewCount,categoryId,description)
                values(?,?,?,?,?)`, [product.name,
                product.rating ? product.rating : 0,
                product.reviewCount ? product.reviewCount : 0,
                product.categoryId,
                product.description ? product.description : null]);
        }
        let productId;
        if (existingProduct.length !== 0) {
            productId = existingProduct[0].id;
        }
        else {
            const [row1, field1] = await db_connection.execute(`SELECT LAST_INSERT_ID() as productId`);
            productId = row1[0].productId;
        }
        //insert product variant
        await db_connection.execute(`insert into product_variant(productId,size,price,discountPrice,availableUnits,inStock)
            values(?,?,?,?,?,true)`, [productId,
            product.size,
            product.price,
            product.discountPrice ? product.discountPrice : null,
            product.availableUnits]);
        await db_connection.commit();
        queryResults.success = 1;
        queryResults.message = "Added product successfully";
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.AddNewProduct = AddNewProduct;
const UpdateProductVariant = async (productVariant, productId, productVariantId) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    let updatedValues = Object.values(productVariant);
    updatedValues.push(productVariantId);
    updatedValues.push(productId);
    await db_connection.beginTransaction();
    try {
        await db_connection.execute(`UPDATE product_variant SET ${Object.keys(productVariant).map((key, i) => `${key} = ?`).join(',')}
            WHERE id = ? and productId = ?`, updatedValues);
        await db_connection.commit();
        queryResults.success = 1;
        queryResults.message = "Updated product variant successfully";
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.UpdateProductVariant = UpdateProductVariant;
const UpdateProduct = async (product, productId) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    let updatedValues = Object.values(product);
    updatedValues.push(productId);
    await db_connection.beginTransaction();
    try {
        await db_connection.execute(`UPDATE product SET ${Object.keys(product).map((key, i) => `${key} = ?`).join(',')}
            WHERE id = ?`, updatedValues);
        await db_connection.commit();
        queryResults.success = 1;
        queryResults.message = "Updated product successfully";
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.UpdateProduct = UpdateProduct;
const DeleteProduct = async (productId) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, fields] = await db_connection.execute(`delete from product where product.id = ?`, [productId]);
        queryResults.success = 1;
        queryResults.message = "Deleted product successfully";
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    return queryResults;
};
exports.DeleteProduct = DeleteProduct;
const DeleteProductVariant = async (productId, productVariantId) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, fields] = await db_connection.execute(`delete from product_variant 
            where product_variant.id = ? and product_variant.productId = ?`, [productVariantId, productId]);
        queryResults.success = 1;
        queryResults.message = "Deleted product variant successfully";
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    return queryResults;
};
exports.DeleteProductVariant = DeleteProductVariant;
