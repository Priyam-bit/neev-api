"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContact = exports.AddContact = exports.GetUserContactsByEmail = exports.DeleteContact = exports.GetContactById = exports.GetContacts = void 0;
const database_1 = require("../../config/database");
const ResponseDTO_1 = require("../../Models/ResponseDTO");
const GetContacts = async () => {
    const db_connection = await (0, database_1.connect)();
    const queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, _] = await db_connection.execute(`select * from contact_detail`);
        queryResults.success = 1;
        queryResults.data = rows;
    }
    catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = 'Something went wrong with the query';
    }
    db_connection.end();
    return queryResults;
};
exports.GetContacts = GetContacts;
const GetContactById = async (id) => {
    const db_connection = await (0, database_1.connect)();
    const queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, _] = await db_connection.execute(`select * from contact_detail
            where addressId = ?`, [id]);
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
        queryResults.message = 'Something went wrong with the query';
    }
    db_connection.end();
    return queryResults;
};
exports.GetContactById = GetContactById;
const DeleteContact = async (id) => {
    const db_connection = await (0, database_1.connect)();
    const queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, _] = await db_connection.execute(`delete from contact_detail
            where addressId = ?`, [id]);
        queryResults.success = 1;
        queryResults.message = 'Deleted contact successfully';
    }
    catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = 'Something went wrong with the query';
    }
    db_connection.end();
    return queryResults;
};
exports.DeleteContact = DeleteContact;
const GetUserContactsByEmail = async (email) => {
    const db_connection = await (0, database_1.connect)();
    const queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, _] = await db_connection.execute(`select * from contact_detail
            where userId = ?`, [email]);
        queryResults.success = 1;
        queryResults.data = rows;
    }
    catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = 'Something went wrong with the query';
    }
    db_connection.end();
    return queryResults;
};
exports.GetUserContactsByEmail = GetUserContactsByEmail;
const AddContact = async (newContact) => {
    const db_connection = await (0, database_1.connect)();
    const queryResults = new ResponseDTO_1.ResponseDTO(0);
    try {
        const [rows, _] = await db_connection.execute(`insert into contact_detail
            (userId, street1, street2, city, state, country, zipcode, phone, isDefault)
            values
            (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [newContact.userId,
            newContact.street1,
            newContact.street2 ? newContact.street2 : null,
            newContact.city,
            newContact.state,
            newContact.country,
            newContact.zipcode,
            newContact.phone,
            newContact.isDefault ? 1 : 0
        ]);
        queryResults.success = 1;
        queryResults.message = 'Added contact details successfully';
    }
    catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = 'Something went wrong with the query';
    }
    db_connection.end();
    return queryResults;
};
exports.AddContact = AddContact;
const UpdateContact = async (contactId, updatedContact) => {
    const db_connection = await (0, database_1.connect)();
    let queryResults = new ResponseDTO_1.ResponseDTO(0);
    let updatedValues = Object.values(updatedContact);
    updatedValues.push(contactId);
    try {
        await db_connection.execute(`UPDATE contact_detail SET ${Object.keys(updatedContact).map((key, i) => `${key} = ?`).join(',')}
            WHERE addressId = ?`, updatedValues);
        queryResults.success = 1;
        queryResults.message = `Updated contact successfully`;
    }
    catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query";
    }
    return queryResults;
};
exports.UpdateContact = UpdateContact;
