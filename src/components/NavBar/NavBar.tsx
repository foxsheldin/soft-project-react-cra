import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to={"/"} className="navbar-brand">
          Soft Brand
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"albums"} className="nav-link">
              Albums
            </NavLink>
            <NavLink to={"posts"} className="nav-link">
              Posts
            </NavLink>
            <NavLink to={"todo"} className="nav-link">
              TODO list
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
