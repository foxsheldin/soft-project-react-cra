import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "..";
import { usersAPI } from "../../api/api";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { selectUserIds } from "./selectors";
import { IUserResponseData } from "./types";

const nameSlice = "user";

const userEntityAdapter = createEntityAdapter<IUserResponseData>();

export const fetchUsers = createAsyncThunk(
  `${nameSlice}/fetchUsers`,
  async (_, thunkAPI) => {
    if (selectUserIds(thunkAPI.getState() as RootState).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response: AxiosResponse<Array<IUserResponseData>> =
      await usersAPI.getUsers();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: nameSlice,
  initialState: userEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        userEntityAdapter.addMany(state, action.payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
