import axios from "axios";
import {
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
} from "../../reducers/borrow/borrowBookReducer";
import { API } from "../../../utils/security/secreteKey";

// Post a borrowed book
export const postBorrowedBook = (bookData) => async (dispatch) => {
  dispatch(postBorrowedBookStart());
  try {
    const response = await axios.post(`${API}/borrowedBooks/new`, bookData);
    dispatch(postBorrowedBookSuccess(response.data.result));
  } catch (error) {
    dispatch(postBorrowedBookFailure(error.message));
  }
};

// Fetch a single borrowed book
export const fetchBorrowedBook = (id) => async (dispatch) => {
  dispatch(fetchBorrowedBookStart());
  try {
    const response = await axios.get(`${API}/borrowedBooks/${id}`);
    dispatch(fetchBorrowedBookSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchBorrowedBookFailure(error.message));
  }
};

// Update a borrowed book
export const updateBorrowedBook = (id, bookData) => async (dispatch) => {
  dispatch(updateBorrowedBookStart());
  try {
    const response = await axios.put(`${API}/borrowedBooks/${id}`, bookData);
    dispatch(updateBorrowedBookSuccess(response.data.result));
  } catch (error) {
    dispatch(updateBorrowedBookFailure(error.message));
  }
};

// Delete a borrowed book
export const deleteBorrowedBook = (id) => async (dispatch) => {
  dispatch(deleteBorrowedBookStart());
  try {
    await axios.delete(`${API}/borrowedBooks/${id}`);
    dispatch(deleteBorrowedBookSuccess({ id }));
  } catch (error) {
    dispatch(deleteBorrowedBookFailure(error.message));
  }
};

// Fetch all borrowed books
export const fetchBorrowedBooks = () => async (dispatch) => {
  dispatch(fetchBorrowedBooksStart());
  try {
    const response = await axios.get(`${API}/borrowedBooks`);
    dispatch(fetchBorrowedBooksSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchBorrowedBooksFailure(error.message));
  }
};

// Count all borrowed books
export const countBorrowedBooks = () => async (dispatch) => {
  dispatch(countBorrowedBooksStart());
  try {
    const response = await axios.get(`${API}/borrowedBooks/count/total`);
    dispatch(countBorrowedBooksSuccess(response.data.result));
  } catch (error) {
    dispatch(countBorrowedBooksFailure(error.message));
  }
};
