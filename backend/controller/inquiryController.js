import Inquiry from "../models/inquiry.js";
import { isItCustomer } from "./userController.js";

export async function addInquiry(req,res){
    try{
        if(isItCustomer){
            const data = req.body;
            data.email = req.user.email;
            data.phone = req.user.phone;

            let id = 0;

            const inquires = await Inquiry.find().sort({id:-1}).limit(1);

            if(inquires.length == 0){
                id = 1;

            }else{
                id = inquires[0] + 1;
            }

            data.id = id;

            const newInquiry = new Inquiry(data);

           await newInquiry.save();
           res.json({ message: "Inquiry added successfully" })
            

        }

    }catch(erroe){
       
        res.status(500).json({ message: "Failed to added inquiry" });
    }
}