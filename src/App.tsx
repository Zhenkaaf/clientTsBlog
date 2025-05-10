import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import PrivateRoute from "./components/PrivateRoute";
import useInitProfile from "./hooks.ts/useInitProfile";
import MyPostsPage from "./pages/MyPostsPage";
import PostPage from "./pages/PostPage";

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
                <Route path="post/:id" element={<PostPage />} />
                <Route
                    path="create-post"
                    element={
                        <PrivateRoute>
                            <CreatePostPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="my-posts"
                    element={
                        <PrivateRoute>
                            <MyPostsPage />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
