import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postReducer from "./post/postSlice";
import commentReducer from "./comment/commentSlice";
import { setupAxiosInterceptors } from "../api/axios";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        comment: commentReducer,
    },
});

// После создания store, настраиваем интерцепторы Axios
setupAxiosInterceptors(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
