import { Link, NavLink } from "react-router-dom";
import s from "./Header.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/auth/authSlice";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import Modal from "./Modal";
import { clearMyPosts } from "../redux/post/postSlice";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    const openCloseMobMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearMyPosts());
        localStorage.removeItem("tokenAutovibe");
        toast.success("You have logged out! See you soon! 👋");
        setIsLogoutModalOpen(false);
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
            {isLoading && <Spinner />}
            <header className={s.header}>
                <div className="container">
                    <div className={s.header__body}>
                        <div className={s.header__left}>
                            <Link
                                to="/"
                                className={`${s.header__logo} link`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                AutoVibe
                            </Link>

                            {user && (
                                <Link
                                    to="/my-posts"
                                    className="link"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className={s.header__user}>
                                        <svg
                                            viewBox="0 0 512.000000 422.000000"
                                            preserveAspectRatio="xMidYMid meet"
                                            className={s.header__userSVG}
                                        >
                                            <g
                                                transform="translate(0.000000,422.000000) scale(0.100000,-0.100000)"
                                                stroke="none"
                                            >
                                                <path
                                                    d="M2450 4064 c-380 -25 -757 -166 -1065 -398 -103 -77 -293 -268 -372
-372 -288 -380 -432 -859 -394 -1314 16 -188 64 -421 87 -421 5 -1 41 104 80
233 39 128 78 248 88 266 9 18 36 51 61 74 41 39 44 44 50 112 34 374 183 707
434 969 252 262 561 421 924 472 600 85 1213 -194 1540 -701 139 -215 229
-479 252 -735 6 -75 7 -77 55 -124 58 -57 69 -83 150 -355 34 -113 66 -209 70
-214 13 -13 25 23 54 161 139 658 -70 1334 -558 1800 -356 341 -796 529 -1281
546 -66 2 -145 3 -175 1z"
                                                />
                                                <path
                                                    d="M606 2998 c-19 -24 -127 -162 -240 -307 l-204 -264 -81 -323 -81
-324 0 -410 0 -411 70 -282 c39 -155 75 -292 80 -305 l10 -22 362 2 363 3 5
245 6 245 172 510 c110 326 172 524 172 550 0 71 -50 124 -116 125 -46 0 -86
-25 -108 -68 -8 -15 -57 -173 -111 -352 -53 -179 -106 -341 -117 -360 -52 -94
-181 -123 -284 -64 -53 30 -66 52 -152 270 -53 134 -72 193 -72 228 0 50 150
668 176 725 8 19 24 76 34 128 26 124 59 237 105 353 40 103 56 150 50 150 -2
0 -20 -19 -39 -42z"
                                                />
                                                <path
                                                    d="M4475 3020 c4 -14 27 -74 51 -133 45 -112 84 -245 105 -357 6 -36 18
-77 25 -91 23 -46 184 -706 184 -755 0 -34 -18 -92 -66 -213 -86 -219 -100
-246 -146 -277 -100 -69 -250 -37 -302 65 -8 14 -59 179 -115 366 -95 317
-104 342 -136 373 -81 75 -195 20 -195 -95 0 -23 69 -242 172 -548 l172 -510
6 -245 5 -245 363 -3 362 -2 10 22 c5 13 41 150 80 305 l70 282 0 413 -1 413
-83 324 -82 323 -227 293 c-125 161 -235 299 -244 306 -14 12 -15 11 -8 -11z"
                                                />
                                                <path
                                                    d="M1215 1249 c-4 -5 -36 -96 -71 -201 l-63 -190 50 -59 c99 -113 289
-267 441 -357 543 -320 1199 -357 1782 -100 224 99 488 289 636 459 l52 60
-67 195 c-37 107 -71 197 -75 199 -4 3 -36 -34 -71 -82 -234 -322 -626 -557
-1031 -618 -141 -22 -370 -19 -510 4 -412 71 -792 311 -1019 644 -42 61 -44
63 -54 46z"
                                                />
                                                <path d="M0 90 l0 -90 535 0 536 0 -3 88 -3 87 -532 3 -533 2 0 -90z" />
                                                <path
                                                    d="M4057 173 c-4 -3 -7 -44 -7 -90 l0 -83 535 0 535 0 0 90 0 90 -528 0
c-291 0 -532 -3 -535 -7z"
                                                />
                                            </g>
                                        </svg>

                                        <span>{user.email.charAt(0)}</span>
                                    </div>
                                </Link>
                            )}
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
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </NavLink>
                                </li>

                                {user && (
                                    <>
                                        <li className={s.menu__item}>
                                            <NavLink
                                                to="/create-post"
                                                className={({ isActive }) =>
                                                    `${s.menu__link} ${
                                                        isActive
                                                            ? s.menu__linkActive
                                                            : ""
                                                    } link`
                                                }
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                Create post
                                            </NavLink>
                                        </li>
                                        <li className={s.menu__item}>
                                            <NavLink
                                                to="/my-posts"
                                                className={({ isActive }) =>
                                                    `${s.menu__link} ${
                                                        isActive
                                                            ? s.menu__linkActive
                                                            : ""
                                                    } link`
                                                }
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                My posts
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                                <li className={s.menu__item}>
                                    {user ? (
                                        <span
                                            onClick={() =>
                                                setIsLogoutModalOpen(true)
                                            }
                                            className={`${s.menu__link} link`}
                                        >
                                            Log Out
                                        </span>
                                    ) : (
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
                                            Log In
                                        </NavLink>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            {isLogoutModalOpen && (
                <Modal
                    isOpen={isLogoutModalOpen}
                    onClose={() => setIsLogoutModalOpen(false)}
                    onConfirm={handleLogout}
                    title="Log Out"
                    confirmText="Yes, log out"
                    cancelText="Cancel"
                >
                    Are you sure you want to log out?
                </Modal>
            )}
        </>
    );
};
