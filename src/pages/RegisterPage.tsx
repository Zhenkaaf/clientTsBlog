import s from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IFormInputs } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerUser, resetEmailError } from "../redux/auth/authSlice";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getErrorMessage } from "../utils/getErrorMessage";
import toast from "react-hot-toast";

const RegisterPage = () => {
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
    const navigate = useNavigate();
    const emailErrTxt = useAppSelector((state) => state.auth.emailErrTxt);

    const processFormData = async (data: IFormInputs) => {
        try {
            const res = await dispatch(registerUser(data)).unwrap();
            toast.success(`${res.message}`);
            reset();
            navigate("/my-posts");
        } catch (err) {
            toast.error(getErrorMessage(err));
            console.error("Registration error:", err);
        }
    };

    useEffect(() => {
        return () => {
            dispatch(resetEmailError());
        };
    }, [dispatch]);

    return (
        <div className={s.auth}>
            <form
                onSubmit={handleSubmit(processFormData)}
                className={s.auth__form}
            >
                <h3 className={s.auth__title}>Register</h3>
                <label className="visuallyHidden" htmlFor="email">
                    email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={s.auth__input}
                    {...register("email", {
                        required: "This field is required",
                        maxLength: { value: 254, message: "Email is too long" },
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
                    <p className={s.auth__error}>
                        {errors.email?.message ||
                            emailErrTxt ||
                            "Please check the field"}
                    </p>
                )}
                <div className={s.auth__passwordWrapper}>
                    <label className="visuallyHidden" htmlFor="password">
                        password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        className={s.auth__input}
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
                        onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/\s/g, ""); // Убираем все пробелы
                        }}
                    />
                    <button
                        type="button"
                        className={s.auth__togglePassword}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
                {errors?.password && (
                    <p className={s.auth__error}>
                        {errors.password?.message || "Please check the field"}
                    </p>
                )}
                <button
                    className={s.auth__button}
                    type="submit"
                    disabled={!isValid || isLoading}
                >
                    Register
                </button>

                <div className={s.auth__footer}>
                    <p>Already have an account?</p>
                    <Link to="/login" className={s.auth__link}>
                        Log in
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
