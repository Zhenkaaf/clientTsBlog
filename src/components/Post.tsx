import s from "./Post.module.css";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Eye, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import removeMarkdown from "remove-markdown";
import { delPostById } from "../redux/post/postSlice";
import { useAppDispatch } from "../redux/hooks";
import toast from "react-hot-toast";
import Modal from "./Modal";

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
    isOwnerView: boolean;
}

const Post = ({ post, isOwnerView }: IPostProps) => {
    /*  console.log(post); */
    const [imgLoaded, setImgLoaded] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const deletePost = async () => {
        setIsLoading(true);
        try {
            const data = await dispatch(delPostById(post._id)).unwrap();
            toast.success(data.message);
        } catch (err: any) {
            console.error("Error:", err);
            toast.error(err);
        } finally {
            setIsLoading(false);
            setIsDeleteModalOpen(false);
        }
    };
    return (
        <>
            <Link className={`${s.post} link`} to={`/post/${post._id}`}>
                {isOwnerView && (
                    <div className={s.post__actions}>
                        {/* <Pencil className={s.post__actionEdit} /> */}

                        <Pencil
                            className={s.post__actionEdit}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate(`/edit/${post._id}`);
                            }}
                        />

                        <Trash2
                            className={s.post__actionDelete}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsDeleteModalOpen(true);
                            }}
                        />
                    </div>
                )}
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
                                <MessageSquare size={14} />{" "}
                                {post.comments.length}
                            </div>
                        </div>
                        <time dateTime={post.createdAt}>
                            {formatDate(post.createdAt)}
                        </time>
                    </div>
                    <h4 className={s.post__title}>{post.title}</h4>
                    <div className={s.post__desc}>
                        {" "}
                        {removeMarkdown(post.text)}
                    </div>
                </div>
            </Link>
            {isDeleteModalOpen && (
                <Modal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={deletePost}
                    title="Delete Post"
                    confirmText="Yes, delete"
                    cancelText="Cancel"
                    isLoading={isLoading}
                >
                    Are you sure you want to delete this post?
                </Modal>
            )}
        </>
    );
};

export default Post;
