import express from "express";
import { addInquiry, deleteInquiry, getInquiries } from "../controller/inquiryController.js";

const inquryRouter = express.Router();

inquryRouter.post("/add-inquiry",addInquiry);
inquryRouter.get("/get-inquiry",getInquiries);
inquryRouter.delete("/delete-inquiry/:id",deleteInquiry);

export default inquryRouter