import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  book: null,
  books: [],
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
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // Post book
    postBookStart: requestStart,
    postBookSuccess: (state, action) => requestSuccess(state, action, "book"),
    postBookFailure: requestFailure,

    // Fetch single book
    fetchBookStart: requestStart,
    fetchBookSuccess: (state, action) => requestSuccess(state, action, "book"),
    fetchBookFailure: requestFailure,

    // Delete book
    deleteBookStart: requestStart,
    deleteBookSuccess: (state, action) => requestSuccess(state, action, "book"),
    deleteBookFailure: requestFailure,

    // Get all books
    fetchBooksStart: requestStart,
    fetchBooksSuccess: (state, action) =>
      requestSuccess(state, action, "books"),
    fetchBooksFailure: requestFailure,

    // Count all books
    countBooksStart: requestStart,
    countBooksSuccess: (state, action) =>
      requestSuccess(state, action, "count"),
    countBooksFailure: requestFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  postBookStart,
  postBookSuccess,
  postBookFailure,

  fetchBookStart,
  fetchBookSuccess,
  fetchBookFailure,

  deleteBookStart,
  deleteBookSuccess,
  deleteBookFailure,

  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,

  countBooksStart,
  countBooksSuccess,
  countBooksFailure,

  clearErrors,
} = bookSlice.actions;

// Export reducer
export default bookSlice.reducer;
