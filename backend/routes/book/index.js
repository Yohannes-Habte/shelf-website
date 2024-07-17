import express from "express";
import { createBook, getBook, getBooks } from "../../controllers/book/index.js";

const bookRouter = express.Router();

bookRouter.post("/new", createBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBook);

export default bookRouter;
