const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    tags: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
    }],
    feeling: {
      type: Object
   },
    status_share: {
      type: Number,
      require: true,
    },
    reacts: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reactName: {
          type: String,
        },
        reactUrl: {
          type: String,
        },
        reactColor: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
