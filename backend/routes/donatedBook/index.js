import express from "express";
import {
  countDonatedBooks,
  createDonatedBook,
  deleteDonatedBook,
  getDonatedBook,
  getDonatedBooks,
  updateDonatedBook,
} from "../../controllers/donatedBook/index.js";

const donatedBookRouter = express.Router();

donatedBookRouter.post("/new", createDonatedBook);
donatedBookRouter.get("/", getDonatedBooks);
donatedBookRouter.get("/:id", getDonatedBook);
donatedBookRouter.put("/:id", updateDonatedBook);
donatedBookRouter.delete("/:id", deleteDonatedBook);
donatedBookRouter.get("/count/total", countDonatedBooks);

export default donatedBookRouter;



