const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    // profilePic: {
    //   type: String,
    //   required: false,
    // },
    // for multiple profilepic
    images: {
      type: [],
      required: false,
    },
    debutYear: {
      type: Number,
      required: true,
    },
    debutMovie: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    // createdBy:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'users',
    //     required:true
    // }
  },
  { timestamps: true }
);
module.exports = mongoose.model("artists", artistSchema);
