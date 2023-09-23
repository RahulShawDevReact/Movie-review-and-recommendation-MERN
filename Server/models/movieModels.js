const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  hero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artists",
    required: true,
  },
  heroine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artists",
    required: true,
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artists",
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  language:{
    type:String,
    required:true
  },
  posters:{
    type:[],
    required:false
  },
  trailer:{
    type:String,
    required:true
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  }
},{timestamps:true});
module.exports=mongoose.model("movies",movieSchema)
