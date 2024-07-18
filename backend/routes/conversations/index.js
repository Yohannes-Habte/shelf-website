import express from "express";

// conversation Router
const conversationRouter = express.Router();

// conversation routes
conversationRouter.post("/new", createConversation);
conversationRouter.put("/update-lastMessage/:id", updateLastMessage);
conversationRouter.get("/shop-conversations/:id", getAllShopConversations);
conversationRouter.get("/user-conversations/:id", getAllShopConversations);

// Export conversation Router
export default conversationRouter;
