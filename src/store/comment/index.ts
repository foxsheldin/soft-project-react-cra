import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { commentAPI } from "../../api/api";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { ICommentResponseData } from "./types";

const nameSlice = "comment";

const commentEntityAdapter = createEntityAdapter<ICommentResponseData>();

export const fetchCommentsByPostId = createAsyncThunk(
  `${nameSlice}/fetchCommentsByPostId`,
  async (postId: number | string, thunkAPI) => {
    const response: AxiosResponse<Array<ICommentResponseData>> =
      await commentAPI.getCommentsByPostId(postId);
    return response.data;
  }
);

export const commentSlice = createSlice({
  name: nameSlice,
  initialState: commentEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        commentEntityAdapter.addMany(state, action.payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
