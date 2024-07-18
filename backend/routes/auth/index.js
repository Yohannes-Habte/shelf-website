import express from "express";
import {
  changePassword,
  createUser,
  loginUser,
  updateUser,
  userLogout,
} from "../../controllers/auth/index.js";

// Auth User Router
const authUserRouter = express.Router();

// User Routes
authUserRouter.post("/register", createUser);
authUserRouter.post("/login", loginUser);
authUserRouter.put("/update/:userId", updateUser);
authUserRouter.get("/logout", userLogout);
authUserRouter.put("/change-password/:id", changePassword);

// Export Auth User Router
export default authUserRouter;
