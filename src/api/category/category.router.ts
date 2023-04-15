import {  Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "./category.controller";

const router = Router();

router.get("/", getCategories);
router.get("/:categoryId", getCategoryById);
router.post("/", createCategory);
router.patch("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;