import { useEffect } from "react";
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
