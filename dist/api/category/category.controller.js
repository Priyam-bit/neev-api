"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const category_service_1 = require("./category.service");
const getCategories = async (req, res) => {
    const response = await (0, category_service_1.GetCategories)();
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getCategories = getCategories;
const getCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    const response = await (0, category_service_1.GetCategoryById)(categoryId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    const newCategory = req.body;
    const response = await (0, category_service_1.CreateCategory)(newCategory);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const updatedCategory = req.body;
    const response = await (0, category_service_1.UpdateCategory)(categoryId, updatedCategory);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    const response = await (0, category_service_1.DeleteCategory)(categoryId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.deleteCategory = deleteCategory;
