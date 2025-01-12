import mongoose from "mongoose";

const reviweSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true
    },

    rating : {
        type : String,
        required : true
    },

    comment : {
        type : String,
        required : true
    },

    date : {
        type : Date,
        required : true,
        default : Date.now()
    }
})

const Review = new mongoose.model("review",reviweSchema);

export default Review;