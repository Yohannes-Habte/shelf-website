import mongoose from "mongoose";

const { Schema } = mongoose;

const bookshelfSchema = new Schema(
  {
    barcode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: [
      {
        longitude: { type: String, required: true },
        latitude: { type: String, required: true },
        // street: { type: String, required: true },
        // zipCode: { type: String, required: true },
        // city: { type: String, required: true },
        // state: { type: String, required: true },
        // country: { type: String, required: true },
      },
    ],

    address: [
      {
        street: { type: String, required: true },
        zipCode: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
      },
    ],

    image: { type: String, required: true },

    openingHours: { type: String, required: true },

    // Average rating of a book shelf
    ratings: { type: Number },
    // Individual user review for rating a book shelf
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
  { timestamps: true }
);

const Bookshelf = mongoose.model("Bookshelf", bookshelfSchema);
export default Bookshelf;
