import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUsers } from "../../store/user";
import {
  selectIsUserLoading,
  selectUserArrayEntities,
} from "../../store/user/selectors";

const TodoListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserArrayEntities);
  const isUserLoading = useAppSelector(selectIsUserLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isUserLoading) {
    return (
      <Container>
        <div style={{ textAlign: "center" }}>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <h2>User task boards</h2>
      <Table hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user?.id} onClick={() => navigate(`${user?.id}`)}>
              <td>{user?.id}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TodoListPage;
