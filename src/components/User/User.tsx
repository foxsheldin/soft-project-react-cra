import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUsers } from "../../store/user";
import { selectUserById } from "../../store/user/selectors";
import { IUserComponentProps } from "./types";

const User = ({ userId }: IUserComponentProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) =>
    selectUserById(state, { userId: userId as string })
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return <span>{user?.name}</span>;
};

export default User;
