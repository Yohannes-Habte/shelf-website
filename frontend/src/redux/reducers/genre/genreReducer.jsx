import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genre: "",
  genres: [],
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

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    genreStart: setLoading,
    genreSuccess: (state, action) => {
      state.genre = action.payload;
      state.loading = false;
    },
    genreFailure: setError,

    deleteGenreStart: setLoading,
    deleteGenreSuccess: (state) => {
      state.genre = null;
      state.loading = false;
    },
    deleteGenreFailure: setError,

    fetchAllGenresStart: setLoading,
    fetchAllGenresSuccess: (state, action) => {
      state.genres = action.payload; 
      state.loading = false;
    },
    fetchAllGenresFailure: setError,

    countGenresStart: setLoading,
    countGenresSuccess: (state, action) => {
      state.count = action.payload;
      state.loading = false;
    },
    countGenresFailure: setError,

    // Clear Errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  genreStart,
  genreSuccess,
  genreFailure,

  deleteGenreStart,
  deleteGenreSuccess,
  deleteGenreFailure,

  fetchAllGenresStart,
  fetchAllGenresSuccess,
  fetchAllGenresFailure,

  countGenresStart,
  countGenresSuccess,
  countGenresFailure,

  clearErrors,
} = genreSlice.actions;

export default genreSlice.reducer;
