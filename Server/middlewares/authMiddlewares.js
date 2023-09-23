const jwt=require('jsonwebtoken')
//token validation
module.exports=(req,res,next)=>{
try {
    // console.log("req---",req)
    const token=req.headers.authorization.split(" ")[1]
    //encryted in userRoutes.js using sign() 
    const dcryptedToken=jwt.verify(token,process.env.secret_jwt)
    console.log("decrypt",dcryptedToken)
    req.userId=dcryptedToken.userId
    console.log("req.userId",req.userId)
    next();//callback function where we are calling the middlewares
} catch (error) {
    console.log("middlewares error=")
    res.status(401).json({message:error.message,success:false})
}


}