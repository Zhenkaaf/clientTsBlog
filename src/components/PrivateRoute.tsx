import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { JSX } from "react";
import Spinner from "./Spinner";

interface IPrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
    console.log("*****PrivateRoute");

    const { user, isProfileChecked } = useAppSelector((state) => state.auth);
    console.log(user);
    // Если профиль еще проверяется — показываем загрузчик
    if (!isProfileChecked) return <Spinner />;

    // Если пользователя нет — редиректим
    if (!user) return <Navigate to="/login" replace />;

    // Профиль проверен, и пользователь есть — возвращаем дочерний элемент
    return children;
};

export default PrivateRoute;
