import s from "./VerifyCodePage.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePersistentTimer } from "../hooks.ts/usePersistentTimer";
import { verifyCode } from "../redux/resetPassword/resetPasswordSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { getErrorMessage } from "../utils/getErrorMessage";

type VerifyCodeFormValues = {
    code: string;
};

const VerifyCodePage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.resetPassword.isLoading);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const queryEmail = query.get("email");
    const email = location.state?.email || queryEmail || "";
    const [serverError, setServerError] = useState<string | null>(null);
    const { timeLeft, isTimerActive, clearTimer } = usePersistentTimer();

    useEffect(() => {
        if (!email?.trim()) {
            navigate("/reset-password");
        }
    }, [email, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<VerifyCodeFormValues>({ mode: "onBlur" });

    const submitCode = async (formData: VerifyCodeFormValues) => {
        const code = formData.code;
        try {
            const data = await dispatch(verifyCode({ code, email })).unwrap();
            toast.success(data.message);
            clearTimer();
            sessionStorage.setItem("resetToken", data.resetToken);
            navigate("/new-password");
        } catch (err) {
            console.error("Verify code request error:", err);
            const message = getErrorMessage(
                err,
                "Something went wrong during code verification"
            );
            setServerError(message);
            toast.error(message);
        }
    };

    return (
        <section className={s.verify}>
            {isLoading && <Spinner />}
            <form
                onSubmit={handleSubmit(submitCode)}
                className={s.verify__form}
            >
                <h3 className={s.verify__title}>Verify code</h3>
                <div className={s.verify__desc}>
                    <p>A verification code has been sent to your email:</p>
                    <p>{email}</p>
                    <p>If you don’t see it, please check your Spam folder</p>
                </div>

                <label className="visuallyHidden" htmlFor="code">
                    code
                </label>
                <input
                    type="text"
                    id="code"
                    autoComplete="one-time-code"
                    placeholder="Enter code"
                    inputMode="numeric"
                    maxLength={6}
                    className={s.verify__input}
                    {...register("code", {
                        required: "Code is required",
                        pattern: {
                            value: /^\d{6}$/,
                            message: "Code must be 6 digits",
                        },
                        onChange: () => {
                            if (serverError) {
                                setServerError(null);
                            }
                        },
                    })}
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                            /[^0-9]/g,
                            ""
                        );
                    }}
                />
                {(errors.code || serverError) && (
                    <p className={s.verify__error}>
                        {errors.code?.message || serverError}
                    </p>
                )}

                <button
                    className={s.verify__button}
                    type="submit"
                    disabled={!isValid || !isTimerActive || isLoading}
                >
                    Verify code
                </button>
                {isTimerActive ? (
                    <div>You have {timeLeft} seconds to enter the code</div>
                ) : (
                    <>
                        {" "}
                        <p className={s.verify__error}>
                            The verification code has expired
                        </p>
                        <div className={s.verify__footer}>
                            <p>Try again</p>
                            <Link
                                to="/reset-password"
                                className={`${s.verify__link} link`}
                            >
                                Reset password
                            </Link>
                        </div>
                    </>
                )}
            </form>
        </section>
    );
};

export default VerifyCodePage;
