import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  donatedBook: null,
  donatedBooks: [],
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
const donatedBookSlice = createSlice({
  name: "donatedBook",
  initialState,
  reducers: {
    // Post book
    postDonatedBookStart: requestStart,
    postDonatedBookSuccess: (state, action) =>
      requestSuccess(state, action, "donatedBook"),
    postDonatedBookFailure: requestFailure,

    // Fetch single book
    fetchDonatedBookStart: requestStart,
    fetchDonatedBookSuccess: (state, action) =>
      requestSuccess(state, action, "donatedBook"),
    fetchDonatedBookFailure: requestFailure,

    // Update single book
    updateDonatedBookStart: requestStart,
    updateDonatedBookSuccess: (state, action) =>
      requestSuccess(state, action, "donatedBook"),
    updateDonatedBookFailure: requestFailure,

    // Delete book
    deleteDonatedBookStart: requestStart,
    deleteDonatedBookSuccess: (state, action) => {
      state.donatedBooks = state.donatedBooks.filter(
        (book) => book.id !== action.payload.id
      );
      state.loading = false;
    },
    deleteDonatedBookFailure: requestFailure,

    // Get all books
    fetchDonatedBooksStart: requestStart,
    fetchDonatedBooksSuccess: (state, action) =>
      requestSuccess(state, action, "donatedBooks"),
    fetchDonatedBooksFailure: requestFailure,

    // Count all books
    countDonatedBooksStart: requestStart,
    countDonatedBooksSuccess: (state, action) =>
      requestSuccess(state, action, "count"),
    countDonatedBooksFailure: requestFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  postDonatedBookStart,
  postDonatedBookSuccess,
  postDonatedBookFailure,

  fetchDonatedBookStart,
  fetchDonatedBookSuccess,
  fetchDonatedBookFailure,

  updateDonatedBookStart,
  updateDonatedBookSuccess,
  updateDonatedBookFailure,

  deleteDonatedBookStart,
  deleteDonatedBookSuccess,
  deleteDonatedBookFailure,

  fetchDonatedBooksStart,
  fetchDonatedBooksSuccess,
  fetchDonatedBooksFailure,

  countDonatedBooksStart,
  countDonatedBooksSuccess,
  countDonatedBooksFailure,

  clearErrors,
} = donatedBookSlice.actions;

// Export reducer
export default donatedBookSlice.reducer;
