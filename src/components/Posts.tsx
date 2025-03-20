import Post from "./Post";
import s from "./Posts.module.css";

const Posts = () => {
    return (
        <section className={`${s.posts} container `}>
            <div className={s.posts__body}>
                <h3 className={s.posts__title}>Posts:</h3>
                <div className={s.posts__container}>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
        </section>
    );
};

export default Posts;
