const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    age:Number,
    location:String
})
const UserModel=mongoose.connect(user,userSchema)

module.exports={UserModel}