import { configureStore } from "@reduxjs/toolkit";
import { albumSlice } from "./album";
import { commentSlice } from "./comment";
import { photoSlice } from "./photo";
import { postSlice } from "./post";
import { todoSlice } from "./todo/index";
import { userSlice } from "./user";

const store = configureStore({
  reducer: {
    album: albumSlice.reducer,
    comment: commentSlice.reducer,
    photo: photoSlice.reducer,
    post: postSlice.reducer,
    todo: todoSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
