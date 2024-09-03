import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";

const initialState = {
  currentUser: null,
  users: [],
  borrowedBooks: [],
  donatedBooks: [],
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Register User
    registerStart: setLoading,
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    registerFailure: setError,

    // Login User
    loginStart: setLoading,
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.currentUser = null;
      setError(state, action);
    },

    // Update User Profile
    updateUserStart: setLoading,
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    updateUserFailure: setError,

    // Logout User
    logoutUserStart: setLoading,
    logoutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
    logoutUserFailure: setError,

    // Delete User Profile
    deleteUserStart: setLoading,
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
    deleteUserFailure: setError,

    // Change Password
    changePasswordStart: setLoading,
    changePasswordSuccess: (state) => {
      state.loading = false;
    },
    changePasswordFailure: setError,

    // Fetch User
    fetchUserStart: setLoading,
    fetchUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    fetchUserFailure: setError,

    // Fetch All Users
    fetchAllUsersStart: setLoading,
    fetchAllUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    fetchAllUsersFailure: setError,

    // Count Users
    countUsersStart: setLoading,
    countUsersSuccess: (state, action) => {
      state.count = action.payload;
      state.loading = false;
    },
    countUsersFailure: setError,

    // Fetch Borrowed Books
    fetchBorrowedBooksStart: setLoading,
    fetchBorrowedBooksSuccess: (state, action) => {
      state.borrowedBooks = action.payload;
      state.loading = false;
    },
    fetchBorrowedBooksFailure: setError,

    // Fetch Donated Books
    fetchDonatedBooksStart: setLoading,
    fetchDonatedBooksSuccess: (state, action) => {
      state.donatedBooks = action.payload;
      state.loading = false;
    },
    fetchDonatedBooksFailure: setError,

    // Fetch User Data 
    fetchUserDataStart: setLoading,
    fetchUserDataSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    fetchUserDataFailure: setError,

    // Clear Errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
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
  fetchDonatedBooksFailure,

  fetchUserDataStart,
  fetchUserDataSuccess,
  fetchUserDataFailure,

  clearErrors,
} = userSlice.actions;

export const fetchUserData = () => async (dispatch) => {
  dispatch(fetchUserDataStart());

  try {
    const token = Cookies.get("token");

    if (!token) throw new Error("No user found");
    const res = await axios.get(`${API}/users/user`, {
      withCredentials: true,
    });
    // console.log("user data=", res);
    dispatch(fetchUserDataSuccess(res.data.result));
  } catch (error) {
    dispatch(fetchUserDataFailure(error.message));
  }
};
export default userSlice.reducer;
