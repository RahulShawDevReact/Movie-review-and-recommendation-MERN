const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinaryConfig = require("../config/cloudinaryConfig");
const authMiddlewares = require("../middlewares/authMiddlewares");

//Multer COnfiguration
//For file upload/ From computer to server
//diskStorage-File upload
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

//multer filter
router.post(
    "/upload-image",
    authMiddlewares,
    multer({ storage }).single("image"),
    async (req, res) => {
        try {
            //Getting url from cloudinary  and sending as response url
            const response = await cloudinaryConfig.uploader.upload(req.file.path, {
                folder: "movie-recommendation",
            });
            const imageUrl = response.secure_url;
            res
                .status(200)
                .json({ message: "Image Uploaded", data: imageUrl, success: true });
        } catch (error) {
            res.status(500).json({ message: error.message, success: false });
        }
    }
);

module.exports = router;
