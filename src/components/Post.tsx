import s from "./Post.module.css";
import { Link } from "react-router-dom";
import { MessageSquare, Eye } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import removeMarkdown from "remove-markdown";

interface IPostResponse {
    _id: string;
    title: string;
    text: string;
    imgUrl: string;
    views: number;
    authorId: string;
    comments: unknown[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface IPostProps {
    post: IPostResponse;
}

const Post = ({ post }: IPostProps) => {
    /*  console.log(post); */
    const [imgLoaded, setImgLoaded] = useState(false);
    return (
        <Link className={`${s.post} link`} to={`/post/${post._id}`}>
            <div className={s.post__imageWrapper}>
                {" "}
                <img
                    src={post.imgUrl}
                    alt=""
                    /*  className={s.post__image} */ className={`${
                        s.post__image
                    } ${imgLoaded ? s.loaded : s.loading}`}
                    onLoad={() => setImgLoaded(true)}
                />
            </div>
            <div className={s.post__info}>
                <div className={s.post__details}>
                    <div className={s.post__stats}>
                        <div className={s.post__views}>
                            <Eye size={14} /> {post.views}
                        </div>
                        <div className={s.post__comments}>
                            <MessageSquare size={14} /> {post.comments.length}
                        </div>
                    </div>
                    <time dateTime={post.createdAt}>
                        {formatDate(post.createdAt)}
                    </time>
                </div>
                <h4 className={s.post__title}>{post.title}</h4>
                <div className={s.post__desc}> {removeMarkdown(post.text)}</div>
            </div>
        </Link>
    );
};

export default Post;
