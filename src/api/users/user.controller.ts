import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import { sign } from "jsonwebtoken";
import { ResponseDTO } from "../../Models/ResponseDTO";
import { UserDTO } from "../../Models/UserDTO";
import { CreateUser, DeleteUser, GetUserByEmail, GetUserById, GetUsers, UpdateUser } from "./user.service";

export const getUsers : RequestHandler<{}, ResponseDTO<UserDTO[]>> = 
async (req : Request, res : Response<ResponseDTO<UserDTO[]>>) => {
    const response = await GetUsers();
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const getUserById : RequestHandler<{}, ResponseDTO<UserDTO>> = 
async (req : Request, res : Response<ResponseDTO<UserDTO>>) => {
    const userId = req.params.id;
    const response = await GetUserById(userId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const deleteUser : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request, res : Response<ResponseDTO<null>>) => {
    const userId = req.params.id;
    const response = await DeleteUser(userId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const createUser : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request, res : Response<ResponseDTO<null>>) => {
    const body : UserDTO = req.body;
    let response = new ResponseDTO<null>(0);
    if(!body.email || !body.password || !body.firstName || !body.userType) {
        response.message = 'Invalid user'
        return res.status(400).json(response);
    }
    //encrypt the password before saving in db
    const salt = genSaltSync(10);
    body.password = hashSync(body.password as string, salt);
    response = await CreateUser(body);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const updateUser : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request, res : Response<ResponseDTO<null>>) => {
    const userId = req.params.id;
    const body : UserDTO = req.body;
    let response = new ResponseDTO<null>(0);
    if (body.password) {
        //encrypt the password before saving in db
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
    }
    response = await UpdateUser(userId, body);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const Login : RequestHandler<{}, ResponseDTO<string>> = 
async (req : Request, res : Response<ResponseDTO<string>>) => {
    const body = req.body;
    const response = new ResponseDTO<string>(0);
    if (!body.email || !body.password) {
        response.message = 'Something went wrong'
        return res.status(500).json(response);
    }
    const userResponse = await GetUserByEmail(body.email);
    if (userResponse.success === 0) {
        response.message = 'Something went wrong'
        return res.status(500).json(response);
    }
    const passwordMatch = compareSync(body.password, userResponse.data?.password as string);
    if (passwordMatch) {
        //we're going to use the results object to create the jwt (the data that is being stored in 
        //jwt is results)
        //so we're going to set the password as undefined because we don't want to store that in jwt
        //secretKey can be anything we want
        //check out various options for signing (3rd arg)
        const user = userResponse.data;
        if(user) 
            user.password = undefined;
        const jwt = sign({ result : user},"auheowoiksjzn23d", {
            expiresIn : "12h"
        });
        response.success = 1;
        response.message = 'Logged in successfully'
        response.data = jwt;
        return res.status(200).json(response);
    }
    else {
        response.success = 0;
        response.message = 'Something went wrong'
        return res.status(500).json(response)
    }
}
