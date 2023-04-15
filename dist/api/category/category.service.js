"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategory = exports.UpdateCategory = exports.CreateCategory = exports.GetCategoryById = exports.GetCategories = void 0;
const database_1 = require("../../config/database");
const ResponseDTO_1 = require("../../Models/ResponseDTO");
const GetCategories = async () => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, fields] = await db_connection.execute(`select * from category`, []);
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
exports.GetCategories = GetCategories;
const GetCategoryById = async (categoryId) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, fields] = await db_connection.execute(`select * from category where id = ?`, [categoryId]);
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
exports.GetCategoryById = GetCategoryById;
const CreateCategory = async (newCategory) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        await db_connection.execute(`insert into category(categoryName, categoryImage) values(?,?)`, [newCategory.categoryName,
            newCategory.categoryImage ? newCategory.categoryImage : null]);
        queryResults.success = 1;
        queryResults.message = `Added category "${newCategory.categoryName}" successfully`;
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    return queryResults;
};
exports.CreateCategory = CreateCategory;
const UpdateCategory = async (categoryId, updatedCategory) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    let updatedValues = Object.values(updatedCategory);
    updatedValues.push(categoryId);
    try {
        await db_connection.execute(`UPDATE category SET ${Object.keys(updatedCategory).map((key, i) => `${key} = ?`).join(',')}
            WHERE id = ?`, updatedValues);
        queryResults.success = 1;
        queryResults.message = `Updated category successfully`;
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    return queryResults;
};
exports.UpdateCategory = UpdateCategory;
const DeleteCategory = async (categoryId) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        await db_connection.execute(`delete from category where id = ?`, [categoryId]);
        queryResults.success = 1;
        queryResults.message = "Deleted category successfully";
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.DeleteCategory = DeleteCategory;
