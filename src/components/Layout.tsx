import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Toaster } from "react-hot-toast";

export const Layout = () => {
    return (
        <div className="wrapper">
            <Header />

            <div className="main">
                <div className="container">
                    <Outlet />
                    <Toaster position="bottom-right" />
                </div>
            </div>

            <footer className="footer">
                <div>footer</div>
            </footer>
        </div>
    );
};
