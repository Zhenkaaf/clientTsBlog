import { useEffect } from "react";
import PopularPosts from "../components/PopularPosts";
import Posts from "../components/Posts";
import TypingText from "../components/TypingText";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getPosts } from "../redux/post/postSlice";
import Spinner from "../components/Spinner";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.post.isLoading);
    const posts = useAppSelector((state) => state.post.posts);
    const popularPosts = useAppSelector((state) => state.post.popularPosts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div>
            {isLoading && <Spinner />}
            <TypingText
                texts={[
                    "What makes your car special? Share your story!",
                    "Share your ownership experience: pros, cons, and unexpected discoveries!",
                    "Tell us why this car became your choice!",
                    "It's a great day to write a post about your car!",
                ]}
                speed={50}
                pause={3000}
            />
            {popularPosts.length > 0 && (
                <PopularPosts popularPosts={popularPosts} />
            )}
            <Posts title={"Posts"} posts={posts} isOwnerView={false} />
        </div>
    );
};

export default HomePage;
