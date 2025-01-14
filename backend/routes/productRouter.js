import express from "express";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controller/productController.js";


const productRoute = express.Router();

productRoute.post("/add-product",addProduct);
productRoute.get("/get-product",getProduct);
productRoute.put("/update-product/:key",updateProduct)
productRoute.delete("/delete-product/:key",deleteProduct)

export default productRoute;