const jwt = require('jsonwebtoken');


const authentication = (req,res,next) => {
    const token = req.headers.authorization//.split("")[1]
        if(token){
            jwt.verify(token,"chandan",(err,decode)=>{
                if(decode){
                    req.body.userId=decode.userId
                    // console.log(decode)
                    next();
                }else{
                    res.send('Error');
                }
            })
        }else{
            res.send('Login Required!')
        }
}
module.exports = {authentication};