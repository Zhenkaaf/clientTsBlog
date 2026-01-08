import { useForm } from "react-hook-form";
import s from "./ResetPasswordPage.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePersistentTimer } from "../hooks.ts/usePersistentTimer";
import { getErrorMessage } from "../utils/getErrorMessage";

type ResetPasswordFormValues = {
    email: string;
};

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ResetPasswordFormValues>({ mode: "onBlur" });

    const { isTimerActive, startTimer, clearTimer } = usePersistentTimer();

    const handleResetPassword = async (formData: ResetPasswordFormValues) => {
        /* if (localStorage.getItem("is_time_out")) {
            localStorage.removeItem("is_time_out");
        }
        const savedFinalTimeStr = localStorage.getItem("final_time_of_timer");
        const finalTime = Number(savedFinalTimeStr);
        const currentTimeStamp = Date.now(); // текущее время в мс
        const diffInMs = finalTime - currentTimeStamp; // разница в миллисекундах
        if (diffInMs > 0) {
            alert("A password reset code has already been sent to your email.");
            navigate("/verify-code", { state: { email: formData.email } });
            return;
        } else {
            localStorage.removeItem("final_time_of_timer");
        } */
        const savedEmail = localStorage.getItem("reset_email");

        if (savedEmail && savedEmail !== formData.email) {
            clearTimer();
            localStorage.removeItem("reset_email");
        }
        if (savedEmail === formData.email && isTimerActive) {
            alert("A password reset code has already been sent to your email.");
            navigate("/verify-code", { state: { email: formData.email } });
            return;
        }

        try {
            const response = await fetch(
                /* "http://localhost:5000/api/auth/reset-password", */
                "https://serverexpresstsblog.onrender.com/api/auth/reset-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.message ?? "Failed to reset password");
            }
            toast.success(
                data?.message ??
                    "A verification code has been sent to your email"
            );
            localStorage.setItem("reset_email", formData.email);
            startTimer();
            navigate("/verify-code", { state: { email: formData.email } });
        } catch (err) {
            console.error("Reset password request error:", err);
            toast.error(
                getErrorMessage(
                    err,
                    "Failed to send reset code. Please try again later"
                )
            );
        }
    };

    return (
        <section className={s.reset}>
            <form
                onSubmit={handleSubmit(handleResetPassword)}
                className={s.reset__form}
            >
                <h3 className={s.reset__title}>Reset password</h3>
                <label className="visuallyHidden" htmlFor="email">
                    email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={s.reset__input}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Enter a valid email",
                        },
                        /*  onChange: () => {
                                if (emailErrTxt) {
                                    dispatch(resetEmailError());
                                    clearErrors("email");
                                }
                            }, */
                    })}
                />
                {errors.email && (
                    <p className={s.reset__error}>{errors.email.message}</p>
                )}
                {/* {(errors?.email || emailErrTxt) && (
                        <p className={s.login__error}>
                            {errors.email?.message ||
                                emailErrTxt ||
                                "Please check the field"}
                        </p>
                    )} */}

                <button
                    className={s.reset__button}
                    type="submit"
                    disabled={!isValid}
                    // disabled={!isValid || isLoading}
                >
                    Send code
                </button>
            </form>
        </section>
    );
};

export default ResetPasswordPage;
