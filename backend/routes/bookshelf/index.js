import express from "express";
import {
  countBookshelves,
  createBookshelf,
  deleteBookshelf,
  getAllBooksInBookshelf,
  getBookshelf,
  getBookshelves,
  updateBookshelf,
} from "../../controllers/bookshelf/index.js";

const bookshelfRouter = express.Router();

bookshelfRouter.post("/new", createBookshelf);
bookshelfRouter.get("/", getBookshelves);
bookshelfRouter.get("/:id", getBookshelf);
bookshelfRouter.put("/:id", updateBookshelf);
bookshelfRouter.delete("/:id", deleteBookshelf);
bookshelfRouter.get("/:id/books", getAllBooksInBookshelf);
bookshelfRouter.get("/count/total", countBookshelves);

export default bookshelfRouter;
