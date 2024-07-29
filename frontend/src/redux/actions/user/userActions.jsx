import axios from "axios";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  fetchAllUsersStart,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  countUsersStart,
  countUsersSuccess,
  countUsersFailure,
  fetchBorrowedBooksStart, 
  fetchBorrowedBooksSuccess, 
  fetchBorrowedBooksFailure, 
  fetchDonatedBooksStart, 
  fetchDonatedBooksSuccess, 
  fetchDonatedBooksFailure 
} from "../../reducers/user/userReducer";
import { API } from "../../../utils/security/secreteKey";

// Helper function to set user in localStorage
const setUserInLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const response = await axios.post("/api/users/register", userData);
    dispatch(registerSuccess(response.data));
    setUserInLocalStorage(response.data);
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};

// Login User
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(`${API}/users/login`, credentials);
    dispatch(loginSuccess(response.data));
    setUserInLocalStorage(response.data);
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

// Update User Profile
export const updateUserProfile = (userId, userData) => async (dispatch) => {
  try {
    dispatch(updateUserStart());
    const response = await axios.put(`${API}/users/${userId}`, userData);
    dispatch(updateUserSuccess(response.data));
    setUserInLocalStorage(response.data);
  } catch (error) {
    dispatch(updateUserFailure(error.response.data.message));
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutUserStart());
    await axios.post(`${API}/users/logout`);
    dispatch(logoutUserSuccess());
    localStorage.removeItem("user");
  } catch (error) {
    dispatch(logoutUserFailure(error.response.data.message));
  }
};

// Delete User Profile
export const deleteUserProfile = (userId) => async (dispatch) => {
  try {
    dispatch(deleteUserStart());
    await axios.delete(`${API}/users/${userId}`);
    dispatch(deleteUserSuccess());
    localStorage.removeItem("user");
  } catch (error) {
    dispatch(deleteUserFailure(error.response.data.message));
  }
};

// Change Password
export const changePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch(changePasswordStart());
    await axios.put(`${API}/users/password`, passwordData);
    dispatch(changePasswordSuccess());
  } catch (error) {
    dispatch(changePasswordFailure(error.response.data.message));
  }
};

// Fetch User
export const fetchUser = (userId) => async (dispatch) => {
  try {
    dispatch(fetchUserStart());
    const response = await axios.get(`${API}/users/${userId}`);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure(error.response.data.message));
  }
};

// Thunk for fetching all users
export const fetchAllUsers = () => async (dispatch) => {
  dispatch(fetchAllUsersStart());
  try {
    const response = await axios.get(`${API}/users`);
    dispatch(fetchAllUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchAllUsersFailure(error.message));
  }
};

// Thunk for counting users
export const countUsers = () => async (dispatch) => {
  dispatch(countUsersStart());
  try {
    const response = await axios.get(`${API}/users/count/total`);
    dispatch(countUsersSuccess(response.data));
  } catch (error) {
    dispatch(countUsersFailure(error.message));
  }
};


// Thunk for fetching borrowed books
export const fetchBorrowedBooks = (userId) => async (dispatch) => {
  dispatch(fetchBorrowedBooksStart());
  try {

    const response = await axios.get(`${API}/users/${userId}/borrowed/books`);
  
    dispatch(fetchBorrowedBooksSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchBorrowedBooksFailure(error.message));
  }
};

// Thunk for fetching donated books
export const fetchDonatedBooks = (userId) => async (dispatch) => {
  dispatch(fetchDonatedBooksStart());
  try {
    const response = await axios.get(`${API}/users/${userId}/donated/books`);
    dispatch(fetchDonatedBooksSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchDonatedBooksFailure(error.message));
  }
};
