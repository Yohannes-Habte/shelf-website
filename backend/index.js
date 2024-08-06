import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import "./database/db.js";

// Routes
import authUserRouter from "./routes/auth/index.js";
import userRouter from "./routes/user/index.js";
import globalErrorHandler from "./middlewares/globalError/index.js";
import bookshelfRouter from "./routes/bookshelf/index.js";
import bookRouter from "./routes/book/index.js";
import borrowedBookRouter from "./routes/borrowedBook/index.js";
import commentRouter from "./routes/comment/index.js";
import donatedBookRouter from "./routes/donatedBook/index.js";
import genreRouter from "./routes/genre/index.js";
import ratingRouter from "./routes/ratings/index.js";
import subscribeRouter from "./routes/subscribe/index.js";

// Express app
dotenv.config();
const app = express();
const corsConfig = process.env.NODE_ENV==="development" ? {
  origin: "http://localhost:3000",
  credentials: true,
} : {
  origin: "https://tim-shelf.netlify.app/",
  credentials: true,
}

app.use(cors(corsConfig),express.json(),cookieParser());
// app.use(express.json());
// app.use(cookieParser());

// Security key holder

// End points
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookshelves", bookshelfRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrowedBooks", borrowedBookRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/donatedBooks", donatedBookRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/ratings", ratingRouter);
app.use("/api/v1/subscribers", subscribeRouter);

// Static assets
app.use(express.static("assets"));

// Global error handler
app.use(globalErrorHandler);

// Server Listener
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server starts on port ${port}`.blue.bold);
});
