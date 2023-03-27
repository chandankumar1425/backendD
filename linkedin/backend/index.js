const express=require("express")
const cors=require("cors")
///connection
const {connection}=require("./db")

// Routers
const {usersRouter}=require("./router/users.router")
const {postsRouter}=require("./router/posts.router")

// authantication
const {auth}=require("./middleware/auth.middleware")


const app=express()

app.use(express.json())

app.use(cors())

app.use("/users",usersRouter)

app.use(auth)

app.use("/posts",auth,postsRouter)




app.listen(5511,async(res,err)=>{
    try{
        await connection
        
        console.log("connected to db 5511");
    }catch(err){
        console.log(err);
    }
})