import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GaragePage from "./pages/GaragePage";
import PrivateRoute from "./components/PrivateRoute";
import useInitProfile from "./hooks.ts/useInitProfile";

function App() {
    console.log("appRerender");

    useInitProfile();

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path=":id/edit" element={<EditPostPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route
                    path="garage"
                    element={
                        <PrivateRoute>
                            <GaragePage />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
