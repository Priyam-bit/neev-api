import express, { Express } from "express";
import productRouter from "./api/products/product.router";
import dotenv from 'dotenv';
import categoryRouter from "./api/category/category.router";
import userRouter from "./api/users/user.router";
import contactDetailRouter from './api/contactDetail/contactDetail.router'

const app : Express = express();

dotenv.config();

app.use(express.json());

app.get('/', (req,res) => {
    return res.send('Ok');
})

app.use("/api/products", productRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/users", userRouter)
app.use("/api/userContacts", contactDetailRouter)

app.listen(3000, () => {
    console.log("server running on port 3000");
})