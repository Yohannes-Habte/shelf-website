import axios from "axios";
import {
  fetchCommentStart,
  fetchCommentSuccess,
  fetchCommentFailure,
  commentDeleteStart,
  commentDeleteSuccess,
  commentDeleteFailure,
  commentsGetStart,
  commentsGetSuccess,
  commentsGetFailure,
  countCommentsStart,
  countCommentsSuccess,
  countCommentsFailure
} from "../../reducers/comment/commentReducer";
import { API } from "../../../utils/security/secreteKey";



// Fetch a single comment by ID
export const fetchComment = (commentId) => async (dispatch) => {
  try {
    dispatch(fetchCommentStart());
    const response = await axios.get(`${API}/comments/${commentId}`);
    dispatch(fetchCommentSuccess(response.data));
  } catch (error) {
    dispatch(fetchCommentFailure(error.message));
  }
};

// Delete a comment by ID
export const deleteComment = (commentId) => async (dispatch) => {
  try {
    dispatch(commentDeleteStart());
    await axios.delete(`${API}/comments/${commentId}`);
    dispatch(commentDeleteSuccess(commentId));
  } catch (error) {
    dispatch(commentDeleteFailure(error.message));
  }
};

// Fetch all comments
export const fetchComments = () => async (dispatch) => {
  try {
    dispatch(commentsGetStart());
    const response = await axios.get(`${API}/comments`);
    dispatch(commentsGetSuccess(response.data));
  } catch (error) {
    dispatch(commentsGetFailure(error.message));
  }
};

// count all comments
export const countComments = () => async (dispatch) => {
  dispatch(countCommentsStart()); 
  try {
    const response = await axios.get(`${API}/comments/count/total`); 
    dispatch(countCommentsSuccess(response.data.result)); 
  } catch (error) {
    dispatch(countCommentsFailure(error.message)); 
  }
};
