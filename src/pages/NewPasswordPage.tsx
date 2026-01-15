import s from "./Auth.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getErrorMessage } from "../utils/getErrorMessage";
import { createNewPassword } from "../redux/resetPassword/resetPasswordSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

interface NewPasswordFormValues {
    password: string;
    confirmPassword: string;
}

const NewPasswordPage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.resetPassword.isLoading);
    const resetToken = sessionStorage.getItem("resetToken");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<NewPasswordFormValues>({ mode: "onBlur" });
    const password = watch("password");

    if (!resetToken) {
        return (
            <>
                <div>
                    You don’t have permission to create a new password. Please
                    start the password reset process again
                </div>
                <br />
                <Link to="/reset-password" className={`${s.auth__link} link`}>
                    Reset password
                </Link>
            </>
        );
    }

    const handleCreateNewPassword = async (formData: NewPasswordFormValues) => {
        try {
            const data = await dispatch(
                createNewPassword({
                    newPassword: formData.password,
                    resetToken,
                })
            ).unwrap();
            toast.success(data.message);
            navigate("/login");
        } catch (err) {
            console.error("New password request error:", err);
            toast.error(getErrorMessage(err, "Failed to create new password"));
        }
    };

    return (
        <div className={s.auth}>
            {isLoading && <Spinner />}
            <form
                onSubmit={handleSubmit(handleCreateNewPassword)}
                className={s.auth__form}
            >
                <h3 className={s.auth__title}>Create new password</h3>

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
                                message: "Minimum 6 characters",
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

                <div className={s.auth__passwordWrapper}>
                    <label className="visuallyHidden" htmlFor="confirmPassword">
                        confirmPassword
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Confirm password"
                        className={s.auth__input}
                        {...register("confirmPassword", {
                            required: "This field is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(/\s/g, "");
                        }}
                    />

                    <button
                        type="button"
                        className={s.auth__togglePassword}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={
                            showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>
                {errors?.confirmPassword && (
                    <p className={s.auth__error}>
                        {errors.confirmPassword?.message ||
                            "Please check the field"}
                    </p>
                )}
                <button
                    className={s.auth__button}
                    type="submit"
                    disabled={!isValid || isLoading}
                >
                    Create new password
                </button>
            </form>
        </div>
    );
};

export default NewPasswordPage;
