import { useEffect, useRef, useState } from "react";
import PopularPosts from "../components/PopularPosts";
import Posts from "../components/Posts";
import TypingText from "../components/TypingText";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getPosts } from "../redux/post/postSlice";
import Spinner from "../components/Spinner";
import CustomPagination from "../components/CustomPagination";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.post.isLoading);
    const posts = useAppSelector((state) => state.post.posts);
    const popularPosts = useAppSelector((state) => state.post.popularPosts);
    const pageQty = useAppSelector((state) => state.post.pageQty);
    const [page, setPage] = useState(1);
    const postsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(getPosts({ page }));
        postsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [dispatch, page]);

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
            {posts.length > 0 && (
                <>
                    <div ref={postsRef}>
                        <Posts
                            title={"Posts"}
                            posts={posts}
                            isOwnerView={false}
                        />
                    </div>

                    <CustomPagination
                        pageQty={pageQty}
                        page={page}
                        setPage={setPage}
                    />
                </>
            )}
        </div>
    );
};

export default HomePage;
