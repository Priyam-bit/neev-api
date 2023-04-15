"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.updateUser = exports.createUser = exports.deleteUser = exports.getUserById = exports.getUsers = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const ResponseDTO_1 = require("../../Models/ResponseDTO");
const user_service_1 = require("./user.service");
const getUsers = async (req, res) => {
    const response = await (0, user_service_1.GetUsers)();
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const userId = req.params.id;
    const response = await (0, user_service_1.GetUserById)(userId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getUserById = getUserById;
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const response = await (0, user_service_1.DeleteUser)(userId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.deleteUser = deleteUser;
const createUser = async (req, res) => {
    const body = req.body;
    let response = new ResponseDTO_1.ResponseDTO(0);
    if (!body.email || !body.password || !body.firstName || !body.userType) {
        response.message = 'Invalid user';
        return res.status(400).json(response);
    }
    //encrypt the password before saving in db
    const salt = (0, bcrypt_1.genSaltSync)(10);
    body.password = (0, bcrypt_1.hashSync)(body.password, salt);
    response = await (0, user_service_1.CreateUser)(body);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const body = req.body;
    let response = new ResponseDTO_1.ResponseDTO(0);
    if (body.password) {
        //encrypt the password before saving in db
        const salt = (0, bcrypt_1.genSaltSync)(10);
        body.password = (0, bcrypt_1.hashSync)(body.password, salt);
    }
    response = await (0, user_service_1.UpdateUser)(userId, body);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.updateUser = updateUser;
const Login = async (req, res) => {
    const body = req.body;
    const response = new ResponseDTO_1.ResponseDTO(0);
    if (!body.email || !body.password) {
        response.message = 'Something went wrong';
        return res.status(500).json(response);
    }
    const userResponse = await (0, user_service_1.GetUserByEmail)(body.email);
    if (userResponse.success === 0) {
        response.message = 'Something went wrong';
        return res.status(500).json(response);
    }
    const passwordMatch = (0, bcrypt_1.compareSync)(body.password, userResponse.data?.password);
    if (passwordMatch) {
        //we're going to use the results object to create the jwt (the data that is being stored in 
        //jwt is results)
        //so we're going to set the password as undefined because we don't want to store that in jwt
        //secretKey can be anything we want
        //check out various options for signing (3rd arg)
        const user = userResponse.data;
        if (user)
            user.password = undefined;
        const jwt = (0, jsonwebtoken_1.sign)({ result: user }, "auheowoiksjzn23d", {
            expiresIn: "12h"
        });
        response.success = 1;
        response.message = 'Logged in successfully';
        response.data = jwt;
        return res.status(200).json(response);
    }
    else {
        response.success = 0;
        response.message = 'Something went wrong';
        return res.status(500).json(response);
    }
};
exports.Login = Login;
