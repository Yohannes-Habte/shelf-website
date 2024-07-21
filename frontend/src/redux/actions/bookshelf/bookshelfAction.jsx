import axios from "axios";
import {
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
} from "../../reducers/bookshelf/bookshelfReducer";

// Post a new bookshelf
export const postBookshelf = (bookshelfData) => async (dispatch) => {
  dispatch(postBookshelfStart());
  try {
    const response = await axios.post("/api/bookshelves", bookshelfData);
    dispatch(postBookshelfSuccess(response.data));
  } catch (error) {
    dispatch(postBookshelfFailure(error.message));
  }
};

// Fetch a single bookshelf by ID
export const fetchBookshelf = (id) => async (dispatch) => {
  dispatch(fetchBookshelfStart());
  try {
    const response = await axios.get(`/api/bookshelves/${id}`);
    dispatch(fetchBookshelfSuccess(response.data));
  } catch (error) {
    dispatch(fetchBookshelfFailure(error.message));
  }
};

// Fetch all bookshelves
export const fetchAllBookshelves = () => async (dispatch) => {
  dispatch(fetchAllBookshelvesStart());
  try {
    const response = await axios.get("/api/bookshelves");
    dispatch(fetchAllBookshelvesSuccess(response.data));
  } catch (error) {
    dispatch(fetchAllBookshelvesFailure(error.message));
  }
};

// Update a bookshelf by ID
export const updateBookshelf = (id, updatedData) => async (dispatch) => {
  dispatch(updateBookshelfStart());
  try {
    const response = await axios.put(`/api/bookshelves/${id}`, updatedData);
    dispatch(updateBookshelfSuccess(response.data));
  } catch (error) {
    dispatch(updateBookshelfFailure(error.message));
  }
};

// Delete a bookshelf by ID
export const deleteBookshelf = (id) => async (dispatch) => {
  dispatch(deleteBookshelfStart());
  try {
    await axios.delete(`/api/bookshelves/${id}`);
    dispatch(deleteBookshelfSuccess());
  } catch (error) {
    dispatch(deleteBookshelfFailure(error.message));
  }
};

// Count all bookshelves
export const countBookshelves = () => async (dispatch) => {
  dispatch(countBookshelvesStart());
  try {
    const response = await axios.get("/api/bookshelves/count");
    dispatch(countBookshelvesSuccess(response.data));
  } catch (error) {
    dispatch(countBookshelvesFailure(error.message));
  }
};
