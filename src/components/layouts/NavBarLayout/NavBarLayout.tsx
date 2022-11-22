import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";

type Props = {};

const NavBarLayout = (props: Props) => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default NavBarLayout;
