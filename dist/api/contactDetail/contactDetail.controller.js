"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = exports.addContact = exports.getUserContactsByEmail = exports.deleteContact = exports.getContactById = exports.getContacts = void 0;
const ResponseDTO_1 = require("../../Models/ResponseDTO");
const contactDetail_service_1 = require("./contactDetail.service");
const getContacts = async (req, res) => {
    const response = await (0, contactDetail_service_1.GetContacts)();
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getContacts = getContacts;
const getContactById = async (req, res) => {
    const contactId = req.params.id;
    const response = await (0, contactDetail_service_1.GetContactById)(contactId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getContactById = getContactById;
const deleteContact = async (req, res) => {
    const contactId = req.params.id;
    const response = await (0, contactDetail_service_1.DeleteContact)(contactId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.deleteContact = deleteContact;
const getUserContactsByEmail = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(500).json(new ResponseDTO_1.ResponseDTO(0, 'Please provide a valid email id'));
    }
    const response = await (0, contactDetail_service_1.GetUserContactsByEmail)(email);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getUserContactsByEmail = getUserContactsByEmail;
const addContact = async (req, res) => {
    //check if current user is the same as the userId of newContact
    const newContact = req.body;
    const response = await (0, contactDetail_service_1.AddContact)(newContact);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.addContact = addContact;
const updateContact = async (req, res) => {
    // only the address owner / admin can update address
    const contactId = req.params.id;
    const updatedContact = req.body;
    const response = await (0, contactDetail_service_1.UpdateContact)(contactId, updatedContact);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.updateContact = updateContact;
