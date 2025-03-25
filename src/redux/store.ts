import { configureStore } from "@reduxjs/toolkit";
import authSReducer from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
