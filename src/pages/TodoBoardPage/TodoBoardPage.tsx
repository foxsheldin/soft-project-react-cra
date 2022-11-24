import React, { useEffect } from "react";
import { Card, CardGroup, Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTodoListByUserId } from "../../store/todo";
import {
  selectIsTodoLoading,
  selectTodoCompletedByUserId,
  selectTodoInProgressByUserId,
} from "../../store/todo/selectors";
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

  return (
    <Container>
      <h2>Tasks of the user "{user?.name}"</h2>
      <CardGroup>
        <Card>
          <Card.Header>To-do in progress</Card.Header>
          <Card.Body>
            <Table hover>
              <tbody>
                {todoInprogress.map((todo) => (
                  <tr key={`inProgress_${todo?.id}`}>
                    <td data-id={todo?.id}>{todo?.title}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Completed</Card.Header>
          <Card.Body>
            <Table hover>
              <tbody>
                {todoCompleted.map((todo) => (
                  <tr key={`completed_${todo?.id}`}>
                    <td data-id={todo?.id}>{todo?.title}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </CardGroup>
    </Container>
  );
};

export default TodoBoardPage;
