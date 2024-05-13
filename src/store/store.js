import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./todosApi";

export const store = configureStore({
  reducer: {
    todosApi: todosApi.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(todosApi.middleware),
});
