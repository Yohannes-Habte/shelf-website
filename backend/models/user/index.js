import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "https://i.ibb.co/4pDNDk1/avatar.png" },
    banner: {
      type: String,
      default:
        "http://res.cloudinary.com/dzlsa51a9/image/upload/v1721681810/upload/ll8xzwish2gazclcqq4m.png",
    },
    street: { type: String },
    zipCode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    borrowedBooks: [{ type: mongoose.Types.ObjectId, ref: "BorrowedBook" }],
    donatedBooks: [{ type: mongoose.Types.ObjectId, ref: "DonatedBook" }],
    donatedBookshelves: [{ type: mongoose.Types.ObjectId, ref: "Bookshelf" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    role: {
      type: String,
      default: "user",
      enum: ["user", "financeManager", "admin"],
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
