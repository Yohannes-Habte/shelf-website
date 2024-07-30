import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  borrowedBook: null,
  borrowedBooks: [],
  count: null,
  error: null,
  loading: false,
};

// Helper functions to reduce redundancy
const requestStart = (state) => {
  state.loading = true;
  state.error = null; // Clear any previous error on a new request start
};

const requestSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const requestFailure = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

// Book slice
const borrowedBookSlice = createSlice({
  name: "borrowedBook",
  initialState,
  reducers: {
    // Post book
    postBorrowedBookStart: requestStart,
    postBorrowedBookSuccess: (state, action) =>
      requestSuccess(state, action, "borrowedBook"),
    postBorrowedBookFailure: requestFailure,

    // Fetch single book
    fetchBorrowedBookStart: requestStart,
    fetchBorrowedBookSuccess: (state, action) =>
      requestSuccess(state, action, "borrowedBook"),
    fetchBorrowedBookFailure: requestFailure,

    // Update single book
    updateBorrowedBookStart: requestStart,
    updateBorrowedBookSuccess: (state, action) =>
      requestSuccess(state, action, "borrowedBook"),
    updateBorrowedBookFailure: requestFailure,

    // Delete book
    deleteBorrowedBookStart: requestStart,
    deleteBorrowedBookSuccess: (state, action) => {
      state.borrowedBooks = state.borrowedBooks.filter(
        (book) => book.id !== action.payload.id
      );
      state.loading = false;
    },
    deleteBorrowedBookFailure: requestFailure,

    // Get all books
    fetchBorrowedBooksStart: requestStart,
    fetchBorrowedBooksSuccess: (state, action) =>
      requestSuccess(state, action, "borrowedBooks"),
    fetchBorrowedBooksFailure: requestFailure,

    // Count all books
    countBorrowedBooksStart: requestStart,
    countBorrowedBooksSuccess: (state, action) =>
      requestSuccess(state, action, "count"),
    countBorrowedBooksFailure: requestFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  postBorrowedBookStart,
  postBorrowedBookSuccess,
  postBorrowedBookFailure,

  fetchBorrowedBookStart,
  fetchBorrowedBookSuccess,
  fetchBorrowedBookFailure,

  updateBorrowedBookStart,
  updateBorrowedBookSuccess,
  updateBorrowedBookFailure,

  deleteBorrowedBookStart,
  deleteBorrowedBookSuccess,
  deleteBorrowedBookFailure,

  fetchBorrowedBooksStart,
  fetchBorrowedBooksSuccess,
  fetchBorrowedBooksFailure,

  countBorrowedBooksStart,
  countBorrowedBooksSuccess,
  countBorrowedBooksFailure,

  clearErrors,
} = borrowedBookSlice.actions;

// Export reducer
export default borrowedBookSlice.reducer;
