import { Link, useNavigate } from "react-router-dom";
import s from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    loginUser,
    resetEmailError,
    resetPasswordError,
} from "../redux/auth/authSlice";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface IFormInputs {
    email: string;
    password: string;
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors, isValid },
    } = useForm<IFormInputs>({ mode: "onBlur" });

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const emailErrTxt = useAppSelector((state) => state.auth.emailErrTxt);
    const passwordErrTxt = useAppSelector((state) => state.auth.passwordErrTxt);
    const navigate = useNavigate();

    const processFormData = async (data: IFormInputs) => {
        try {
            const res = await dispatch(loginUser(data)).unwrap();
            toast.success(`${res.message}`);
            reset();
            navigate("/my-posts");
        } catch (err: any) {
            toast.error(err[Object.keys(err)[0]]);
            console.error("Login error:", err);
        }
    };
    useEffect(() => {
        return () => {
            dispatch(resetEmailError());
        };
    }, [dispatch]);
    return (
        <section className={s.login}>
            <form
                onSubmit={handleSubmit(processFormData)}
                className={s.login__form}
            >
                <h3 className={s.login__title}>Login</h3>
                <label className="visuallyHidden" htmlFor="email">
                    email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={s.login__input}
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Enter a valid email address",
                        },
                        onChange: () => {
                            if (emailErrTxt) {
                                dispatch(resetEmailError());
                                clearErrors("email");
                            }
                        },
                    })}
                />
                {(errors?.email || emailErrTxt) && (
                    <p className={s.login__error}>
                        {errors.email?.message ||
                            emailErrTxt ||
                            "Please check the field"}
                    </p>
                )}

                <div className={s.login__passwordWrapper}>
                    <label className="visuallyHidden" htmlFor="password">
                        password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        className={s.login__input}
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "minimum 6 characters",
                            },
                            maxLength: {
                                value: 20,
                                message: "Maximum 20 characters",
                            },
                            pattern: {
                                value: /^\S*$/,
                                message: "Password can not contain spaces",
                            },
                            onChange: () => {
                                if (passwordErrTxt) {
                                    dispatch(resetPasswordError());
                                    clearErrors("password");
                                }
                            },
                        })}
                        onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/\s/g, ""); // Убираем все пробелы
                        }}
                    />

                    <button
                        type="button"
                        className={s.login__togglePassword}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
                {(errors?.password || passwordErrTxt) && (
                    <p className={s.login__error}>
                        {errors.password?.message ||
                            passwordErrTxt ||
                            "Please check the field"}
                    </p>
                )}

                <button
                    className={s.login__button}
                    type="submit"
                    disabled={!isValid || isLoading}
                >
                    Login
                </button>

                <div className={s.login__footer}>
                    <p> Do not have an account yet?</p>
                    <Link to="/register" className={`${s.login__link} link`}>
                        Register
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;
