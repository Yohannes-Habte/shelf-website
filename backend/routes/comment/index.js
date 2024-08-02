import express from "express";
import {
  countComments,
  createComment,
  deleteComment,
  getAllComments,
  getComment,
} from "../../controllers/comment/index.js";

// Comment Router
const commentRouter = express.Router();

// comment routes
commentRouter.post("/:id/new", createComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getComment);
commentRouter.delete("/:commentId", deleteComment);
commentRouter.get("/count/total", countComments);



// Export comment router
export default commentRouter;
