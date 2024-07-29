import express from "express";
import {
  createDonatedBook,
  getDonatedBook,
  getDonatedBooks,
  updateDonatedBook,
} from "../../controllers/donatedBook/index.js";

const donatedBookRouter = express.Router();

donatedBookRouter.post("/new", createDonatedBook);
donatedBookRouter.get("/", getDonatedBooks);
donatedBookRouter.get("/:id", getDonatedBook);
donatedBookRouter.put("/:id", updateDonatedBook);

export default donatedBookRouter;
