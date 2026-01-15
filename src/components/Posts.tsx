import s from "./Posts.module.css";
import { IPostResponse } from "../types";
import Post from "./Post";

interface IPostsProps {
    title: string;
    posts: IPostResponse[];
    isOwnerView: boolean;
}

const Posts = ({ title, posts, isOwnerView }: IPostsProps) => {
    return (
        <section className={s.posts}>
            <div className={s.posts__body}>
                <h3 className={s.posts__title}>{title}:</h3>
                <div className={s.posts__container}>
                    {posts.map((post) => (
                        <Post
                            post={post}
                            key={post._id}
                            isOwnerView={isOwnerView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Posts;
