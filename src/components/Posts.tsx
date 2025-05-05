import Post from "./Post";
import s from "./Posts.module.css";

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

interface IPostsProps {
    title: string;
    posts: IPostResponse[];
}

const Posts = ({ title, posts }: IPostsProps) => {
    return (
        <section className={`${s.posts} container `}>
            <div className={s.posts__body}>
                <h3 className={s.posts__title}>{title}:</h3>
                <div className={s.posts__container}>
                    {posts.map((post) => (
                        <Post post={post} key={post._id} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Posts;
