import { useEffect, useRef, useState } from "react";
import PopularPosts from "../components/PopularPosts";
import Posts from "../components/Posts";
import TypingText from "../components/TypingText";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getPosts } from "../redux/post/postSlice";
import Spinner from "../components/Spinner";
import CustomPagination from "../components/CustomPagination";
import { useLocation } from "react-router-dom";

const HomePage = () => {
    const { search } = useLocation();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.post.isLoading);
    const posts = useAppSelector((state) => state.post.posts);
    const postErrTxt = useAppSelector((state) => state.post.postErrTxt);
    const popularPosts = useAppSelector((state) => state.post.popularPosts);
    const pageQty = useAppSelector((state) => state.post.pageQty);
    const postsRef = useRef<HTMLDivElement>(null);
    const [pageNumber, setPageNumber] = useState(
        parseInt(search?.split("=")[1]) || 1
    );

    useEffect(() => {
        const params = new URLSearchParams(search);
        const pageNumberFromUrl = parseInt(params.get("page") || "1");
        setPageNumber(pageNumberFromUrl);
    }, [search]);

    useEffect(() => {
        dispatch(getPosts({ pageNumber }));
        const isMobile = window.innerWidth <= 768;
        if (pageNumber === 1) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (postsRef.current) {
            const offsetTop =
                postsRef.current.getBoundingClientRect().top + window.scrollY;
            const offset = isMobile ? 60 : 0;
            window.scrollTo({ top: offsetTop - offset, behavior: "smooth" });
        }
    }, [dispatch, pageNumber]);

    if (postErrTxt) {
        return <div>{postErrTxt}</div>;
    }

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
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                    />
                </>
            )}
        </div>
    );
};

export default HomePage;
