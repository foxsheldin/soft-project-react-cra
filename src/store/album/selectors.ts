import { RootState } from "..";
import { LoadingStatuses } from "../../constants/LoadingStatuses";

export const selectAlbumState = (state: RootState) => state.album;

export const selectAlbumIds = (state: RootState) => selectAlbumState(state).ids;

export const selectAlbumEntities = (state: RootState) =>
  selectAlbumState(state).entities;

export const selectAlbumLoadingStatus = (state: RootState) =>
  selectAlbumState(state).status;

export const selectAlbumArrayEntities = (state: RootState) =>
  Object.values(selectAlbumEntities(state));

export const selectIsAlbumLoading = (state: RootState) =>
  [LoadingStatuses.idle, LoadingStatuses.inProgress].includes(
    selectAlbumLoadingStatus(state)
  );
