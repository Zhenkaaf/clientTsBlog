import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className="main">
                <Outlet />
            </div>

            <footer className="footer">
                <div>footer</div>
            </footer>
        </div>
    );
};
