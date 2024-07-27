import express from "express";
import {
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

export default bookshelfRouter;
