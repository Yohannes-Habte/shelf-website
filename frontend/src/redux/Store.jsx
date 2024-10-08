import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userReducer";
import genreReducer from "./reducers/genre/genreReducer";
import bookshelfReducer from "./reducers/bookshelf/bookshelfReducer";
import commentReducer from "./reducers/comment/commentReducer";
import bookReducer from "./reducers/book/bookReducer";
import donatedBookReducer from "./reducers/donation/donatedBookReducer";
import borrowBookReducer from "./reducers/borrow/borrowBookReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    genre: genreReducer,
    bookshelf: bookshelfReducer,
    comment: commentReducer,
    book: bookReducer,
    donatedBook: donatedBookReducer,
    borrowedBook: borrowBookReducer,
  },
});

export default Store;
