import s from "./PopularPosts.module.css";
import { Eye, MoveRight } from "lucide-react";
import { IPostResponse } from "../types";
import { Link } from "react-router-dom";

interface IPostsProps {
    popularPosts: IPostResponse[];
}

const PopularPosts = ({ popularPosts }: IPostsProps) => {
    return (
        <section className={s.popular}>
            <div className={s.popular__body}>
                <div className={`${s.popular__big} ${s.post}`}>
                    <div className={s.post__imageWrapper}>
                        <img
                            className={s.post__img}
                            src={popularPosts[0].imgUrl}
                            alt="Post Image"
                        />
                    </div>

                    <Link
                        className={`${s.post__details} link`}
                        to={`/post/${popularPosts[0]._id}`}
                    >
                        <div className={s.post__detailItem}>
                            <p>Popular post</p>
                            <span className={s.post__detailIcon}>
                                <Eye size={16} />
                            </span>
                            {popularPosts[0].views}
                        </div>
                        <div className={s.post__detailItem}>
                            <p>Read</p>
                            <span className={s.post__detailIcon}>
                                <MoveRight />
                            </span>
                        </div>
                    </Link>
                </div>

                <div className={`${s.popular__middle} ${s.post}`}>
                    <div className={s.post__imageWrapper}>
                        <img
                            className={s.post__img}
                            src={popularPosts[1].imgUrl}
                            alt="Post Image"
                        />
                    </div>
                    <Link
                        className={`${s.post__details} link`}
                        to={`/post/${popularPosts[1]._id}`}
                    >
                        <div className={s.post__detailItem}>
                            <p>Popular post</p>
                            <span className={s.post__detailIcon}>
                                <Eye size={16} />
                            </span>
                            {popularPosts[1].views}
                        </div>
                        <div className={s.post__detailItem}>
                            <p>Read</p>
                            <span className={s.post__detailIcon}>
                                <MoveRight />
                            </span>
                        </div>
                    </Link>
                </div>

                <div className={`${s.popular__small1} ${s.post}`}>
                    <div className={s.post__imageWrapper}>
                        <img
                            className={s.post__img}
                            src={popularPosts[2].imgUrl}
                            alt="Post Image"
                        />
                    </div>
                    <Link
                        className={`${s.post__details} link`}
                        to={`/post/${popularPosts[2]._id}`}
                    >
                        <div className={s.post__detailItem}>
                            <p>Popular post</p>
                            <span className={s.post__detailIcon}>
                                <Eye size={16} />
                            </span>
                            {popularPosts[2].views}
                        </div>
                        <div className={s.post__detailItem}>
                            <p>Read</p>
                            <span className={s.post__detailIcon}>
                                <MoveRight />
                            </span>
                        </div>
                    </Link>
                </div>

                <div className={`${s.popular__small2} ${s.post}`}>
                    <div className={s.post__imageWrapper}>
                        <img
                            className={s.post__img}
                            src={popularPosts[3].imgUrl}
                            alt="Post Image"
                        />
                    </div>
                    <Link
                        className={`${s.post__details} link`}
                        to={`/post/${popularPosts[3]._id}`}
                    >
                        <div className={s.post__detailItem}>
                            <p>Popular post</p>
                            <span className={s.post__detailIcon}>
                                <Eye size={16} />
                            </span>
                            {popularPosts[3].views}
                        </div>
                        <div className={s.post__detailItem}>
                            <p>Read</p>
                            <span className={s.post__detailIcon}>
                                <MoveRight />
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularPosts;
