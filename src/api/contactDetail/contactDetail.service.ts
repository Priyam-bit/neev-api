import { Connection } from "mysql2/promise";
import { connect } from "../../config/database";
import { ContactDetail } from "../../Models/ContactDetail";
import { ResponseDTO } from "../../Models/ResponseDTO";

export const GetContacts = async ()
: Promise<ResponseDTO<ContactDetail[]>> => {
    const db_connection : Connection = await connect();
    const queryResults = new ResponseDTO<ContactDetail[]>(0);
    try {
        const [rows,_] = await db_connection.execute(
            `select * from contact_detail`
        )
        queryResults.success = 1;
        queryResults.data = rows as Array<ContactDetail>
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = 'Something went wrong with the query'
    }
    db_connection.end();
    return queryResults;
}

export const GetContactById = async (id : string)
: Promise<ResponseDTO<ContactDetail>> => {
    const db_connection : Connection = await connect();
    const queryResults = new ResponseDTO<ContactDetail>(0);
    try {
        const [rows,_] = await db_connection.execute(
            `select * from contact_detail
            where addressId = ?`,
            [id]
        )
        queryResults.success = 1;
        if((rows as Array<ContactDetail>).length !== 0) {
            queryResults.data = (rows as Array<ContactDetail>)[0];
        } else {
            queryResults.success = 0;
            queryResults.message = 'Not found';
        }
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = 'Something went wrong with the query'
    }
    db_connection.end();
    return queryResults;
}

export const DeleteContact = async (id : string)
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    const queryResults = new ResponseDTO<null>(0);
    try {
        const [rows,_] = await db_connection.execute(
            `delete from contact_detail
            where addressId = ?`,
            [id]
        )
        queryResults.success = 1;
        queryResults.message = 'Deleted contact successfully';
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = 'Something went wrong with the query'
    }
    db_connection.end();
    return queryResults;
}

export const GetUserContactsByEmail = async (email : string)
: Promise<ResponseDTO<ContactDetail[]>> => {
    const db_connection : Connection = await connect();
    const queryResults = new ResponseDTO<ContactDetail[]>(0);
    try {
        const [rows,_] = await db_connection.execute(
            `select * from contact_detail
            where userId = ?`,
            [email]
        )
        queryResults.success = 1;
        queryResults.data = rows as Array<ContactDetail>
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = 'Something went wrong with the query'
    }
    db_connection.end();
    return queryResults;
}

export const AddContact = async (newContact : ContactDetail)
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    const queryResults = new ResponseDTO<null>(0);
    try {
        const [rows,_] = await db_connection.execute(
            `insert into contact_detail
            (userId, street1, street2, city, state, country, zipcode, phone, isDefault)
            values
            (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [newContact.userId, 
            newContact.street1,
            newContact.street2 ? newContact.street2 : null,
            newContact.city,
            newContact.state,
            newContact.country,
            newContact.zipcode,
            newContact.phone,
            newContact.isDefault ? 1 : 0
            ]
        )
        queryResults.success = 1;
        queryResults.message = 'Added contact details successfully'
    } catch (error) {
        console.log(error);
        queryResults.success = 0;
        queryResults.message = 'Something went wrong with the query'
    }
    db_connection.end();
    return queryResults;
}

export const UpdateContact = async (contactId : string ,updatedContact : ContactDetail) 
: Promise<ResponseDTO<null>> => {
    const db_connection : Connection = await connect();
    let queryResults = new ResponseDTO<null>(0);
    let updatedValues = Object.values(updatedContact);
    updatedValues.push(contactId);
    try {
        await db_connection.execute(
            `UPDATE contact_detail SET ${Object.keys(updatedContact).map((key,i) => `${key} = ?`).join(',')}
            WHERE addressId = ?`,
            updatedValues
        )
        queryResults.success = 1;
        queryResults.message = `Updated contact successfully`;
    } catch (err) {
        console.log(err);
        queryResults.success = 0;
        queryResults.message = "Something went wrong with the query"
    }
    return queryResults;
}
