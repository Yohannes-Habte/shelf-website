import axios from "axios";
import {
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
} from "../../reducers/donation/donatedBookReducer";

import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";

// Thunks
// Post a new donated book
export const postDonatedBook = (bookData) => async (dispatch) => {
  dispatch(postDonatedBookStart());
  try {
    const response = await axios.post(`${API}/donatedBooks/new`, bookData);
    dispatch(postDonatedBookSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(postDonatedBookFailure(error.message));
  }
};

// Fetch a single donated book by ID
export const fetchDonatedBook = (id) => async (dispatch) => {
  dispatch(fetchDonatedBookStart());
  try {
    const response = await axios.get(`${API}/donatedBooks/${id}`);
    dispatch(fetchDonatedBookSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchDonatedBookFailure(error.message));
  }
};


// Update a donated book
export const updateDonatedBook = (id, bookData) => async (dispatch) => {
    dispatch(updateDonatedBookStart());
    try {
      const response = await axios.put(`${API}/donatedBooks/${id}`, bookData);
      dispatch(updateDonatedBookSuccess(response.data.result));
      toast.success(response.data.message);
    } catch (error) {
      dispatch(updateDonatedBookFailure(error.message));
    }
  };

// Delete a donated book
export const deleteDonatedBook = (id) => async (dispatch) => {
  dispatch(deleteDonatedBookStart());
  try {
    const { data } = await axios.delete(`${API}/donatedBooks/${id}`);
    dispatch(deleteDonatedBookSuccess(id));
    toast.success(data.message);
  } catch (error) {
    dispatch(deleteDonatedBookFailure(error.message));
  }
};

// Fetch all donated books
export const fetchDonatedBooks = () => async (dispatch) => {
  dispatch(fetchDonatedBooksStart());
  try {
    const response = await axios.get(`${API}/donatedBooks`);
    dispatch(fetchDonatedBooksSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchDonatedBooksFailure(error.message));
  }
};

// Count all donated books
export const countDonatedBooks = () => async (dispatch) => {
  dispatch(countDonatedBooksStart());
  try {
    const response = await axios.get(`${API}/donatedBooks/count/total`);
    dispatch(countDonatedBooksSuccess(response.data.result));
  } catch (error) {
    dispatch(countDonatedBooksFailure(error.message));
  }
};
