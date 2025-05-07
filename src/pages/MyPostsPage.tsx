import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMyPosts } from "../redux/post/postSlice";
import Posts from "../components/Posts";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import s from "./MyPostsPage.module.css";

const MyPostsPage = () => {
    const dispatch = useAppDispatch();
    const { myPosts, isFetchedMyPosts, isLoading } = useAppSelector(
        (state) => state.post
    );

    useEffect(() => {
        if (!isFetchedMyPosts) {
            dispatch(getMyPosts());
        }
    }, [dispatch, isFetchedMyPosts]);

    return (
        <div className={s.posts}>
            {isLoading && <Spinner />}
            {myPosts.length > 0 ? (
                <Posts title={"My posts"} posts={myPosts} isOwnerView={true} />
            ) : (
                <div className={s.noPosts}>
                    <p className={s.noPosts__text}>
                        You don't have any posts yet
                    </p>
                    <Link to="/create-post" className={s.noPosts__link}>
                        Create Post
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyPostsPage;
