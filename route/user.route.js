const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const { authentication } = require("../middleware/authentication.middleware")
const bcrypt=require('bcrypt');

//alluser
userRouter.get("/alluser",async(req,res)=>{
    try{
        const data =await UserModel.find();
        res.send(data);

    }catch(err){
        res.send(err);
    }
})

//registration
userRouter.post("/register",async(req,res)=>{
    const {email,pass,location,age}=req.body
    try{
        bcrypt.hash(pass,2,async(err,hash)=> {
            const user=new UserModel({email,pass:hash,location,age})
            await user.save()
            res.status(200).send({"msg":"register has been done"})
            // Store hash in your password DB.
        });
    // const user=new UserModel(req.body)
    // await user.save()
    // res.status(200).send({"msg":"register has been done"})
   }catch(err){
    res.status(400).send({"msg":err.message})
   }
})

//login
userRouter.post("/login",async(req,res)=>{ 
    const {email,pass}=req.body

    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err, result)=>{
        if(result){
            res.status(200).send({"msg":"Login Sucessfully","token":jwt.sign({"userId":user._id}, 'chandan')})
            }else{
                res.status(400).send({"msg":"Login Failed"}) 
            }
        });
    }
        
    //     res.status(200).send({"msg":"Login Sucessfully","token":jwt.sign({ name: 'superman' }, 'chandan')
    // }):
    //         res.status(400).send({"msg":"Login Failed"})
       }catch(err){
        res.status(400).send({"msg":"LogIn Failed"})
       }
})

userRouter.get("/details",authentication,async(req,res)=>{
    try{
        res.send(await UserModel.find())
    }catch(err){
        res.send(err);
    }

})

userRouter.get("/movie",authentication,async(req,res)=>{
    try{
       res.send('Movies') 
    }catch(err){
        res.send(err);
    }
})




module.exports={userRouter}

