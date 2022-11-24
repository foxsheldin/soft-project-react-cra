import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBarLayout from "./components/layouts/NavBarLayout/NavBarLayout";
import AlbumsPage from "./pages/AlbumsPage/AlbumsPage";
import HomePage from "./pages/HomePage/HomePage";
import PostListPage from "./pages/PostListPage/PostListPage";
import PostPage from "./pages/PostPage/PostPage";
import TodoBoardPage from "./pages/TodoBoardPage/TodoBoardPage";
import TodoListPage from "./pages/TodoListPage/TodoListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBarLayout />}>
        <Route index element={<HomePage />} />
        <Route path="todo" element={<TodoListPage />} />
        <Route path="todo/:userId" element={<TodoBoardPage />} />
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="posts" element={<PostListPage />} />
        <Route path="posts/:postId" element={<PostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
