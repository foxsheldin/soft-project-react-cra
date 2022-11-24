import { configureStore } from "@reduxjs/toolkit";
import { commentSlice } from "./comment";
import { postSlice } from "./post";
import { todoSlice } from "./todo/index";
import { userSlice } from "./user";

const store = configureStore({
  reducer: {
    comment: commentSlice.reducer,
    post: postSlice.reducer,
    todo: todoSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
