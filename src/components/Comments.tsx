import { useEffect, useRef, useState } from "react";
import s from "./Comments.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    clearComments,
    createComment,
    getComments,
} from "../redux/comment/commentSlice";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface ICommentsProps {
    postId: string | undefined;
}
const Comments = ({ postId }: ICommentsProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const { comments, isLoading } = useAppSelector((state) => state.comment);
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState(false);
    const errorTimerRef = useRef<number | undefined>(undefined);
    const dispatch = useAppDispatch();

    const addComment = async () => {
        if (commentText.trim() === "") {
            setError(true);
            clearTimeout(errorTimerRef.current);
            errorTimerRef.current = setTimeout(() => {
                setError(false);
            }, 2000);
            return;
        }
        if (postId) {
            try {
                const res = await dispatch(
                    createComment({ commentText, postId })
                ).unwrap();
                setCommentText("");
                console.log(res);
                toast.success(`${res.message}`);
                dispatch(getComments(postId));
            } catch (err: any) {
                console.error("Failed to add comment", err);
                toast.error(err);
            }
        }
    };

    const formatEmail = (email: string) => {
        const emailFirstPart = email.split("@")[0];
        const firstChar = emailFirstPart.slice(0, 1).toUpperCase();
        const restChars = emailFirstPart.slice(1, emailFirstPart.length);
        return firstChar + restChars + " :";
    };

    useEffect(() => {
        return () => {
            clearTimeout(errorTimerRef.current);
            dispatch(clearComments());
        };
    }, [dispatch]);

    useEffect(() => {
        if (postId) {
            dispatch(getComments(postId));
        }
    }, [dispatch, postId]);

    return (
        <section className={s.comments}>
            {isLoading && <Spinner />}
            <div className={s.comments__body}>
                <h3 className={s.comments__title}>
                    {comments.length || 0} Comments
                </h3>
                {!user && (
                    <p>
                        To leave a comment, please{" "}
                        <Link className={s.comments__link} to="/login">
                            Log in
                        </Link>
                    </p>
                )}
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
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
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
                {comments &&
                    comments.map((comment) => (
                        <div className={s.commentList} key={comment._id}>
                            <div className={s.comment}>
                                <div className={s.comment__avatarBox}>
                                    <span className={s.comment__avatar}>
                                        {comment.author.email
                                            .charAt(0)
                                            .toUpperCase()}
                                    </span>
                                </div>
                                <div className={s.comment__content}>
                                    <div className={s.comment__authorEmail}>
                                        {formatEmail(comment.author.email)}
                                    </div>
                                    <div className={s.comment__text}>
                                        {comment.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default Comments;
