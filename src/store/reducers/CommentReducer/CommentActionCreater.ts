import { createAsyncThunk } from "@reduxjs/toolkit";
import CommentService from "../../../services/CommentService";
import { ICommentNew } from "../../../types/IComment";

export const addComment = createAsyncThunk(
  'COMMENT/addComment',
  async (comment: ICommentNew, {rejectWithValue}) => {
    try {
      return await (await CommentService.addComment(comment)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getCommentByID = createAsyncThunk(
  'COMMENT/getCommentByID',
  async (commentID: string, {rejectWithValue}) => {
    try {
      return await (await CommentService.getCommentByID(commentID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllComments = createAsyncThunk(
  'COMMENT/getAllComments',
  async (_, {rejectWithValue}) => {
    try {
      return await (await CommentService.getAllComments()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

// export const updateCommentByID = createAsyncThunk(
//   'COMMENT/updateCommentByID',
//   async ( data: {commentID: string, comment: ICommentUpdate}, {rejectWithValue}) => {
//     try {
//       return await (await CommentService.updateCommentByID(data.commentID, data.comment)).data;
      
//     } catch (error: any) {
//       return rejectWithValue(error.message)
//     }
//   }
// );

export const deleteCommentByID = createAsyncThunk(
  'COMMENT/deleteCommentByID',
  async (commentID: string, {rejectWithValue}) => {
    try {
      return await (await CommentService.deleteCommentByID(commentID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);