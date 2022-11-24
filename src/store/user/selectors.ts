import { RootState } from "..";
import { LoadingStatuses } from "../../constants/LoadingStatuses";

export const selectUserState = (state: RootState) => state.user;

export const selectUserIds = (state: RootState) => selectUserState(state).ids;

export const selectUserEntities = (state: RootState) =>
  selectUserState(state).entities;

export const selectUserLoadingStatus = (state: RootState) =>
  selectUserState(state).status;

export const selectUserArrayEntities = (state: RootState) =>
  Object.values(selectUserEntities(state));

export const selectUserById = (
  state: RootState,
  { userId }: { userId: string }
) => selectUserEntities(state)[userId];

export const selectIsUserLoading = (state: RootState) =>
  [LoadingStatuses.idle, LoadingStatuses.inProgress].includes(
    selectUserLoadingStatus(state)
  );
