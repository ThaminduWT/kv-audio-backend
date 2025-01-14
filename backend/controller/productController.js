import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export async function addProduct(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "Please login and try again"
        })
        return
    }

    if (req.user.role != "admin") {
        res.status.json({
            message: "You are not authorization to perform this action"
        })
        return
    }

    const data = req.body;
    const newProduct = new Product(data);
    try {
        await newProduct.save();
        res.json({ message: "Product added successfully" })
    } catch (e) {
        res.status(500).json({ error: "Product added failed" })
    }

}

export async function getProduct(req, res) {

    try {
        if (req.user != null) {

            if (isItAdmin(req)) {
                const result = await Product.find();
                res.json(result)
            }
            else {
                const result = await Product.find({ availability: true });
                res.json(result)
            }

        }
        else {
            res.status(401).json({
                message: "Please login and try again"
            })
        }


    } catch (erroe) {
        res.status(500).json({ message: "Failed to get product" })
    }
}

export async function updateProduct(req, res) {
    try {
        if (isItAdmin(req)) {
            const key = req.params.key;

            const data = req.body;

            await Product.updateOne({ key: key }, data);

            res.json({ message: "Product update successfully" })
        } else {
            res.status(403).json({ message: "You are not authorized to perform this action" })
        }

    } catch (erroe) {
        res.status(500).json({ message: "Failed to update product" });
    }
}

export async function deleteProduct(req, res) {
    try {
        if (isItAdmin(req)) {
            
            const key = req.params.key;
            const result = await Product.deleteOne({ key: key });

            if (result.deletedCount === 0) {

                res.json({ message: "Product not found" })
            } 
            else {

                res.json({ message: "Product delete successfully" })
            }

        }
        else {
            res.status(403).json({ message: "You are not authorized to perform this action" })
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
}
