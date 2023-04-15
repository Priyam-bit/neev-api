import { RequestHandler } from "express";
import { Category } from "../../Models/Category";
import { ResponseDTO } from "../../Models/ResponseDTO";
import { Request, Response } from "express";
import { CreateCategory, DeleteCategory, GetCategories, GetCategoryById, UpdateCategory } from "./category.service";


export const getCategories : RequestHandler<{}, ResponseDTO<Category[]>> = 
async (req : Request,res : Response<ResponseDTO<Category[]>>) => {
    const response : ResponseDTO<Category[]> = await GetCategories();
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const getCategoryById : RequestHandler<{}, ResponseDTO<Category>> = 
async (req : Request,res : Response<ResponseDTO<Category>>) => {
    const {categoryId} = req.params;
    const response : ResponseDTO<Category> = await GetCategoryById(categoryId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const createCategory : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request,res : Response<ResponseDTO<null>>) => {
    const newCategory : Category = req.body;
    const response : ResponseDTO<null> = await CreateCategory(newCategory);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}


export const updateCategory : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request,res : Response<ResponseDTO<null>>) => {
    const {categoryId} = req.params;
    const updatedCategory : Category = req.body;
    const response : ResponseDTO<null> = await UpdateCategory(categoryId, updatedCategory);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const deleteCategory : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request,res : Response<ResponseDTO<null>>) => {
    const {categoryId} = req.params;
    const response : ResponseDTO<null> = await DeleteCategory(categoryId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

