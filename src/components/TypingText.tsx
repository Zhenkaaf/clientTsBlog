import s from "./TypingText.module.css";
import { useState, useEffect } from "react";

interface TypingTextProps {
    texts: string[];
    speed?: number;
    pause?: number;
}
const TypingText = ({ texts, speed = 50, pause = 3000 }: TypingTextProps) => {
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    // Мигание курсора
    useEffect(() => {
        if (charIndex < texts[textIndex].length) {
            setShowCursor(true);
        } else {
            const cursorTimeout = setTimeout(
                () => setShowCursor(false),
                pause / 12
            );
            return () => clearTimeout(cursorTimeout);
        }
    }, [charIndex, textIndex, texts, pause]);

    //Логика печати
    useEffect(() => {
        let timerId: number | undefined;
        if (isDeleting) {
            if (charIndex > 0) {
                timerId = setTimeout(
                    () => setCharIndex((prev) => prev - 1),
                    speed / 6
                );
            } else {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }
        } else {
            if (charIndex < texts[textIndex].length) {
                timerId = setTimeout(
                    () => setCharIndex((prev) => prev + 1),
                    speed
                );
            } else {
                timerId = setTimeout(() => setIsDeleting(true), pause);
            }
        }
        return () => clearTimeout(timerId);
    }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

    return (
        <section className={s.typing}>
            <div className={s.typing__body}>
                <span className={s.typing__text}>
                    Welcome to the AUTOVIBE blog!
                </span>{" "}
                {texts[textIndex].slice(0, charIndex)}
                {showCursor && "_"}
            </div>
        </section>
    );
};

export default TypingText;
