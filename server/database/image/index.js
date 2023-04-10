const Mongoose = require("mongoose");

const ImageSchema = new Mongoose.Schema(
  {
    images: [
      {
        location: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("Images", ImageSchema);
