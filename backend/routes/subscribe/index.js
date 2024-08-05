import express from "express";
import {
  createSubscriber,
  sendNotifications,
} from "../../controllers/subscribe/index.js";

const subscribeRouter = express.Router();

subscribeRouter.post("/new", createSubscriber);
subscribeRouter.post("/notify", sendNotifications);

export default subscribeRouter;
