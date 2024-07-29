import mongoose from "mongoose";

const { Schema } = mongoose;

const bookshelfSchema = new Schema(
  {
    barcode: { type: String, required: true, unique: true },
    image: [{ type: String, required: true }],
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    street: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere",
      },
    },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    books: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
    donatedBooks: [{ type: mongoose.Types.ObjectId, ref: "DonatedBook" }],
    borrowedBooks: [{ type: mongoose.Types.ObjectId, ref: "BorrowedBook" }],
    ratings: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Bookshelf = mongoose.model("Bookshelf", bookshelfSchema);
export default Bookshelf;
