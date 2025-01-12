import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,

    },

    role : {
        type : String,
        required : true,
        default : "customer"
    },

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : true
    },

    address : {
        type : String,
        requirde : true
    },

    phone : {
        type : String,
        required : true
    },

    profilePicture : {
        type : String,
        required : true,
        default : "data:image/jpeg;base64,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"
    }

});

const User = mongoose.model("user",userSchema);

export default User;