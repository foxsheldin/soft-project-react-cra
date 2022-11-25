import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "..";
import { photoAPI } from "../../api/api";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { selectPhotoIds } from "./selectors";
import { IPhotoResponseData } from "./types";

const nameSlice = "photo";

const photoEntityAdapter = createEntityAdapter<IPhotoResponseData>();

export const fetchPhotos = createAsyncThunk(
  `${nameSlice}/fetchPhotos`,
  async (_, thunkAPI) => {
    if (selectPhotoIds(thunkAPI.getState() as RootState).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const response: AxiosResponse<Array<IPhotoResponseData>> =
      await photoAPI.getPhotos();
    return response.data;
  }
);

export const photoSlice = createSlice({
  name: nameSlice,
  initialState: photoEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        photoEntityAdapter.addMany(state, action.payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.earlyAdded
            ? LoadingStatuses.success
            : LoadingStatuses.failed;
      }),
});
