import { Link, NavLink } from "react-router-dom";
import s from "./Header.module.css";
import { useEffect, useState } from "react";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <div className={s.header__logo}>
                            <Link to="/" className="link">
                                AutoVibe
                            </Link>
                        </div>
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
