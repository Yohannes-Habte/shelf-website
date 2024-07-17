import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import "./database/db.js";

// Routes
import authUserRouter from "./routes/auth/index.js";
import globalErrorHandler from "./middlewares/globalError/index.js";
import bookshelfRouter from "./routes/bookshelf/index.js";
import bookRouter from "./routes/book/index.js";
import borrowedBookRouter from "./routes/borrowedBook/index.js";
import commentRouter from "./routes/comment/index.js";
import donatedBookRouter from "./routes/donatedBook/index.js";
import genreRouter from "./routes/genre/index.js";
import ratingRouter from "./routes/ratings/index.js";

// Express app
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// Security key holder
dotenv.config();

// End points
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/bookshelves", bookshelfRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrowedBooks", borrowedBookRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/donatedBooks", donatedBookRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/ratings", ratingRouter);

// Static assets
app.use(express.static("assets"));

// Global error handler
app.use(globalErrorHandler);

// Server Listener
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server starts on port ${port}`.blue.bold);
});
