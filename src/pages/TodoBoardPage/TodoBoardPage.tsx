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

/* TODO: Убрать any */
interface IPropsOnDranEndHandler {
  draggableId: string;
  source: any;
  destination: any;
}

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
    console.log("result", result);
    console.log("provided", provided);

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

    /* // Your version
    // let result = helper.reorder(val.source, val.destination, taskList);
    // setTasks(result);

    /// A different way!

    const [sourceGroup] = taskList.filter(
      (column) => column.groupName === source.droppableId
    );

    // Destination might be `null`: when a task is
    // dropped outside any drop area. In this case the
    // task reamins in the same column so `destination` is same as `source`
    const [destinationGroup] = destination
      ? taskList.filter(
          (column) => column.groupName === destination.droppableId
        )
      : { ...sourceGroup };

    // We save the task we are moving
    const [movingTask] = sourceGroup.tasks.filter((t) => t.id === draggableId);

    const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);
    const newDestinationGroupTasks = destinationGroup.tasks.splice(
      destination.index,
      0,
      movingTask
    );

    // Mapping over the task lists means that you can easily
    // add new columns
    const newTaskList = taskList.map((column) => {
      if (column.groupName === source.groupName) {
        return {
          groupName: column.groupName,
          tasks: newSourceGroupTasks,
        };
      }
      if (column.groupName === destination.groupName) {
        return {
          groupName: column.groupName,
          tasks: newDestinationGroupTasks,
        };
      }
      return column;
    });
    setTasks(newTaskList); */
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
