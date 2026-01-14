import { configureStore } from "@reduxjs/toolkit";
import { setupAxiosInterceptors } from "../api/axios";
import authReducer from "./auth/authSlice";
import postReducer from "./post/postSlice";
import commentReducer from "./comment/commentSlice";
import resetPasswordReducer from "./resetPassword/resetPasswordSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        comment: commentReducer,
        resetPassword: resetPasswordReducer,
    },
});

// После создания store, настраиваем интерцепторы Axios
setupAxiosInterceptors(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
