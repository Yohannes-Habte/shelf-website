import express from "express";
import {
  createBook,
  getBook,
  getBooks,
  updateBook,
} from "../../controllers/book/index.js";

const bookRouter = express.Router();

bookRouter.post("/new", createBook);
bookRouter.put("/:id", updateBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBook);
bookRouter.delete("/:id", getBook);

export default bookRouter;
