import { RootState } from "..";
import { LoadingStatuses } from "../../constants/LoadingStatuses";

export const selectPhotoState = (state: RootState) => state.photo;

export const selectPhotoIds = (state: RootState) => selectPhotoState(state).ids;

export const selectPhotoEntities = (state: RootState) =>
  selectPhotoState(state).entities;

export const selectPhotoLoadingStatus = (state: RootState) =>
  selectPhotoState(state).status;

export const selectPhotoArrayEntities = (state: RootState) =>
  Object.values(selectPhotoEntities(state));

export const selectIsPhotoLoading = (state: RootState) =>
  [LoadingStatuses.idle, LoadingStatuses.inProgress].includes(
    selectPhotoLoadingStatus(state)
  );

export const selectPhotoByAlbumId = (
  state: RootState,
  { albumId }: { albumId: number }
) =>
  selectPhotoArrayEntities(state).filter((photo) => photo?.albumId === albumId);
