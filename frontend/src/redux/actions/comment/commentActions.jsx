import axios from "axios";
import {
  commentPostStart,
  commentPostSuccess,
  commentPostFailure,
  fetchCommentStart,
  fetchCommentSuccess,
  fetchCommentFailure,
  commentDeleteStart,
  commentDeleteSuccess,
  commentDeleteFailure,
  commentsGetStart,
  commentsGetSuccess,
  commentsGetFailure,
} from "../../reducers/comment/commentReducer";

// Post a new comment
export const postComment = (commentData) => async (dispatch) => {
  try {
    dispatch(commentPostStart());
    const response = await axios.post("/api/comments", commentData);
    dispatch(commentPostSuccess(response.data));
  } catch (error) {
    dispatch(commentPostFailure(error.message));
  }
};

// Fetch a single comment by ID
export const fetchComment = (commentId) => async (dispatch) => {
  try {
    dispatch(fetchCommentStart());
    const response = await axios.get(`/api/comments/${commentId}`);
    dispatch(fetchCommentSuccess(response.data));
  } catch (error) {
    dispatch(fetchCommentFailure(error.message));
  }
};

// Delete a comment by ID
export const deleteComment = (commentId) => async (dispatch) => {
  try {
    dispatch(commentDeleteStart());
    await axios.delete(`/api/comments/${commentId}`);
    dispatch(commentDeleteSuccess(commentId));
  } catch (error) {
    dispatch(commentDeleteFailure(error.message));
  }
};

// Fetch all comments
export const fetchComments = () => async (dispatch) => {
  try {
    dispatch(commentsGetStart());
    const response = await axios.get("/api/comments");
    dispatch(commentsGetSuccess(response.data));
  } catch (error) {
    dispatch(commentsGetFailure(error.message));
  }
};
