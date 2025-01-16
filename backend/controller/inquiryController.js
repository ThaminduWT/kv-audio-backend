
import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function addInquiry(req, res) {
    try {
        if (isItCustomer(req)) {
            confirm.log(req.body)
            const data = req.body
            data.email = req.user.email
            data.phone = req.user.phone

            let id = 0;

            const inquires = await Inquiry.find().sort({ id: -1 }).limit(1);

            if (inquires.length === 0) {
                id = 1;

            } else {
                id = inquires[0].id + 1;
            }

            data.id = id;

            const newInquiry = new Inquiry(data);

            const response1 = await newInquiry.save();
            res.json({ message: "Inquiry added successfully", id: response1.id })



        } else {
            res.json({
                message: "You are not authorization to perform this action"
            })
            return;
        }

    } catch (erroe) {
        console.log(erroe)
        res.status(500).json({ message: "Failed to added inquiry" });
    }
}

export async function getInquiries(req, res) {
    try {
        if (isItCustomer(req)) {
            const inquires = await Inquiry.find({ email: req.user.email });
            res.json(inquires);
            return;
        }
        else if (isItAdmin(req)) {
            const inquires = await Inquiry.find();
            res.json(inquires);
            return;
        } else {
            res.json({
                message: "You are not authorization to perform this action"
            })
            return;
        }
    } catch (error) {

        res.status(500).json({ message: "Failed to get inquiry" });
    }
}

export async function deleteInquiry(req, res) {

    try {
        if (isItAdmin(req)) {
            const id = req.params.id
            const inquiry = await Inquiry.findOne({ id: id });
            if (inquiry == null) {
                res.status(404).json({ message: "Inquiry not found" });
                return;
            } else {

                await Inquiry.deleteOne({ id: id });
                res.json({ message: "Inquiry deleted successfully" });
                return;
            }
        }
        else if (isItCustomer(req)) {
            const id = req.params.id

            const inquiry = await Inquiry.findOne({ id: id });
            if (inquiry == null) {
                res.status(404).json({ message: "Inquiry not found" });
                return;
            } else {
                if (inquiry.email == req.user.email) {
                    await Inquiry.deleteOne({ id: id });
                    res.json({ message: "Inquiry deleted successfully" })
                } else {
                    res.status(403).json({
                        message: "You are not authorization to perform this action"
                    })
                    return;
                }
            }
        } else {
            res.status(403).json({
                message: "You are not authorization to perform this action"
            })
            return;
        }

    } catch (erroe) {
        res.status(500).json({ message: "Failed to get inquiry" });
    }
}

export async function updateInquiry(req, res) {

    try {

        if (isItAdmin(req)) {
            const id = req.params.id;
            const data = req.body;

            await Inquiry.updateOne({ id: id }, data)
            res.json({
                message: "Inquiry updated successfully"
            })
        } else if (isItCustomer(req)) {
            const id = req.params.id;
            const data = req.body;

            const inquiry = await Inquiry.findOne({ id: id });
            if (inquiry == null) {
                res.status(404).json({
                    message: "Inquiry not found"
                })
                return;
            } else {
                if (inquiry.email == req.user.email) {
                    await Inquiry.updateOne({ id: id }, { message: data.message })
                    res.json({
                        message: "Inquiry updated successfully"
                    })
                    return;
                } else {
                    res.status(403).json({
                        message: "You are not authorized to perform this action"
                    })
                    return
                }
            }
        } else {
            res.status(403).json({
                message: "You are not authorized to perform this action"
            })
        }

    } catch (e) {
        res.status(500).json({
            message: "Failed to update inquiry"
        })
    }
}