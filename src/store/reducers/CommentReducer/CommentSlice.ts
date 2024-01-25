import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../../types/IComment";
import { addComment, deleteCommentByID, getAllComments } from "./CommentActionCreater";

interface ICommentState {
  comment: IComment,
  comments: IComment[],
  isLoading: boolean,
  error: string,
};

const initialState: ICommentState = {
  comment: {} as IComment,
  comments: [] as IComment[],
  isLoading: false,
  error: '',
};

const commentSlice = createSlice({
  name: 'COMMENT',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.isLoading = false;
        state.comment = action.payload;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteCommentByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCommentByID.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.isLoading = false;
        state.comment = action.payload;
      })
      .addCase(deleteCommentByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;