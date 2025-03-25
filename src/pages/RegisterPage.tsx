import { Link, useNavigate } from "react-router-dom";
import s from "./RegisterPage.module.css";
import { useForm } from "react-hook-form";
import { IFormInputs } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerUser } from "../redux/auth/authSlice";
import toast from "react-hot-toast";

const RegisterPage = () => {
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
        const toastId = toast.loading("Registering...");
        try {
            const res = await dispatch(registerUser(data)).unwrap();
            toast.success(`${res.message}`, { id: toastId });
            reset();
            navigate("/");
        } catch (err: any) {
            toast.dismiss(toastId);
            toast.error(err, { id: toastId });
            console.error("Registration error:", err);
        }
    };
    return (
        <div className={s.register}>
            <div className="container">
                <form
                    onSubmit={handleSubmit(processFormData)}
                    className={s.register__form}
                >
                    <h3 className={s.register__title}>Register</h3>
                    <label className="visuallyHidden" htmlFor="email">
                        email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className={s.register__input}
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                    {errors?.email && (
                        <p className={s.register__error}>
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
                        className={s.register__input}
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
                        <p className={s.register__error}>
                            {errors.password?.message ||
                                "Please check the field"}
                        </p>
                    )}
                    <button
                        className={s.register__button}
                        type="submit"
                        disabled={!isValid || isLoading}
                    >
                        Register
                    </button>

                    <div className={s.register__footer}>
                        <p>Already have an account?</p>
                        <Link
                            to="/login"
                            className={`${s.register__link} link`}
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
