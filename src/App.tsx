import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBarLayout from "./components/layouts/NavBarLayout/NavBarLayout";
import AlbumsPage from "./pages/AlbumsPage/AlbumsPage";
import HomePage from "./pages/HomePage/HomePage";
import PostsPage from "./pages/PostsPage/PostsPage";
import TodoListPage from "./pages/TodoListPage/TodoListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBarLayout />}>
        <Route index element={<HomePage />} />
        <Route path="todo" element={<TodoListPage />} />
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="posts" element={<PostsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
