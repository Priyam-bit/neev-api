"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_service_1 = require("./product.service");
const router = (0, express_1.Router)();
router.get("/", product_service_1.getProducts);
router.get("/:id", product_service_1.getProductById);
exports.default = router;
