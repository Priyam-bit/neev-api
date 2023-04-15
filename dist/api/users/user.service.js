"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByEmail = exports.UpdateUser = exports.CreateUser = exports.DeleteUser = exports.GetUserById = exports.GetUsers = void 0;
const database_1 = require("../../config/database");
const ResponseDTO_1 = require("../../Models/ResponseDTO");
const GetUsers = async () => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, _] = await db_connection.execute(`select email, firstName, lastName, userType
            from user`);
        queryResults.success = 1;
        queryResults.data = rows;
    }
    catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.GetUsers = GetUsers;
const GetUserById = async (id) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, _] = await db_connection.execute(`select email, firstName, lastName, userType
            from user 
            where id = ?`, [id]);
        queryResults.success = 1;
        if (rows.length !== 0) {
            queryResults.data = rows[0];
        }
        else {
            queryResults.success = 0;
            queryResults.message = 'Not found';
        }
    }
    catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.GetUserById = GetUserById;
const DeleteUser = async (id) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, _] = await db_connection.execute(`delete from user 
            where id = ?`, [id]);
        queryResults.success = 1;
        queryResults.message = "User deleted successfully";
    }
    catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.DeleteUser = DeleteUser;
const CreateUser = async (user) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    console.log(`password : ${user.password}`);
    try {
        const [rows, _] = await db_connection.execute(`insert into user 
            (email, firstName, lastName, password, userType)
            values (?, ?, ?, ?, ?)`, [user.email, user.firstName, user.lastName, user.password, user.userType]);
        queryResults.success = 1;
        queryResults.message = "User created successfully";
    }
    catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.CreateUser = CreateUser;
const UpdateUser = async (userId, updatedUser) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    let updatedValues = Object.values(updatedUser);
    updatedValues.push(userId);
    try {
        await db_connection.execute(`UPDATE user SET ${Object.keys(updatedUser).map((key, i) => `${key} = ?`).join(',')}
            WHERE id = ?`, updatedValues);
        queryResults.success = 1;
        queryResults.message = `Updated user successfully`;
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.UpdateUser = UpdateUser;
const GetUserByEmail = async (email) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, _] = await db_connection.execute(`select * from user 
            where email = ?`, [email]);
        queryResults.success = 1;
        if (rows.length !== 0) {
            queryResults.data = rows[0];
        }
        else {
            queryResults.success = 0;
            queryResults.message = 'Not found';
        }
    }
    catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
};
exports.GetUserByEmail = GetUserByEmail;
