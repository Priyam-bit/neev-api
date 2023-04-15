"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductVariant = exports.deleteProduct = exports.updateProduct = exports.updateProductVariant = exports.addProduct = exports.getProductVariant = exports.getProductById = exports.getProducts = void 0;
const product_service_1 = require("./product.service");
const getProducts = async (req, res) => {
    const response = await (0, product_service_1.GetProducts)();
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    // get all the product variants of the product
    const productId = req.params.id;
    const response = await (0, product_service_1.GetProductsById)(productId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getProductById = getProductById;
const getProductVariant = async (req, res) => {
    const { productId, productVariantId } = req.params;
    const response = await (0, product_service_1.GetProductVariantById)(productId, productVariantId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.getProductVariant = getProductVariant;
const addProduct = async (req, res) => {
    const product = req.body;
    const response = await (0, product_service_1.AddNewProduct)(product);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.addProduct = addProduct;
const updateProductVariant = async (req, res) => {
    const { productId, productVariantId } = req.params;
    const variant = req.body;
    const response = await (0, product_service_1.UpdateProductVariant)(variant, productId, productVariantId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.updateProductVariant = updateProductVariant;
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const product = req.body;
    const response = await (0, product_service_1.UpdateProduct)(product, productId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    const response = await (0, product_service_1.DeleteProduct)(productId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.deleteProduct = deleteProduct;
const deleteProductVariant = async (req, res) => {
    const { productId, productVariantId } = req.params;
    const response = await (0, product_service_1.DeleteProductVariant)(productId, productVariantId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
};
exports.deleteProductVariant = deleteProductVariant;
