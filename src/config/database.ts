import {createConnection} from "mysql2/promise"
import dotenv from 'dotenv';
dotenv.config();

export const connect = async () => {
    return createConnection({
        host : process.env.HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.MYSQL_DB
    });
}

