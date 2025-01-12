import Product from "../models/product.js";

export function addProduct(req,res){

    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }

    if(req.user.role != "admin"){
        res.status.json({
            message : "You are not authorization to perform this action"
        })
        return
    }

   const data = req.body;
   const newProduct =  new Product(data);

   newProduct.save().then(()=>{
    res.json({
        message : "Product saved successfully"
    }).catch((error)=>{
        res.status(500).json({
            error : "Product save failed"
        })
    })
   })
}