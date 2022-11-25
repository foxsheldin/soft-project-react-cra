import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const albumAPI = {
  getAlbums() {
    return instance.get("albums");
  },
};

export const commentAPI = {
  getCommentsByPostId(postId: number | string) {
    return instance.get(`comments?postId=${postId}`);
  },
};

export const photoAPI = {
  getPhotos() {
    return instance.get(`photos`);
  },
  getPhotosByAlbumId(albumId: string | number) {
    return instance.get(`photos?albumId=${albumId}`);
  },
};

export const postAPI = {
  getPost() {
    return instance.get("posts");
  },
};

export const todoAPI = {
  getTodoList() {
    return instance.get("todos");
  },
  getTodoListByUserId(userId: string | number) {
    return instance.get(`todos?userId=${userId}`);
  },
};

export const usersAPI = {
  getUsers() {
    return instance.get("users");
  },
};
