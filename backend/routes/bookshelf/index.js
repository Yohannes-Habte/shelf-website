import express from "express";
import {
  createBookshelf,
  deleteBookshelf,
  getBookshelf,
  getBookshelves,
  updateBookshelfAddress,
} from "../../controllers/bookshelf/index.js";

const bookshelfRouter = express.Router();

bookshelfRouter.post("/new", createBookshelf);
bookshelfRouter.get("/", getBookshelves);
bookshelfRouter.get("/:id", getBookshelf);
bookshelfRouter.put("/:id", updateBookshelfAddress);
bookshelfRouter.delete("/:id", deleteBookshelf);

export default bookshelfRouter;
