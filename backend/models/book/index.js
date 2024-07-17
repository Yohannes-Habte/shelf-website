import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Book Schema
const bookSchema = new Schema(
  {
    ISBN: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    authors: [
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDate: { type: Date },
        deathDate: { type: Date },
      },
    ],
    publishedDate: { type: Date, required: true },
    genres: [
      {
        _id: { type: mongoose.Types.ObjectId, ref: "Genre" },
      },
    ],
    summary: { type: String, required: true },

    pages: { type: Number },
    language: { type: String, required: true },
    publisher: { type: String, required: true },
    coverImageUrl: { type: String, required: true },
    // Average rating of a book
    ratings: { type: Number },
    // Individual user review for rating a book
    reviews: [
      {
        user: { type: Object },
        rating: { type: Number },
        comment: { type: String },
        shelfId: { type: String },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
