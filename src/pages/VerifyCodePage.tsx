import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import s from "./VerifyCodePage.module.css";
import { useNavigate } from "react-router-dom";
import { usePersistentTimer } from "../hooks.ts/usePersistentTimer";

type VerifyCodeFormValues = {
    code: string;
};

const VerifyCodePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const queryEmail = query.get("email");
    const email = location.state?.email || queryEmail || "";
    const [serverError, setServerError] = useState<string | null>(null);

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

    const { timeLeft, isTimerActive, clearTimer } = usePersistentTimer();

    /*     const [timeLeft, setTimeLeft] = useState<number>(() => {
        // Если таймер уже закончился — сразу 0
        if (localStorage.getItem("is_time_out")) {
            return 0;
        }
        // Получаем сохранённое время окончания таймера
        const savedFinalTimeStr = localStorage.getItem("final_time_of_timer");

        if (savedFinalTimeStr) {
            // Вычисляем сколько секунд осталось до конца таймера
            const finalTime = Number(savedFinalTimeStr); // строка → число (миллисекунды)
            const currentTimeStamp = Date.now(); // текущее время в мс
            const diffInMs = finalTime - currentTimeStamp; // разница в миллисекундах
            const diffInSec = Math.round(diffInMs / 1000); // округляем до секунд
            return Math.max(0, diffInSec); // если ушли "в минус", вернём 0
        } else {
            // Таймер ещё не запускался — создаём новое конечное время
            const finalTimeStamp = Date.now() + TOTAL_TIME * 1000;
            console.log("final time", finalTimeStamp);
            // Сохраняем его в localStorage, чтобы при перезагрузке продолжить таймер
            localStorage.setItem(
                "final_time_of_timer",
                finalTimeStamp.toString()
            );
            // Таймер ещё не запускался — возвращаем начальное значение
            return TOTAL_TIME;
        }
    });

    useEffect(() => {
        if (timeLeft === 0 || localStorage.getItem("is_time_out")) return;
        const savedFinalTimeStr = localStorage.getItem("final_time_of_timer");
        let finalTimeStamp: number;

        if (!savedFinalTimeStr) {
            finalTimeStamp = Date.now() + TOTAL_TIME * 1000;
        } else {
            finalTimeStamp = Number(savedFinalTimeStr);
        }

        const interval = setInterval(() => {
            const secondsLeft = Math.max(
                0,
                Math.round((finalTimeStamp - Date.now()) / 1000)
            );
            setTimeLeft(secondsLeft);

            if (secondsLeft <= 0) {
                clearInterval(interval);
                localStorage.removeItem("final_time_of_timer");
                localStorage.setItem("is_time_out", "true");
            }
        }, 1000);

        return () => {
            console.log("cleaner");
            clearInterval(interval);
        };
    }, []); */

    const submitCode = async (formData: VerifyCodeFormValues) => {
        try {
            const response = await fetch(
                /*  "http://localhost:5000/api/auth/verify-code", */
                "https://serverexpresstsblog.onrender.com/api/auth/verify-code",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: formData.code, email }),
                }
            );
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                setServerError(
                    data.message ||
                        "Something went wrong during code verification"
                );
                throw new Error(
                    data.message ||
                        "Something went wrong during code verification"
                );
            }

            /*  return res.status(200).json({
            message: "Code verified successfully",
            resetToken,
        }); */
            // Сохраняем токен в памяти
            //setResetToken(data.resetToken);
            toast.success(data.message);
            clearTimer();
            sessionStorage.setItem("resetToken", data.resetToken);
            navigate("/new-password");
        } catch (err) {
            console.error("Verify code request error:", err);
            toast.error("Invalid or expired code");
        }
    };

    return (
        <section className={s.verify}>
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
                    disabled={!isValid || !isTimerActive}
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
