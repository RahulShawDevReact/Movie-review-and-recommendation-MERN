const express = require("express");
const router = express.Router();
const multer=require('multer')
const cloudinaryConfig =require("../config/cloudinaryConfig");
const authMiddlewares = require("../middlewares/authMiddlewares");

//Multer COnfiguration
const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname)
    }
})

//multer filter
router.post('/upload-image',authMiddlewares,multer({storage}).single('image'),async(req,res)=>{
    console.log("req-image",req.file)
    try {
        const response= await cloudinaryConfig.uploader.upload(req.file.path,{
            folder:"movie-recommendation"
        })
        const imageUrl=response.secure_url;
        res.status(200).json({message:"Image Uploaded",data:imageUrl,success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }

})

module.exports=router;