const Movie = require("../models/movieModels");
const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/authMiddlewares");

//Add movie

router.post("/add-movie", authMiddlewares, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    console.log("req.body", req.body)
    await Movie.create(req.body);
    res.status(200).json({ message: "Movie added sucessfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//get all movie
router.get("/", authMiddlewares, async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate("cast")
      .populate("hero")
      .populate("heroine")
      .populate("director")
      .populate("createdBy");
    res.status(200).json({ movies, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//get movies by id

router.get("/:id", authMiddlewares, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate("cast")
      .populate("hero")
      .populate("heroine")
      .populate("director")
      .populate("createdBy");
    res.status(200).json({ data: movie, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//Update movie
router.put("/:id", authMiddlewares, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      // { ...req.body, cast: "" },
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "Movie Updated sucessfully",
        data: updatedMovie,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//Delete movie
router.delete("/:id", authMiddlewares, async (req, res) => {
  try {
    const updateMovie = await Movie.findByIdAndDelete(req.params.id, { new: true });
    res
      .status(200)
      .json({ message: "Movie Deleted sucessfully", success: true, data: updateMovie });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
