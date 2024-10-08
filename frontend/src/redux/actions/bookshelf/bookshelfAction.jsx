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
import { API } from "../../../utils/security/secreteKey";

// Post a new bookshelf
export const postBookshelf = (bookshelfData) => async (dispatch) => {
  dispatch(postBookshelfStart());
  try {
    const response = await axios.post(`${API}/bookshelves/new`, bookshelfData);
    dispatch(postBookshelfSuccess(response.data));
  } catch (error) {
    dispatch(postBookshelfFailure(error.message));
  }
};

// Fetch a single bookshelf by ID
export const fetchBookshelf = (id) => async (dispatch) => {
  dispatch(fetchBookshelfStart());
  try {
    const { data } = await axios.get(`${API}/bookshelves/${id}`);
    dispatch(fetchBookshelfSuccess(data.result));
  } catch (error) {
    dispatch(fetchBookshelfFailure(error.message));
  }
};

// // Fetch all bookshelves
// export const fetchAllBookshelves = (searchParams) => async (dispatch) => {
//   dispatch(fetchAllBookshelvesStart());
//   try {
//     // Check if searchParams is properly formatted
//     const { data } = await axios.get(`${API}/bookshelves`, { params: searchParams });
//     dispatch(fetchAllBookshelvesSuccess(data.result));
//   } catch (error) {
//     console.error('Error fetching bookshelves:', error);
//     dispatch(fetchAllBookshelvesFailure(error.message));
//   }
// };

// Action creator for fetching all bookshelves with pagination
export const fetchAllBookshelves = (searchParams) => async (dispatch) => {
  dispatch(fetchAllBookshelvesStart());
  try {
    const { data } = await axios.get(`${API}/bookshelves`, {
      params: searchParams,
    });
    dispatch(
      fetchAllBookshelvesSuccess({
        bookshelves: data.result,
        page: searchParams.page || 1,
      })
    );
    return data.result.length > 0;
  } catch (error) {
    dispatch(fetchAllBookshelvesFailure(error.message));
    return false;
  }
};

// Update a bookshelf by ID
export const updateBookshelf = (id, updatedData) => async (dispatch) => {
  dispatch(updateBookshelfStart());
  try {
    const response = await axios.put(`${API}/bookshelves/${id}`, updatedData);
    dispatch(updateBookshelfSuccess(response.data));
  } catch (error) {
    dispatch(updateBookshelfFailure(error.message));
  }
};

// Delete a bookshelf by ID
export const deleteBookshelf = (id) => async (dispatch) => {
  dispatch(deleteBookshelfStart());
  try {
    await axios.delete(`${API}/bookshelves/${id}`);
    dispatch(deleteBookshelfSuccess());
  } catch (error) {
    dispatch(deleteBookshelfFailure(error.message));
  }
};

// Count all bookshelves
export const countBookshelves = () => async (dispatch) => {
  dispatch(countBookshelvesStart());
  try {
    const response = await axios.get(`${API}/bookshelves/count/total`);
    dispatch(countBookshelvesSuccess(response.data.result));
  } catch (error) {
    dispatch(countBookshelvesFailure(error.message));
  }
};
