import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    orignalUrl:{
        type:String,
        required:true,
        unique:true
    },
    genId:{
        type:String,
        required:true,
        unique:true
    },
    websiteName:{
        type:String,
        required:true,
        unique:true
    },
    clicks:[
        {
            timeStamp:{
                type:Date,
            },
            ip:String,
            userAgent:{
                type:String
            },
            city:{
                type:String
            },
            country:{
                type:String
            }
        }
    ]
    
})
const UserModel=mongoose.model("usermodel",userSchema);

export default UserModel;