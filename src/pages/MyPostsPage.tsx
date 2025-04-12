import { useEffect, useState } from "react";
import myAxios from "../api/axios";

interface IPost {
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

const MyPostsPage = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    useEffect(() => {
        setTimeout(() => {
            const fetchData = async () => {
                const res = await myAxios.get("/post/my-posts");
                console.log(res.data);
            };
            fetchData();
        }, 2000);
    }, []);
    return <div>MyPostsPage</div>;
};

export default MyPostsPage;
