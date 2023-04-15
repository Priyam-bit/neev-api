import { Connection } from "mysql2/promise";
import { connect } from "../../config/database";
import { ResponseDTO } from "../../Models/ResponseDTO";
import { UserDTO } from "../../Models/UserDTO";

export const GetUsers = async ()
: Promise<ResponseDTO<UserDTO[]>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<UserDTO[]>(0);
    try {
        const [rows, _] = await db_connection.execute(
            `select email, firstName, lastName, userType
            from user`
        )
        queryResults.success = 1;
        queryResults.data = rows as Array<UserDTO>;
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
}

export const GetUserById = async (id : string)
: Promise<ResponseDTO<UserDTO>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<UserDTO>(0);
    try {
        const [rows, _] = await db_connection.execute(
            `select email, firstName, lastName, userType
            from user 
            where id = ?`,
            [id]
        )
        queryResults.success = 1;
        if((rows as Array<UserDTO>).length !== 0) {
            queryResults.data = (rows as Array<UserDTO>)[0];
        } else {
            queryResults.success = 0;
            queryResults.message = 'Not found';
        }
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
}

export const DeleteUser = async (id : string)
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    try {
        const [rows, _] = await db_connection.execute(
            `delete from user 
            where id = ?`,
            [id]
        )
        queryResults.success = 1;
        queryResults.message = "User deleted successfully";
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
}

export const CreateUser = async (user : UserDTO)
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    console.log(`password : ${user.password}`);
    try {
        const [rows, _] = await db_connection.execute(
            `insert into user 
            (email, firstName, lastName, password, userType)
            values (?, ?, ?, ?, ?)`,
            [user.email, user.firstName, user.lastName, user.password, user.userType]
        )
        queryResults.success = 1;
        queryResults.message = "User created successfully";
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
}

export const UpdateUser = async (userId : string ,updatedUser : UserDTO) 
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    let updatedValues = Object.values(updatedUser);
    updatedValues.push(userId);
    try {
        await db_connection.execute(
            `UPDATE user SET ${Object.keys(updatedUser).map((key,i) => `${key} = ?`).join(',')}
            WHERE id = ?`,
            updatedValues
        )
        queryResults.success = 1;
        queryResults.message = `Updated user successfully`;
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    }
    db_connection.end();
    return queryResults;
}

export const GetUserByEmail = async (email : string)
: Promise<ResponseDTO<UserDTO>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<UserDTO>(0);
    try {
        const [rows, _] = await db_connection.execute(
            `select * from user 
            where email = ?`,
            [email]
        )
        queryResults.success = 1;
        if((rows as Array<UserDTO>).length !== 0) {
            queryResults.data = (rows as Array<UserDTO>)[0];
        } else {
            queryResults.success = 0;
            queryResults.message = 'Not found';
        }
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    db_connection.end();
    return queryResults;
}

