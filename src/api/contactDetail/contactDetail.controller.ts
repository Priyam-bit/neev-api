import { RequestHandler } from "express";
import { Request, Response } from "express";
import { ContactDetail } from "../../Models/ContactDetail";
import { ResponseDTO } from "../../Models/ResponseDTO";
import { AddContact, DeleteContact, GetContactById, GetContacts, GetUserContactsByEmail, UpdateContact } from "./contactDetail.service";

export const getContacts : RequestHandler<{}, ResponseDTO<ContactDetail[]>> = 
async (req : Request,res : Response<ResponseDTO<ContactDetail[]>>) => {
    const response : ResponseDTO<ContactDetail[]> = await GetContacts();
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const getContactById : RequestHandler<{}, ResponseDTO<ContactDetail>> = 
async (req : Request,res : Response<ResponseDTO<ContactDetail>>) => {
    const contactId = req.params.id;
    const response : ResponseDTO<ContactDetail> = await GetContactById(contactId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const deleteContact : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request,res : Response<ResponseDTO<null>>) => {
    const contactId = req.params.id;
    const response : ResponseDTO<null> = await DeleteContact(contactId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const getUserContactsByEmail : RequestHandler<{}, ResponseDTO<ContactDetail[]>> = 
async (req : Request,res : Response<ResponseDTO<ContactDetail[]>>) => {
    const email = req.body.email;
    if(!email) {
        return res.status(500).json(
            new ResponseDTO<ContactDetail[]>(0, 'Please provide a valid email id')
        );
    }
    const response : ResponseDTO<ContactDetail[]> = await GetUserContactsByEmail(email);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const addContact : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request,res : Response<ResponseDTO<null>>) => {
    //check if current user is the same as the userId of newContact
    const newContact = req.body;
    const response : ResponseDTO<null> = await AddContact(newContact);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const updateContact : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request,res : Response<ResponseDTO<null>>) => {
    // only the address owner / admin can update address
    const contactId = req.params.id;
    const updatedContact = req.body;
    const response : ResponseDTO<null> = await UpdateContact(contactId, updatedContact);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}