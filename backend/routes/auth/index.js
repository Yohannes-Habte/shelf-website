import express from "express";
import { createUser, loginUser } from "../../controllers/auth/index.js";

// Auth User Router
const authUserRouter = express.Router();

// User Routes
authUserRouter.post("/register", createUser);
authUserRouter.post("/login", loginUser);
authUserRouter.put("/update/:userId");
authUserRouter.get("/logout");
authUserRouter.put("/change-password/:id");

// Export Auth User Router
export default authUserRouter;
