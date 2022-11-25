import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "..";
import { albumAPI } from "../../api/api";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { selectAlbumIds } from "./selectors";
import { IAlbumResponseData } from "./types";

const nameSlice = "album";

const albumEntityAdapter = createEntityAdapter<IAlbumResponseData>();

export const fetchAlbums = createAsyncThunk(
  `${nameSlice}/fetchAlbums`,
  async (_, thunkAPI) => {
    if (selectAlbumIds(thunkAPI.getState() as RootState).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response: AxiosResponse<Array<IAlbumResponseData>> =
      await albumAPI.getAlbums();
    return response.data;
  }
);

export const albumSlice = createSlice({
  name: nameSlice,
  initialState: albumEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        albumEntityAdapter.addMany(state, action.payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
