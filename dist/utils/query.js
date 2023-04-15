"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
function query(conn, sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql.sql, sql.values, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}
exports.query = query;
