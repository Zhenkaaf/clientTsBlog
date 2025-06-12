/* import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { JSX } from "react";

interface IPrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
    console.log("*****PrivateRoute");

    const { user, isProfileChecked } = useAppSelector((state) => state.auth);
    console.log(user);
    // Если профиль еще проверяется — показываем загрузчик
    if (!isProfileChecked) return null;

    // Если пользователя нет — редиректим
    if (!user) return <Navigate to="/login" replace />;

    // Профиль проверен, и пользователь есть — возвращаем дочерний элемент
    return children;
};

export default PrivateRoute; */

import { Navigate, useLocation } from "react-router-dom";
import { JSX, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import toast from "react-hot-toast";

interface IPrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
    console.log("*****PrivateRoute");
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { user, token, isProfileChecked } = useAppSelector(
        (state) => state.auth
    );

    // Добавляем проверку срока действия токена, который уже в Redux
    // Используем useEffect для сайд-эффектов, таких как dispatch(logout())
    useEffect(() => {
        if (token) {
            try {
                const decodedToken: { exp: number } = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    console.log(
                        "Access token expired on client side in PrivateRoute's useEffect. Dispatching logout."
                    );
                    dispatch(logout());
                    localStorage.removeItem("tokenAutovibe");
                    toast.error(
                        "Your session has expired. Please log in again."
                    );
                }
            } catch (error) {
                console.error(
                    "Error decoding or validating access token in PrivateRoute",
                    error
                );
                // В случае ошибки декодирования или валидации токена также выходим
                dispatch(logout());
                localStorage.removeItem("tokenAutovibe");
                toast.error("Invalid token detected. Please log in again.");
            }
        }
    }, [token, dispatch, location]);

    // Если профиль еще проверяется — показываем загрузчик (или null, как у вас)
    if (!isProfileChecked) {
        console.log("Profile not yet checked in PrivateRoute, returning null.");
        return null; // Или можно вернуть какой-то загрузчик/спиннер
    }

    // Если нет пользователя или токена в Redux-состоянии
    if (!user || !token) {
        console.log(
            "No user or accessToken in Redux state, redirecting to login."
        );
        // Важно: если токен был в localStorage, но истек и useInitProfile его удалил,
        // то `user` и `accessToken` будут null, и это перенаправление сработает.
        return <Navigate to="/login" replace />;
    }

    // Если все проверки пройдены
    return children;
};

export default PrivateRoute;
