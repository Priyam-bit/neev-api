"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_router_1 = __importDefault(require("./api/products/product.router"));
const dotenv_1 = __importDefault(require("dotenv"));
const category_router_1 = __importDefault(require("./api/category/category.router"));
const user_router_1 = __importDefault(require("./api/users/user.router"));
const contactDetail_router_1 = __importDefault(require("./api/contactDetail/contactDetail.router"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.send('Ok');
});
app.use("/api/products", product_router_1.default);
app.use("/api/categories", category_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/userContacts", contactDetail_router_1.default);
app.listen(3000, () => {
    console.log("server running on port 3000");
});
