import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

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

            <Footer />
        </div>
    );
};
