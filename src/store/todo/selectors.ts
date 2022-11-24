import { RootState } from "..";
import { LoadingStatuses } from "../../constants/LoadingStatuses";

export const selectTodoState = (state: RootState) => state.todo;

export const selectTodoIds = (state: RootState) => selectTodoState(state).ids;

export const selectTodoEntities = (state: RootState) =>
  selectTodoState(state).entities;

export const selectTodoLoadingStatus = (state: RootState) =>
  selectTodoState(state).status;

export const selectTodoArrayEntities = (state: RootState) =>
  Object.values(selectTodoEntities(state));

export const selectIsTodoLoading = (state: RootState) =>
  [LoadingStatuses.idle, LoadingStatuses.inProgress].includes(
    selectTodoLoadingStatus(state)
  );

export const selectTodoByUserId = (
  state: RootState,
  { userId }: { userId: string }
) =>
  selectTodoArrayEntities(state).filter(
    (todo) => todo?.userId === parseInt(userId)
  );

export const selectTodoCompletedByUserId = (
  state: RootState,
  { userId }: { userId: string }
) =>
  selectTodoByUserId(state, { userId }).filter(
    (todo) => todo?.completed === true
  );

export const selectTodoInProgressByUserId = (
  state: RootState,
  { userId }: { userId: string }
) =>
  selectTodoByUserId(state, { userId }).filter(
    (todo) => todo?.completed === false
  );
