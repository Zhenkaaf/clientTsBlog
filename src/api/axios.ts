import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../redux/store";

const myAxios = axios.create({
    /*  baseURL: "http://localhost:5000/api", */
    baseURL: "https://serverexpresstsblog.onrender.com/api",
});

// 📤 Добавляем токен ко всем запросам
/* instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("tokenAutovibe");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}); */

// НОВАЯ ФУНКЦИЯ для настройки интерцепторов, которая принимает Redux store
export const setupAxiosInterceptors = (storeInstance: Store<RootState>) => {
    // Принимаем store как аргумент
    // Добавляем интерцептор для запросов
    myAxios.interceptors.request.use(
        (config) => {
            const state = storeInstance.getState(); // Используем переданный storeInstance
            const token = state.auth.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    /* // Добавляем интерцептор для ответов (для обработки ошибок аутентификации)
    myAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !originalRequest.url.includes("/auth/login") &&
                !originalRequest.url.includes("/auth/register")
            ) {
                originalRequest._retry = true;

                console.log("Received 401 Unauthorized from API. Logging out.");
                storeInstance.dispatch(logout()); // Диспатчим logout через переданный storeInstance

                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    ); */
};

/* // 📥 Обрабатываем ошибки от сервера
instance.interceptors.response.use(
    (response) => response, // если всё хорошо — просто вернуть ответ
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 403 && message?.toLowerCase().includes("token")) {
            console.warn("Token invalid or expired — logging out...");

            // Удаляем токен
            localStorage.removeItem("tokenAutovibe");

            // Вызываем logout из authSlice
            store.dispatch(logout());

            // Редиректим на страницу логина
            window.location.href = "/login";
        }

        // Прокидываем ошибку дальше в thunk или компонент
        return Promise.reject(error);
    }
); */

export default myAxios;
