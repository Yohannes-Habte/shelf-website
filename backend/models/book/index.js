import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    genre: { type: mongoose.Types.ObjectId, ref: "Genre", required: true },
    language: { type: String, required: true },
    publishedDate: { type: Date },
    publisher: { type: String },
    coverImageUrl: { type: String },
    summary: { type: String },
    ISBN: { type: String },
    audio: { type: Boolean, default: false },
    authors: [
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDate: { type: Date },
        deathDate: { type: Date },
      },
    ],
    borrowedTimes: [{ type: mongoose.Types.ObjectId, ref: "BorrowedBook" }],
    status: {
      type: String,
      default: "available",
      enum: ["available", "borrowed"],
    },
    ratings: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
