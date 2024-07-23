import express from "express";
import {
  createBookshelf,
  deleteBookshelf,
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

export default bookshelfRouter;
