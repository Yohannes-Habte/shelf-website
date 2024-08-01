import express from "express";
import {
  countBorrowedBooks,
  createBorrowedBook,
  deleteBorrowedBook,
  getBorrowedBook,
  getBorrowedBooks,
} from "../../controllers/borrowedBook/index.js";

const borrowedBookRouter = express.Router();

borrowedBookRouter.post("/new/:id", createBorrowedBook);
borrowedBookRouter.get("/", getBorrowedBooks);
borrowedBookRouter.get("/:id", getBorrowedBook);
borrowedBookRouter.delete("/:id", deleteBorrowedBook);
borrowedBookRouter.get("/count/total", countBorrowedBooks);

export default borrowedBookRouter;
