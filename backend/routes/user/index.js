import express from "express";
import { deleteUser, getTotalUsersCount, getUser, getUsers, updateUserAddress } from "../../controllers/user/index.js";

// Auth User Router
const userRouter = express.Router();

// User Routes
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.put("/id", updateUserAddress);
userRouter.delete("/:id", deleteUser);
userRouter.get("/count/total", getTotalUsersCount);

// Export Auth User Router
export default userRouter;
