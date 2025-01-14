import express from "express";
import { addInquiry } from "../controller/inquiryController.js";

const inquryRouter = express.Router();

inquryRouter.post("/add-inquiry",addInquiry);

export default inquryRouter