import express from "express";
import { addProduct } from "../controller/productController.js";


const productRoute = express.Router();

productRoute.post("/add-product",addProduct);

export default productRoute;