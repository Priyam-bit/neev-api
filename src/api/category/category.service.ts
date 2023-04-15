import { Connection } from "mysql2/promise";
import { connect } from "../../config/database";
import { Category } from "../../Models/Category";
import { ResponseDTO } from "../../Models/ResponseDTO";

export const GetCategories =  async () : 
Promise<ResponseDTO<Category[]>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<Category[]>(0);
    try {
        const [rows,fields] = await db_connection.execute(
            `select * from category`,
            []
        )
        queryResults.success = 1;
        queryResults.data = rows as Array<Category>;
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    
    }
    db_connection.end();
    return queryResults;
}

export const GetCategoryById =  async (categoryId : string) : 
Promise<ResponseDTO<Category>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<Category>(0);
    try {
        const [rows,fields] = await db_connection.execute(
            `select * from category where id = ?`,
            [categoryId]
        )
        queryResults.success = 1;
        if((rows as Array<Category>).length !== 0) {
            queryResults.data = (rows as Array<Category>)[0];
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

export const CreateCategory = async (newCategory : Category) 
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    try {
        await db_connection.execute(
            `insert into category(categoryName, categoryImage) values(?,?)`,
            [newCategory.categoryName, 
            newCategory.categoryImage ? newCategory.categoryImage : null]
        )
        queryResults.success = 1;
        queryResults.message = `Added category "${newCategory.categoryName}" successfully`;
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    }
    return queryResults;
}

export const UpdateCategory = async (categoryId : string ,updatedCategory : Category) 
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    let updatedValues = Object.values(updatedCategory);
    updatedValues.push(categoryId);
    try {
        await db_connection.execute(
            `UPDATE category SET ${Object.keys(updatedCategory).map((key,i) => `${key} = ?`).join(',')}
            WHERE id = ?`,
            updatedValues
        )
        queryResults.success = 1;
        queryResults.message = `Updated category successfully`;
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    }
    return queryResults;
}

export const DeleteCategory =  async (categoryId : string) : 
Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    try {
            await db_connection.execute(
            `delete from category where id = ?`,
            [categoryId]
        )
        queryResults.success = 1;
        queryResults.message = "Deleted category successfully";
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    
    }
    db_connection.end();
    return queryResults;
}