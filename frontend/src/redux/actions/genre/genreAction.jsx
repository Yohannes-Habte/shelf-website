import axios from "axios";
import {
  countGenresFailure,
  countGenresStart,
  countGenresSuccess,
  deleteGenreFailure,
  deleteGenreStart,
  deleteGenreSuccess,
  fetchAllGenresFailure,
  fetchAllGenresStart,
  fetchAllGenresSuccess,
} from "../../reducers/genre/genreReducer";

// Example thunk to fetch all genres
export const fetchAllGenres = () => async (dispatch) => {
  dispatch(fetchAllGenresStart());
  try {
    const response = await axios.post("/api/bookshelves");
    dispatch(fetchAllGenresSuccess(response.data));
  } catch (error) {
    dispatch(fetchAllGenresFailure(error.toString()));
  }
};

// Example thunk to delete a genre
export const deleteGenre = (id, updatedData) => async (dispatch) => {
  dispatch(deleteGenreStart());
  try {
    const response = await axios.put(`/api/genres/${id}`, updatedData);
    dispatch(deleteGenreSuccess(response.data));
  } catch (error) {
    dispatch(deleteGenreFailure(error.toString()));
  }
};

// Example thunk to count genres
export const countGenres = () => async (dispatch) => {
  dispatch(countGenresStart());
  try {
    const response = await axios.get("/api/genres/count");
    dispatch(countGenresSuccess(response.data));
  } catch (error) {
    dispatch(countGenresFailure(error.toString()));
  }
};
