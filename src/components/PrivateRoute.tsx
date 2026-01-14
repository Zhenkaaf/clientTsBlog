import { Navigate, useLocation } from "react-router-dom";
import { JSX, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

interface IPrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
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
                dispatch(logout());
                localStorage.removeItem("tokenAutovibe");
                toast.error("Invalid token detected. Please log in again.");
            }
        }
    }, [token, dispatch, location]);

    // Если профиль еще проверяется — показываем загрузчик (или null)
    if (!isProfileChecked) {
        /*  <Spinner />; */
        return null; // Или можно вернуть какой-то загрузчик/спиннер
    }

    if (!user || !token) {
        console.log(
            "No user or accessToken in Redux state, redirecting to login."
        );
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
