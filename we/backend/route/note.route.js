const express=require('express')
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")
const { authentication } = require("../middleware/authentication.middleware")
const jwt=require("jsonwebtoken")



//////////////////////------------------------Authentication-------------------------/////////////
// noteRouter.get("/",async (req,res)=>{
//         try{
//         const note=await NoteModel.find()
//         res.status(200).send(note)

//         }catch(err){
//             res.status(400).send({"msg":"error"})

//             console.log(err);
//         }
// })


noteRouter.get("/",async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,'chandan')
  
        try{
            if(decoded){
                const notes=await NoteModel.find({"userId":decoded.userId})
                res.status(200).send(notes)
            }
       

        }catch(err){
            res.status(400).send({"msg":"error"})

            
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
noteRouter.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const payload=req.body
    try{
        await NoteModel.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({"msg":"user has been updated check it"})
    }
    catch(err){
        res.status(400).send({"msg":err.message})

    }
})
///delete
// noteRouter.use(authentication)
noteRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        await NoteModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"user has been deleted"})

    }catch(err){
        res.status(400).send({"msg":err.message})

    }
})


module.exports={noteRouter}