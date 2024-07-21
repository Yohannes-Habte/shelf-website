import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userReducer";
import genreReducer from "./reducers/genre/genreReducer";
import bookshelfReducer from "./reducers/bookshelf/bookshelfReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    genre: genreReducer,
    bookshelf: bookshelfReducer,
  },
});

export default Store;
