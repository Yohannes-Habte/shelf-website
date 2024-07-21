import axios from "axios";
import {
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
} from "../../reducers/book/bookReducer";

// Post a new book
export const postBook = (bookData) => async (dispatch) => {
  try {
    dispatch(postBookStart());
    const response = await axios.post("/api/books", bookData);
    dispatch(postBookSuccess(response.data));
  } catch (error) {
    dispatch(postBookFailure(error.message));
  }
};

// Fetch a single book by ID
export const fetchBook = (bookId) => async (dispatch) => {
  try {
    dispatch(fetchBookStart());
    const response = await axios.get(`/api/books/${bookId}`);
    dispatch(fetchBookSuccess(response.data));
  } catch (error) {
    dispatch(fetchBookFailure(error.message));
  }
};

// Delete a book by ID
export const deleteBook = (bookId) => async (dispatch) => {
  try {
    dispatch(deleteBookStart());
    await axios.delete(`/api/books/${bookId}`);
    dispatch(deleteBookSuccess(bookId));
  } catch (error) {
    dispatch(deleteBookFailure(error.message));
  }
};

// Fetch all books
export const fetchBooks = () => async (dispatch) => {
  try {
    dispatch(fetchBooksStart());
    const response = await axios.get("/api/books");
    dispatch(fetchBooksSuccess(response.data));
  } catch (error) {
    dispatch(fetchBooksFailure(error.message));
  }
};

// Count all books
export const countBooks = () => async (dispatch) => {
  try {
    dispatch(countBooksStart());
    const response = await axios.get(`/api/books/count`);
    dispatch(countBooksSuccess(response.data));
  } catch (error) {
    dispatch(countBooksFailure(error.message));
  }
};
