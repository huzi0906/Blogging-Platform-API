const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    disabled: { type: Boolean, required: true, default: false },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, required: true },
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

blogSchema.virtual("averageRating").get(() => {
  if (this.ratings.length > 0) {
    let sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
    return sum / this.ratings.length;
  } else {
    return 0;
  }
});

const model = mongoose.model("Blog", blogSchema);
module.exports = model;
