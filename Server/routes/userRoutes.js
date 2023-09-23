const User = require('../models/userModels.js')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const authMiddlewares = require('../middlewares/authMiddlewares.js')


//Register Endpoint
router.post('/register', async (req, res) => {
    try {
        console.log("called api==========", req.body)
        // console.log("users",User)
        const userExists = await User.findOne({ email: req.body.email });
        console.log("userExists", userExists)
        if (userExists) throw new Error("User with this email id already exists");

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await User.create(req.body);
        //we can also use save()

        res.status(200).json({ message: "User successfully registered", success: true })
    } catch (error) {
        console.log("catch=========", error.message)
        res.status(500).json({ message: error.message, success: false })
    }

})

router.post('/login', async (req, res) => {
    console.log("login api called")
    try {
        // check if user exists
        console.log("login api called11111111111111")
        const user = await User.findOne({ email: req.body.email });
        console.log("user---", user)
        if (!user) {
            throw new Error("User not exist ")
        }
        // req.body.password= await bcrypt.hash(req.body.password,10);
        //  check if user password is coreect
        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        console.log("iscoreect", isCorrectPassword)
        if (!isCorrectPassword) throw new Error("Invalid password");
        //encryt the data for security and followup in authMiddlewares.js
        const token = jwt.sign({ userId: user._id }, process.env.secret_jwt, { expiresIn: "1d" })
        console.log("token", token)
        res.status(200).json({ message: "User logged In Sucessfully", success: true, token: token })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }

})

//protected route get current user
router.get('/get-current-user', authMiddlewares, async (req, res) => {
    try {
        console.log(" GetCurrentUser callled=============",req.userId)
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json({ message: "User fetched Successfully", success: true, data: user })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})
module.exports = router;