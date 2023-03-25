const express=require('express')
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")
const { authentication } = require("../middleware/authentication.middleware")























//////////////////////------------------------Authentication-------------------------/////////////-
noteRouter.use(authentication)
noteRouter.get("/",async(req,res)=>{
//logic
try{
    const data =await NoteModel.find();
    res.send(data);

}catch(err){
    res.send(err);
}
})

// noteRouter.use(authentication)
noteRouter.post("/add",async(req,res)=>{
    //logic
    try {
        const note= new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new Note Has Been Added"})
    } catch (err){
        res.status(400).send({"msg":err.msg})
        // console.log(err)  
    }
})
//update
// noteRouter.use(authentication)
noteRouter.patch("/updateusers/:userID",async(req,res)=>{
    const id=req.params
    const payload=req.body
    try{
        await NoteModel.findByIdAndUpdate({_id:id},"payload")
        res.status(200).send({"msg":"user has been updated check it"})
    }
    catch(err){
        res.status(400).send({"msg":err.message})

    }
})
///delete
// noteRouter.use(authentication)
noteRouter.delete("/deleteusers/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        await NoteModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"user has been deleted"})

    }catch(err){
        res.status(400).send({"msg":err.message})

    }
})


module.exports={noteRouter}