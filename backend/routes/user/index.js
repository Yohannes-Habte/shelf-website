import express from "express";
import {
  deleteUser,
  getSingleUser,
  getTotalUsersCount,
  getUserBorrowedBooks,
  getUserDonatedBooks,
  getUsers,
  updateUserAddress,
} from "../../controllers/user/index.js";
import { isAuthenticated } from "../../middlewares/auth/index.js";

// Auth User Router
const userRouter = express.Router();

// User Routes
userRouter.get("/", getUsers);
userRouter.get("/user", isAuthenticated, getSingleUser);
userRouter.put("/id", updateUserAddress);
userRouter.delete("/:id", deleteUser);
userRouter.get("/count/total", getTotalUsersCount);
userRouter.get("/:userId/borrowed/books", getUserBorrowedBooks);
userRouter.get("/:userId/donated/books", getUserDonatedBooks);

// Export Auth User Router
export default userRouter;
