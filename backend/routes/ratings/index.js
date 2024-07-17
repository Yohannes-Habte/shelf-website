import express from "express";
import {
  createRating,
  getRating,
  getRatings,
} from "../../controllers/ratings/index.js";

const ratingRouter = express.Router();

ratingRouter.post("/new", createRating);
ratingRouter.get("/", getRatings);
ratingRouter.get("/:id", getRating);

export default ratingRouter;
