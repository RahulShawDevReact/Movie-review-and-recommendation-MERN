const Artist = require("../models/artistModels");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authMiddlewares = require("../middlewares/authMiddlewares");
//add artist
// router.get('/test-auth', authMiddlewares, (req, res) => {
//   res.json({ message: 'Authenticated', userId: req.userId });
// });
router.post("/add1", async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Artist.create(req.body);
    res
      .status(200)
      .json({ message: "Artist Added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//get all artist
router.get("/", authMiddlewares, async (req, res) => {
  try {
    const artist = await Artist.find().sort({ createdAt: -1 });
    res.json({ data: artist, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//get artist by id
router.get("/:id", authMiddlewares, async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    res.json({ data: artist, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//Update artist by id PUT
//Method:PUT
router.put("/:id", authMiddlewares, async (req, res) => {
  try {
    const newId = req.params.id;
    const validId = newId.split(":").join("");
    const updatedArtist = await Artist.findByIdAndUpdate(validId, req.body);
    res.json({ message: "Artist updated successfully", success: true, data: updatedArtist });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//Delete artist by id
//Method:DELETE
router.delete("/:id", authMiddlewares, async (req, res) => {
  try {
    const newId = req.params.id;
    const validId = newId.split(":").join("");
    const updatedArtist = await Artist.findByIdAndDelete(validId, req.body);
    res.json({ message: "Artist Deleted successfully", success: true, data: updatedArtist });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
