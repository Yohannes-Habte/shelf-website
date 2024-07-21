import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userReducer";
import genreReducer from "./reducers/genre/genreReducer";
import bookshelfReducer from "./reducers/bookshelf/bookshelfReducer";
import commentReducer from "./reducers/comment/commentReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    genre: genreReducer,
    bookshelf: bookshelfReducer,
    comment: commentReducer,
  },
});

export default Store;
