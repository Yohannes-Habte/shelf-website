import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  comment: null,
  comments: [],
  count: 0,
  error: null,
  loading: false,
};

// Helper functions
const startRequest = (state) => {
  state.loading = true;
  state.error = null;
};

const successRequest = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const failureRequest = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

// Comment slice
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // Post comment
    commentPostStart: startRequest,
    commentPostSuccess: (state, action) =>
      successRequest(state, action, "comment"),
    commentPostFailure: failureRequest,

    // Fetch single comment
    fetchCommentStart: startRequest,
    fetchCommentSuccess: (state, action) =>
      successRequest(state, action, "comment"),
    fetchCommentFailure: failureRequest,

    // Delete comment
    commentDeleteStart: startRequest,
    commentDeleteSuccess: (state, action) =>
      successRequest(state, action, "comment"),
    commentDeleteFailure: failureRequest,

    // Get all comments
    commentsGetStart: startRequest,
    commentsGetSuccess: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    },
    commentsGetFailure: failureRequest,

    // Count comments
    countCommentsStart: startRequest,
    countCommentsSuccess: (state, action) => {
      state.count = action.payload;
      state.loading = false;
    },
    countCommentsFailure: failureRequest,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
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

  countCommentsStart,
  countCommentsSuccess,
  countCommentsFailure,

  clearErrors,
} = commentSlice.actions;

// Export reducer
export default commentSlice.reducer;
