import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { todoAPI } from "../../api/api";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { ITodoResponseData } from "./types";

const nameSlice = "todo";

const todoEntityAdapter = createEntityAdapter<ITodoResponseData>();

export const fetchTodoListByUserId = createAsyncThunk(
  `${nameSlice}/fetchTodoListByUserId`,
  async (userId: string, thunkAPI) => {
    const response: AxiosResponse<Array<ITodoResponseData>> =
      await todoAPI.getTodoListByUserId(userId);
    return response.data;
  }
);

export const todoSlice = createSlice({
  name: nameSlice,
  initialState: todoEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTodoListByUserId.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchTodoListByUserId.fulfilled, (state, action) => {
        todoEntityAdapter.addMany(state, action.payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchTodoListByUserId.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
