import express from "express";
import {
  createBorrowedBook,
  getBorrowedBook,
  getBorrowedBooks,
} from "../../controllers/borrowedBook/index.js";

const borrowedBookRouter = express.Router();

borrowedBookRouter.post("/new", createBorrowedBook);
borrowedBookRouter.get("/", getBorrowedBooks);
borrowedBookRouter.get("/:id", getBorrowedBook);

export default borrowedBookRouter;
