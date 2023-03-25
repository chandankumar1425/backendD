const express=require('express')
const cors = require('cors')
const {connection}=require("./db")
const {userRouter}=require("./route/user.route")
const {noteRouter}=require("./route/note.route")
require("dotenv").config()
const app=express()

app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/note",noteRouter)

//server
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connnected to the database");
    }catch(err){
        console.log("Cannot connect to the db")
        console.log(err)
    }
    console.log(`serever is runnning at port ${process.env.port}`)
})

