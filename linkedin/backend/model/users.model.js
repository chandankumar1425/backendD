const mongoose=require("mongoose")

const usersSchema= mongoose.Schema({

    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String

},
{ versionKey: false })

const UsersModel=mongoose.model("linkedinuser", usersSchema)
module.exports={
    UsersModel
}