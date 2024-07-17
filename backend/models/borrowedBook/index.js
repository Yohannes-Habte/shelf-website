import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the BorrowedBook schema
const borrowedBookSchema = new Schema(
  {
    ISBN: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    dateBorrowed: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: ["borrowed", "returned", "overdue"],
      default: "borrowed",
    },

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

// Create the model for BorrowedBook

const BorrowedBook = mongoose.model("BorrowedBook", borrowedBookSchema);

export default BorrowedBook;
