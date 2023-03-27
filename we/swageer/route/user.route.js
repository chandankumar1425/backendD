const express=require("express")
const { UserModel } = require("../model/user.model")
const userRouter=express.Router()


userRouter.post("/add",async(req,res)=>{
    const payload=req.body
    const user= new UserModel(payload)
    await user.save()
    res.status(200).send({"msg":"New User Has Been Added"})
    
})