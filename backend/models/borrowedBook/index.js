import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the BorrowedBook schema
const borrowedBookSchema = new Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    dateBorrowed: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },

    borrowedFrom: {
      type: mongoose.Types.ObjectId,
      ref: "Bookshelf",
      required: true,
    },

    ratings: { type: Number },
    reviews: [
      {
        user: { type: Object },
        rating: { type: Number },
        comment: { type: String },
        shelfId: { type: String },
        createdAt: { type: Date, default: Date.now() },
      },
    ],

    status: {
      type: String,
      enum: ["borrowed", "returned", "overdue"],
      default: "borrowed",
    },
  },
  {
    timestamps: true,
  }
);

const BorrowedBook = mongoose.model("BorrowedBook", borrowedBookSchema);

export default BorrowedBook;
