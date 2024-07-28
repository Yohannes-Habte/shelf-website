import express from "express";
import {
  createBook,
  getBook,
  getBooks,
  updateBook,
  updateBookRating,
} from "../../controllers/book/index.js";

const bookRouter = express.Router();

bookRouter.post("/new", createBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", getBook);
bookRouter.put('/:bookId/rating', updateBookRating);

export default bookRouter;
