import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { getProfile } from "./redux/auth/authSlice";

function App() {
    console.log("appRerender");
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("useEffecrGetProfile");
        const token = localStorage.getItem("tokenAutovibe");
        if (token) {
            console.log("token exists");
            dispatch(getProfile());
        }
    }, [dispatch]);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path=":id/edit" element={<EditPostPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
}

export default App;
