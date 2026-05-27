import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        trim:true,
        required:true,
        unique : true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        enum:["General User","Admin"],
        required:true
    }
},{
    timestamps : true
});

const User = mongoose.model("User",userSchema);
export default User;