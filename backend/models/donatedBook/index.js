import mongoose from "mongoose";
const { Schema, model } = mongoose;

const donatedBookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    message: { type: String },
    language: { type: String },
    genre: { type: mongoose.Types.ObjectId, ref: "Genre" },
    publishedDate: { type: Date },
    publisher: { type: String },
    coverImageUrl: { type: String },
    summary: { type: String },
    ISBN: { type: String },
    audio: { type: Boolean, default: false },
    dateDonated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const DonatedBook = model("DonatedBook", donatedBookSchema);

export default DonatedBook;
