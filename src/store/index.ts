import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/AuthSlice";
import { clientSlice } from "./reducers/clientSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    client: clientSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
