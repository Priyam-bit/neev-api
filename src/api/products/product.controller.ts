import { Request, RequestHandler, Response } from "express"
import { ProductVariant } from "../../Models/ProductVariant";
import { ProductDTO } from "../../Models/ProductDTO";
import { ResponseDTO } from "../../Models/ResponseDTO";
import { AddNewProduct, DeleteProduct, DeleteProductVariant, GetProducts, GetProductsById, GetProductVariantById, UpdateProduct, UpdateProductVariant } from "./product.service";
import { Product } from "../../Models/Product";

export const getProducts : RequestHandler<{}, ResponseDTO<ProductDTO[]>> = 
async (req : Request,res : Response<ResponseDTO<ProductDTO[]>>) => {
        const response : ResponseDTO<ProductDTO[]> = await GetProducts();
        if (response.success === 0) {
            return res.status(500).json(response);
        }
        return res.status(200).json(response);
}

export const getProductById : RequestHandler<{}, ResponseDTO<ProductDTO[]>> = 
async (req : Request,res : Response<ResponseDTO<ProductDTO[]>>) => {
    // get all the product variants of the product
        const productId = req.params.id ;
        const response : ResponseDTO<ProductDTO[]> = await GetProductsById(productId);
        if (response.success === 0) {
            return res.status(500).json(response);
        }
        return res.status(200).json(response);
}

export const getProductVariant : RequestHandler<{}, ResponseDTO<ProductDTO>> = 
async (req : Request,res : Response<ResponseDTO<ProductDTO>>) => {
        const { productId, productVariantId } = req.params;
        const response : ResponseDTO<ProductDTO> = await GetProductVariantById(productId, productVariantId);
        if (response.success === 0) {
            return res.status(500).json(response);
        }
        return res.status(200).json(response);
}

export const addProduct : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request, res : Response<ResponseDTO<null>>) => {
    const product : ProductDTO = req.body;
    const response : ResponseDTO<null> = await AddNewProduct(product);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const updateProductVariant : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request, res : Response<ResponseDTO<null>>) => {
    const { productId, productVariantId } = req.params;
    const variant : ProductVariant = req.body;
    const response : ResponseDTO<null> = await UpdateProductVariant(variant, productId, productVariantId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const updateProduct : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request, res : Response<ResponseDTO<null>>) => {
    const { productId } = req.params;
    const product : Product = req.body;
    const response : ResponseDTO<null> = await UpdateProduct(product, productId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const deleteProduct : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request, res : Response<ResponseDTO<null>>) => {
    const { productId } = req.params;
    const response : ResponseDTO<null> = await DeleteProduct(productId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}

export const deleteProductVariant : RequestHandler<{}, ResponseDTO<null>> = 
async (req : Request, res : Response<ResponseDTO<null>>) => {
    const { productId, productVariantId } = req.params;
    const response : ResponseDTO<null> = await DeleteProductVariant(productId, productVariantId);
    if (response.success === 0) {
        return res.status(500).json(response);
    }
    return res.status(200).json(response);
}