import axios from "axios";
/* import store from "../redux/store"; // <-- обязательно укажи путь к store
import { logout } from "../redux/auth/authSlice";
 */
const instance = axios.create({
    /*  baseURL: "http://localhost:5000/api", */
    baseURL: "https://serverexpresstsblog.onrender.com/api",
});

// 📤 Добавляем токен ко всем запросам
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("tokenAutovibe");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

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

export default instance;
