import mongoose from "mongoose";
const { Schema, model } = mongoose;

// DonatedBook Schema
const donatedBookSchema = new Schema(
  {
    title: { type: String, required: true },
    authors: [
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    ],
    genre: { type: mongoose.Types.ObjectId, ref: "Genre" },
    language: { type: String },
    coverImageUrl: { type: String },
    publishedDate: { type: Date },
    publisher: { type: String },
    summary: { type: String },
    ISBN: { type: String },
    audio: { type: Boolean, default: false },
    dateDonated: { type: Date, default: Date.now },

    borrowedTimes: [{ type: mongoose.Types.ObjectId, ref: "BorrowedBook" }],

    status: {
      type: String,
      default: "available",
      enum: ["available", "borrowed"],
    },
    ratings: { type: Number },
    reviews: [
      {
        user: { type: mongoose.Types.ObjectId, ref: "User" },
        rating: { type: Number },
        comment: { type: String },
        shelfId: { type: mongoose.Types.ObjectId, ref: "Bookshelf" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DonatedBook = model("DonatedBook", donatedBookSchema);

export default DonatedBook;
