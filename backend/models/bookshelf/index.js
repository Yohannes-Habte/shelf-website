// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const bookshelfSchema = new Schema(
//   {
//     barcode: { type: String, required: true, unique: true },
//     image: [{ type: String, required: true }],
//     name: { type: String, required: true },
//     country: { type: String, required: true },
//     state: { type: String, required: true },
//     city: { type: String, required: true },
//     zipCode: { type: String, required: true },
//     street: { type: String, required: true },

//     // Typically used to represent a user's specific geographical location. This field might be relevant if you are tracking where users are located, but it's less common in a bookshelf context unless you're recording the location of users relative to the bookshelf.

//     userLocation: {
//       longitude: { type: Number, required: true },
//       latitude: { type: Number, required: true },
//     },

//     // Generally used to represent the geographical location of an entity, such as a bookshelf or a place. This is more common and professional for representing the location of physical objects or places. If the bookshelf is located at a specific geographic point, this is the more appropriate field to use.

//     location: {
//       type: {
//         type: String,
//         enum: ["Point"], // Specifies type as Point for geospatial indexing
//         required: true,
//       },
//       coordinates: {
//         type: [Number],
//         required: true,
//         index: "2dsphere", // For geospatial queries
//       },
//     },

//     openingTime: { type: String, required: true },
//     closingTime: { type: String, required: true },

//     books: [{ _id: { type: mongoose.Types.ObjectId, ref: "Book" } }],

//     donatedBooks: [
//       { _id: { type: mongoose.Types.ObjectId, ref: "DonatedBook" } },
//     ],

//     borrowedBooks: [
//       {
//         _id: { type: mongoose.Types.ObjectId, ref: "BorrowedBook" },
//       },
//     ],

//     // Average rating of a book shelf
//     ratings: { type: Number },
//     // Individual user review for rating a book shelf
//     reviews: [
//       {
//         user: { type: Object },
//         rating: { type: Number },
//         comment: { type: String },
//         shelfId: { type: String },
//         createdAt: { type: Date, default: Date.now() },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Bookshelf = mongoose.model("Bookshelf", bookshelfSchema);
// export default Bookshelf;

import mongoose from "mongoose";

const { Schema } = mongoose;

// Schema for Bookshelf
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
        enum: ["Point"], // Specifies type as Point for geospatial indexing
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere", // Ensures geospatial indexing
      },
    },

    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },

    books: [{ type: mongoose.Types.ObjectId, ref: "Book" }],

    donatedBooks: [{ type: mongoose.Types.ObjectId, ref: "DonatedBook" }],

    borrowedBooks: [{ type: mongoose.Types.ObjectId, ref: "BorrowedBook" }],

    // Average rating of a bookshelf
    ratings: { type: Number, default: 0 },

    // Individual user reviews for rating a bookshelf
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
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
