import React, { useEffect } from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { CardGroup, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ColumnDragDrop from "../../components/ColumnDragDrop/ColumnDragDrop";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTodoListByUserId, todoSlice } from "../../store/todo";
import {
  selectIsTodoLoading,
  selectTodoCompletedByUserId,
  selectTodoInProgressByUserId,
} from "../../store/todo/selectors";
import { ITodoResponseData } from "../../store/todo/types";
import { fetchUsers } from "../../store/user";
import {
  selectIsUserLoading,
  selectUserById,
} from "../../store/user/selectors";

const TodoBoardPage = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const isTodoLoading = useAppSelector(selectIsTodoLoading);
  const isUserLoading = useAppSelector(selectIsUserLoading);
  const todoCompleted = useAppSelector((state) =>
    selectTodoCompletedByUserId(state, { userId: userId as string })
  );
  const todoInprogress = useAppSelector((state) =>
    selectTodoInProgressByUserId(state, { userId: userId as string })
  );
  const user = useAppSelector((state) =>
    selectUserById(state, { userId: userId as string })
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchTodoListByUserId(userId as string));
  }, [userId]);

  if (isTodoLoading || isUserLoading) {
    return (
      <Container>
        <div style={{ textAlign: "center" }}>Loading...</div>
      </Container>
    );
  }

  const onDragEndHandler: (
    result: DropResult,
    provided: ResponderProvided
  ) => void = (result, provided) => {
    const { destination, draggableId, source } = result;

    let currentItem: ITodoResponseData | undefined;
    switch (source.droppableId) {
      case "completed":
        {
          currentItem = todoCompleted[source.index];
        }
        break;
      case "inProgress":
        {
          currentItem = todoInprogress[source.index];
        }
        break;
      default:
        return;
    }

    if (
      (currentItem?.completed && destination?.droppableId === "inProgress") ||
      (!currentItem?.completed && destination?.droppableId === "completed")
    ) {
      dispatch(
        todoSlice.actions.updateTodo({
          ...currentItem,
          completed: !currentItem?.completed,
        })
      );
    }
  };

  return (
    <Container>
      <h2>Tasks of the user "{user?.name}"</h2>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <CardGroup>
          <ColumnDragDrop
            droppableId="inProgress"
            list={todoInprogress}
            type="task"
          />
          <ColumnDragDrop
            droppableId="completed"
            list={todoCompleted}
            type="task"
          />
        </CardGroup>
      </DragDropContext>
    </Container>
  );
};

export default TodoBoardPage;
