import express from "express";
import { registerUser,loginUser } from "../controller/userController.js";

const userRouter = express.Router()

userRouter.post("/resgister",registerUser)
userRouter.post("/loginUser",loginUser)

export default userRouter

