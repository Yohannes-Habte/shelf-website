import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shelf: null,
  bookshelves: [],
  count: null,
  loading: false,
  error: null,
};

const setLoading = (state) => {
  state.loading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const bookshelfSlice = createSlice({
  name: "bookshelf",
  initialState,
  reducers: {
    // Post single bookshelf
    postBookshelfStart: setLoading,
    postBookshelfSuccess: (state, action) => {
      state.shelf = action.payload;
      state.loading = false;
    },
    postBookshelfFailure: setError,

    // Fetch single bookshelf
    fetchBookshelfStart: setLoading,
    fetchBookshelfSuccess: (state, action) => {
      state.shelf = action.payload;
      state.loading = false;
    },
    fetchBookshelfFailure: setError,

    // Fetch all bookshelves
    fetchAllBookshelvesStart: setLoading,
    fetchAllBookshelvesSuccess: (state, action) => {
      if (action.payload.page === 1) {
        state.bookshelves = action.payload.bookshelves; // Reset bookshelves for new search
      } else {
        state.bookshelves = [
          ...state.bookshelves,
          ...action.payload.bookshelves,
        ]; // Append new data for pagination
      }
      state.loading = false;
    },
    fetchAllBookshelvesFailure: setError,

    // Update bookshelf
    updateBookshelfStart: setLoading,
    updateBookshelfSuccess: (state, action) => {
      state.shelf = action.payload;
      state.loading = false;
    },
    updateBookshelfFailure: setError,

    // Delete single bookshelf
    deleteBookshelfStart: setLoading,
    deleteBookshelfSuccess: (state) => {
      state.shelf = null;
      state.loading = false;
    },
    deleteBookshelfFailure: setError,

    // Count bookshelves
    countBookshelvesStart: setLoading,
    countBookshelvesSuccess: (state, action) => {
      state.count = action.payload;
      state.loading = false;
    },
    countBookshelvesFailure: setError,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  postBookshelfStart,
  postBookshelfSuccess,
  postBookshelfFailure,

  fetchBookshelfStart,
  fetchBookshelfSuccess,
  fetchBookshelfFailure,

  fetchAllBookshelvesStart,
  fetchAllBookshelvesSuccess,
  fetchAllBookshelvesFailure,

  updateBookshelfStart,
  updateBookshelfSuccess,
  updateBookshelfFailure,

  deleteBookshelfStart,
  deleteBookshelfSuccess,
  deleteBookshelfFailure,

  countBookshelvesStart,
  countBookshelvesSuccess,
  countBookshelvesFailure,

  clearErrors,
} = bookshelfSlice.actions;

export default bookshelfSlice.reducer;
