import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "..";
import { postAPI } from "../../api/api";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { selectPostIds } from "./selectors";
import { IPostResponseData } from "./types";

const nameSlice = "post";

const postEntityAdapter = createEntityAdapter<IPostResponseData>();

export const fetchPosts = createAsyncThunk(
  `${nameSlice}/fetchPosts`,
  async (_, thunkAPI) => {
    if (selectPostIds(thunkAPI.getState() as RootState).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response: AxiosResponse<Array<IPostResponseData>> =
      await postAPI.getPost();
    return response.data;
  }
);

export const postSlice = createSlice({
  name: nameSlice,
  initialState: postEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        postEntityAdapter.addMany(state, action.payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
