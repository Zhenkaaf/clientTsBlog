import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { clearCurrentPost, getPostById } from "../redux/post/postSlice";
import Spinner from "../components/Spinner";
import s from "./PostPage.module.css";
import { formatDate } from "../utils/formatDate";
import MDEditor from "@uiw/react-md-editor";
import rehypeRaw from "rehype-raw";
import Comments from "../components/Comments";

const PostPage = () => {
    const { id: postId } = useParams();
    const dispatch = useAppDispatch();
    const { currentPost: post, isLoading } = useAppSelector(
        (state) => state.post
    );
    console.log(post);

    useEffect(() => {
        if (postId) {
            dispatch(getPostById(postId));
        }
        return () => {
            dispatch(clearCurrentPost());
        };
    }, [dispatch, postId]);

    return (
        <>
            <div className={s.post}>
                {isLoading && <Spinner />}
                {post && (
                    <div className={s.post__body}>
                        <div className={s.post__imageWrapper}>
                            {" "}
                            <img
                                src={post.imgUrl}
                                alt=""
                                className={s.post__image}
                            />
                        </div>
                        <div className={s.post__info}>
                            <div className={s.post__details}>
                                <div className={s.post__author}>
                                    Author:{" "}
                                    {post.author.email
                                        .split("@")[0]
                                        .slice(0, 24)
                                        .charAt(0)
                                        .toUpperCase() +
                                        post.author.email
                                            .split("@")[0]
                                            .slice(1, 24)}
                                </div>

                                <time dateTime={post.createdAt}>
                                    {formatDate(post.createdAt)}
                                </time>
                            </div>
                            <h4 className={s.post__title}>{post.title}</h4>
                            <MDEditor.Markdown
                                source={post.text}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    a: (props) => (
                                        <a
                                            {...props}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    ),
                                }}
                                className={s.post__desc}
                            />
                        </div>
                    </div>
                )}
            </div>
            {post && <Comments postId={postId} />}
        </>
    );
};

export default PostPage;
