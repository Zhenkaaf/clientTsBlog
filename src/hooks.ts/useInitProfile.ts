/* import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { getProfile, setProfileChecked } from "../redux/auth/authSlice";

const useInitProfile = () => {
    console.log("useInitProfile");
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("useInitProfile-useEffect");
        const token = localStorage.getItem("tokenAutovibe");
        if (token) {
            dispatch(getProfile());
        } else {
            //Когда токена НЕТ в localStorage пользователь не авторизован, запрашивать профиль нет смысла. Но чтобы уйти со спиннера и показать интерфейс, нужно вручную установить isProfileChecked = true
            dispatch(setProfileChecked());
        }
    }, [dispatch]);
};

export default useInitProfile;
 */

import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
    getProfile,
    setProfileChecked,
    setAuthToken,
    logout,
} from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const useInitProfile = () => {
    console.log("useInitProfile");
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem("tokenAutovibe");

        if (token) {
            try {
                const decodedToken: { exp: number } = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Текущее время в секундах

                if (decodedToken.exp < currentTime) {
                    // Токен просрочен на клиенте
                    console.log(
                        "Token expired on client side during init. Clearing and skipping profile fetch."
                    );
                    dispatch(logout()); // Вызываем logout, чтобы очистить все
                    localStorage.removeItem("tokenAutovibe");
                    toast.error(
                        "Your session has expired. Please log in again."
                    );
                    return;
                }
            } catch (error) {
                // Токен невалиден (неправильный формат, поврежден и т.д.)
                console.error("Invalid token found during init:", error);
                dispatch(logout()); // Вызываем logout, чтобы очистить все
                localStorage.removeItem("tokenAutovibe");
                toast.error("Invalid token detected. Please log in again.");
                return;
            }

            // Если токен валиден на клиенте:
            // 1. Сохраняем его в Redux-состоянии
            dispatch(setAuthToken({ token }));
            // 2. Затем запрашиваем профиль пользователя
            // myAxios должен быть настроен на использование токена из Redux или localStorage
            // (лучше из Redux, после того как он туда попал)
            dispatch(getProfile());
        } else {
            // Когда токена НЕТ в localStorage
            console.log("No token in localStorage during init.");
            dispatch(setProfileChecked()); // Говорим, что проверка профиля завершена (пользователь не авторизован)
        }
    }, [dispatch]);
};

export default useInitProfile;
