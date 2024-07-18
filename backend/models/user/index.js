import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;


const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "https://i.ibb.co/4pDNDk1/avatar.png" },
    street: { type: String },
    zipCode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },

    borrowedBooks: [
      {
        _id: { type: mongoose.Types.ObjectId, ref: "BorrowedBook" },
      },

      {
        _id: { type: mongoose.Types.ObjectId, ref: "Bookshelf" },
      },
    ],

    donatedBooks: [
      { _id: { type: mongoose.Types.ObjectId, ref: "Book" } },
      { _id: { type: mongoose.Types.ObjectId, ref: "Bookshelf" } },
    ],

    comments: [{ _id: { type: mongoose.Types.ObjectId, ref: "Comment" } }],

    role: {
      type: String,
      default: "user",
      enum: ["user", "bookshelfManager", "financeManager", "generalManager"],
    },

    agree: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});


const User = mongoose.model("User", userSchema);


export default User;
