import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Toaster } from "react-hot-toast";

export const Layout = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className="main">
                <Outlet />
                <Toaster position="bottom-right" />
            </div>

            <footer className="footer">
                <div>footer</div>
            </footer>
        </div>
    );
};
