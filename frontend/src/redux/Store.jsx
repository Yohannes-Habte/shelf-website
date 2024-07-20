import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userReducer";
import genreReducer from "./reducers/genre/genreReducer";

const Store = configureStore({
    reducer: {
      user: userReducer,
      genre: genreReducer,
    },
  });
  
  export default Store;