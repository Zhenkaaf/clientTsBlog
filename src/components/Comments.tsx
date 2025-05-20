import { useEffect, useRef, useState } from "react";
import s from "./Comments.module.css";
import { useAppSelector } from "../redux/hooks";

const Comments = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(false);
    const errorTimerRef = useRef<number | undefined>(undefined);

    const addComment = () => {
        if (comment.trim() === "") {
            setError(true);
            clearTimeout(errorTimerRef.current);
            errorTimerRef.current = setTimeout(() => {
                setError(false);
            }, 2000);
            return;
        }

        // Здесь отправка комментария
        console.log("Комментарий отправлен:", comment);
        setComment("");
    };

    useEffect(() => {
        return () => {
            clearTimeout(errorTimerRef.current);
        };
    }, []);

    return (
        <section className={s.comments}>
            <div className={s.comments__body}>
                <h3 className={s.comments__title}>Comments 189</h3>
                {user && (
                    <div className={s.commentCreate}>
                        <div className={s.commentCreate__avatar}>
                            <span>{user.email.charAt(0).toUpperCase()}</span>
                        </div>

                        <div className={s.commentCreate__form}>
                            <textarea
                                className={s.commentCreate__textarea}
                                placeholder="Write a comment"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button
                                className={s.commentCreate__btn}
                                onClick={addComment}
                            >
                                Add comment
                            </button>
                            {error && (
                                <div className={s.commentCreate__error}>
                                    Comment can't be empty
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className={s.commentList}>
                    <div className={s.comment}>
                        <div className={s.comment__avatarBox}>
                            <span className={s.comment__avatar}>
                                {user?.email.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className={s.comment__content}>
                            <div className={s.comment__authorEmail}>
                                {user?.email.split("@")[0] + " :"}
                            </div>
                            <div className={s.comment__text}>
                                This is a great post! Thanks for sharing. This
                                is a great post! Thanks for sharing. This is a
                                great post! Thanks for sharing. This is a great
                                post! Thanks for sharing. This is a great post!
                                Thanks for sharing. This is a great post! Thanks
                                for sharing.
                            </div>
                        </div>
                    </div>
                    <div className={s.comment}>
                        <div className={s.comment__avatarBox}>
                            <span className={s.comment__avatar}>
                                {user?.email.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className={s.comment__content}>
                            <div className={s.comment__authorEmail}>
                                {user?.email.split("@")[0] + " :"}
                            </div>
                            <div className={s.comment__text}>
                                This is a great post! Thanks for sharing. This
                                is a great post! Thanks for sharing. This is a
                                great post! Thanks for sharing. This is a great
                                post! Thanks for sharing. This is a great post!
                                Thanks for sharing. This is a great post! Thanks
                                for sharing.
                            </div>
                        </div>
                    </div>
                    <div className={s.comment}>
                        <div className={s.comment__avatarBox}>
                            <span className={s.comment__avatar}>
                                {user?.email.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className={s.comment__content}>
                            <div className={s.comment__authorEmail}>
                                {user?.email.split("@")[0] + " :"}
                            </div>
                            <div className={s.comment__text}>
                                This is a great post! Thanks for sharing. This
                                is a great post! Thanks for sharing. This is a
                                great post! Thanks for sharing. This is a great
                                post! Thanks for sharing. This is a great post!
                                Thanks for sharing. This is a great post! Thanks
                                for sharing.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Comments;
