import {  Router } from "express";
import  { addProduct, deleteProduct, deleteProductVariant, getProductById, getProducts, getProductVariant, updateProduct, updateProductVariant }  from './product.controller';

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/:productId/:productVariantId", getProductVariant);
router.post("/", addProduct);
router.patch("/:productId/:productVariantId", updateProductVariant);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
router.delete("/:productId/:productVariantId", deleteProductVariant);

export default router;