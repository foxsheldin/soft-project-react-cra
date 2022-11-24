import { RootState } from "..";
import { LoadingStatuses } from "../../constants/LoadingStatuses";

export const selectCommentState = (state: RootState) => state.comment;

export const selectCommentIds = (state: RootState) =>
  selectCommentState(state).ids;

export const selectCommentEntities = (state: RootState) =>
  selectCommentState(state).entities;

export const selectCommentLoadingStatus = (state: RootState) =>
  selectCommentState(state).status;

export const selectCommentArrayEntities = (state: RootState) =>
  Object.values(selectCommentEntities(state));

export const selectCommentByPostId = (
  state: RootState,
  { postId }: { postId: string }
) =>
  selectCommentArrayEntities(state).filter(
    (comment) => comment?.postId === parseInt(postId)
  );

export const selectIsCommentLoading = (state: RootState) =>
  [LoadingStatuses.idle, LoadingStatuses.inProgress].includes(
    selectCommentLoadingStatus(state)
  );
