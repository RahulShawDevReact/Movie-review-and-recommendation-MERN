const Review = require('../models/reviewModels');
const express = require('express');
const router = express.Router();
const Movies = require('../models/movieModels');
const authMiddlewares = require('../middlewares/authMiddlewares');
const mongoose = require('mongoose');
//Add Review
router.post('/add', authMiddlewares, async (req, res) => {
  try {
    req.body.user = req.userId;
    const review = new Review(req.body);
    await review.save();

    //Calculate average rating and update in movie
    const movieObjectId = new mongoose.Types.ObjectId(req.body.movie);
    const averageRating = await Review.aggregate([
      //Condition for matching
      {
        $match: { movie: movieObjectId },
      },
      {
        $group: {
          _id: '$movie',
          averageRating: { $avg: '$rating' },
        },
      },
    ]);
    const avgRatingValue = averageRating[0]?.averageRating || 0;
    await Movies.findByIdAndUpdate(req.body.movie, { rating: avgRatingValue });
    res.status(200).json({
      message: 'Review added sucessfully',
      success: true,
      // data: updateMovie,
    });
  } catch (error) {
    console.log('eror', error?.message);
    res.status(500).json({ message: error?.message, success: false });
  }
});

//Get all reviews by movie id
router.get('/', async (req, res) => {
  try {
    //const reviesws = await Review.find({movie: req.params.id });
    // const { movie } = req.query;
    const reviews = await Review.find(req.params)
      .populate('user')
      .populate('movie');
    res.status(200).json({ data: reviews, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});
module.exports = router;
