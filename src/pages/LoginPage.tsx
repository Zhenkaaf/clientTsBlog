import { Link, useNavigate } from "react-router-dom";
import s from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser } from "../redux/auth/authSlice";

interface IFormInputs {
    email: string;
    password: string;
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<IFormInputs>({ mode: "onBlur" });

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const navigate = useNavigate();

    const processFormData = async (data: IFormInputs) => {
        const toastId = toast.loading("Logging in...");
        try {
            const res = await dispatch(loginUser(data)).unwrap();
            toast.success(`${res.message}`, { id: toastId });
            reset();
            navigate("/");
        } catch (err: any) {
            toast.dismiss(toastId);
            toast.error(err, { id: toastId });
            console.error("Login error:", err);
        }
    };
    return (
        <div className={s.login}>
            <div className="container">
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
                        })}
                    />
                    {errors?.email && (
                        <p className={s.login__error}>
                            {errors.email?.message || "Please check the field"}
                        </p>
                    )}

                    <label className="visuallyHidden" htmlFor="password">
                        password
                    </label>
                    <input
                        type="password"
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
                        })}
                    />
                    {errors?.password && (
                        <p className={s.login__error}>
                            {errors.password?.message ||
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
                        <Link
                            to="/register"
                            className={`${s.login__link} link`}
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
