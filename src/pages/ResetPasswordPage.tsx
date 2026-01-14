import s from "./ResetPasswordPage.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePersistentTimer } from "../hooks.ts/usePersistentTimer";
import { getErrorMessage } from "../utils/getErrorMessage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sendResetCode } from "../redux/resetPassword/resetPasswordSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

type ResetPasswordFormValues = {
    email: string;
};

const ResetPasswordPage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.resetPassword.isLoading);
    const { isTimerActive, startTimer, clearTimer } = usePersistentTimer();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ResetPasswordFormValues>({ mode: "onBlur" });

    const handleResetPassword = async (formData: ResetPasswordFormValues) => {
        const savedEmail = localStorage.getItem("reset_email");

        if (savedEmail && savedEmail !== formData.email) {
            clearTimer();
            localStorage.removeItem("reset_email");
        }
        if (savedEmail === formData.email && isTimerActive) {
            toast.success(
                "A password reset code has already been sent to your email."
            );
            navigate("/verify-code", { state: { email: formData.email } });
            return;
        }

        try {
            const data = await dispatch(
                sendResetCode({ email: formData.email })
            ).unwrap();
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
            {isLoading && <Spinner />}
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
                    })}
                />
                {errors.email && (
                    <p className={s.reset__error}>{errors.email.message}</p>
                )}

                <button
                    className={s.reset__button}
                    type="submit"
                    disabled={!isValid || isLoading}
                >
                    Send code
                </button>
            </form>
        </section>
    );
};

export default ResetPasswordPage;
