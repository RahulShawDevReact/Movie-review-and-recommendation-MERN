const User = require("../models/userModels.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const authMiddlewares = require("../middlewares/authMiddlewares.js");

//Register Endpoint
router.post("/register", async (req, res) => {
    try {
        // Step: check if user email id already exits.
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) throw new Error("User with this email id already exists");
        // Step 2: Hash password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        //Step 3: Create new user
        await User.create(req.body);
        //we can also use save()
        res
            .status(200)
            .json({ message: "User successfully registered", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Login Endpoint
router.post("/login", async (req, res) => {
    try {
        // Step: 1 check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error("User not exist ");
        }
        // req.body.password= await bcrypt.hash(req.body.password,10);
        //  check if user password is coreect
        const isCorrectPassword = await bcrypt.compare(
            req.body.password, // plain password
            user.password // Encrtyted pssword
        );
        if (!isCorrectPassword) throw new Error("Invalid password");
        //encryt the data for security and followup in authMiddlewares.js
        //Create token using jwt.sign
        const token = jwt.sign({ userId: user._id }, process.env.secret_jwt, {
            expiresIn: "1d",
        });
        res.status(200).json({
            message: "User logged In Sucessfully",
            success: true,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//protected route get current user
//authMiddleware
router.get("/get-current-user", authMiddlewares, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json({
            message: "User fetched Successfully",
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
module.exports = router;
