import { RootState } from "..";
import { LoadingStatuses } from "../../constants/LoadingStatuses";

export const selectPostState = (state: RootState) => state.post;

export const selectPostIds = (state: RootState) => selectPostState(state).ids;

export const selectPostEntities = (state: RootState) =>
  selectPostState(state).entities;

export const selectPostLoadingStatus = (state: RootState) =>
  selectPostState(state).status;

export const selectPostArrayEntities = (state: RootState) =>
  Object.values(selectPostEntities(state));

export const selectPostById = (
  state: RootState,
  { postId }: { postId: string }
) => selectPostEntities(state)[postId];

export const selectIsPostLoading = (state: RootState) =>
  [LoadingStatuses.idle, LoadingStatuses.inProgress].includes(
    selectPostLoadingStatus(state)
  );
