import { Link, NavLink } from "react-router-dom";
import s from "./Header.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/auth/authSlice";
import toast from "react-hot-toast";
import steeringWheel from "./../assets/steeringWheel.png";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);
    const openCloseMobMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const className = "_lock";
        const body = document.body;
        body.classList.toggle(className, isMenuOpen);
        return () => {
            body.classList.remove(className);
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className={s.header}>
                <div className="container">
                    <div className={s.header__body}>
                        <div className={s.header__left}>
                            <Link to="/" className={`${s.header__logo} link`}>
                                AutoVibe
                            </Link>
                            {user && (
                                <Link to="/login" className="link">
                                    <div className={s.header__user}>
                                        <img
                                            src={steeringWheel}
                                            alt="Steering wheel icon"
                                        />
                                        <span>{user.email.charAt(0)}</span>
                                    </div>
                                </Link>
                            )}
                        </div>

                        <span
                            onClick={() => {
                                dispatch(logout());
                                localStorage.removeItem("tokenAutovibe");
                                toast.success(
                                    "You have logged out! See you soon! 👋"
                                );
                            }}
                        >
                            Exit
                        </span>
                        <div
                            className={`${s.header__burger} ${s.burger} ${
                                isMenuOpen ? s._active : ""
                            }`}
                            onClick={openCloseMobMenu}
                        >
                            <span></span>
                        </div>
                        <nav
                            className={`${s.header__menu} ${s.menu} ${
                                isMenuOpen ? s._active : ""
                            }`}
                        >
                            <ul className={s.menu__list}>
                                <li className={s.menu__item}>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `${s.menu__link} ${
                                                isActive
                                                    ? s.menu__linkActive
                                                    : ""
                                            } link`
                                        }
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className={s.menu__item}>
                                    <NavLink
                                        to="/add"
                                        className={({ isActive }) =>
                                            `${s.menu__link} ${
                                                isActive
                                                    ? s.menu__linkActive
                                                    : ""
                                            } link`
                                        }
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Add Post
                                    </NavLink>
                                </li>
                                <li className={s.menu__item}>
                                    <NavLink
                                        to="/edit"
                                        className={({ isActive }) =>
                                            `${s.menu__link} ${
                                                isActive
                                                    ? s.menu__linkActive
                                                    : ""
                                            } link`
                                        }
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Edit Post
                                    </NavLink>
                                </li>
                                <li className={s.menu__item}>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            `${s.menu__link} ${
                                                isActive
                                                    ? s.menu__linkActive
                                                    : ""
                                            } link`
                                        }
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};
