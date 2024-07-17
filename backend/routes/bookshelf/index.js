import express from "express";
import {
  createBookshelf,
  getBookshelf,
  getBookshelves,
} from "../../controllers/bookshelf/index.js";

const bookshelfRouter = express.Router();

bookshelfRouter.post("/new", createBookshelf);
bookshelfRouter.get("/", getBookshelves);
bookshelfRouter.get("/:id", getBookshelf);

export default bookshelfRouter;
