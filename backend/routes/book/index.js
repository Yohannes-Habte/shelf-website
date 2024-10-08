import express from "express";
import {
  countBooks,
  createBook,
  deleteBook,
  getBook,
  getBookRating,
  getBooks,
  updateBook,
  updateBookRating,
} from "../../controllers/book/index.js";

const bookRouter = express.Router();

bookRouter.post("/new", createBook);
bookRouter.put("/:id", updateBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.get("/count/total", countBooks);
bookRouter.put("/:bookId/rating", updateBookRating);
bookRouter.get("/:bookId/rating", getBookRating);

export default bookRouter;
