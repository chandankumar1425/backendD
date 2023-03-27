const express =require("express")
const mongoose=require("mongoose")
const {UserModel}=require("./model/user.model")

const app=express()
 
app.listen(9999,async()=>{
    try{
     await mongoose.connect("mongodb://127.0.0.1:27017/swageer")
     console.log("Connected to the Database")
    }catch(err){
       console.log(err)
    }
})