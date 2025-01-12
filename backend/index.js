import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRoute from "./routes/productRouter.js";
import jwt from "jsonwebtoken";




const app = express()

app.use(bodyParser.json())

app.use((req,res,next)=>{

    let token = req.header("Authorization");

    if(token != null){
       token = token.replace("Bearer ","")  
       jwt.verify(token,"kv-secret-89!",(err,decoded)=>{
         if(!err){
            req.user = decoded
            

         }

       })
    }
    next()
})

let mongoUrl = "mongodb+srv://admin:123@cluster0.pmjpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)

const connection = mongoose.connection

connection.once("open",()=>{
    console.log("MongoDB connectio established successfully")
})

app.use("/api/users",userRouter)
app.use("/api/products",productRoute)

app.listen(3000,()=>{
   console.log("Sever is running port 3000")
})