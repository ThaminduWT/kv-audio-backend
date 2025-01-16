import express from "express";
import { addInquiry, deleteInquiry, getInquiries, updateInquiry } from "../controller/inquiryController.js";

const inquryRouter = express.Router();

inquryRouter.post("/add-inquiry",addInquiry);
inquryRouter.get("/get-inquiry",getInquiries);
inquryRouter.delete("/delete-inquiry/:id",deleteInquiry);
inquryRouter.put("/update-inquiry/:id",updateInquiry);

export default inquryRouter