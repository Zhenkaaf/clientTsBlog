import { useEffect, useState } from "react";

type UsePersistentTimerResult = {
    timeLeft: number;
    isTimerActive: boolean;
    startTimer: () => void;
    clearTimer: () => void;
};

export function usePersistentTimer(): UsePersistentTimerResult {
    const calculateTimeLeft = () => {
        const savedTimeStampStr = localStorage.getItem("final_time_of_timer");
        if (!savedTimeStampStr) return 0;

        const diff = Math.round(
            (Number(savedTimeStampStr) - Date.now()) / 1000
        );
        const secondsLeft = Math.max(0, diff);
        return secondsLeft;
    };

    const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft);

    useEffect(() => {
        if (timeLeft === 0) return;

        const interval = setInterval(() => {
            const secondsLeft = calculateTimeLeft();
            setTimeLeft(secondsLeft);

            if (secondsLeft === 0) {
                clearInterval(interval);
                localStorage.removeItem("final_time_of_timer");
                localStorage.removeItem("reset_email");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const startTimer = () => {
        const finalTime = Date.now() + 180 * 1000;
        localStorage.setItem("final_time_of_timer", finalTime.toString());
        setTimeLeft(180);
    };

    const clearTimer = () => {
        localStorage.removeItem("final_time_of_timer");
        localStorage.removeItem("reset_email");
        setTimeLeft(0);
    };

    return {
        timeLeft,
        isTimerActive: timeLeft > 0,
        startTimer,
        clearTimer,
    };
}
