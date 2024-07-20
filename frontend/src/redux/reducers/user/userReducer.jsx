import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  users: [],
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
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
