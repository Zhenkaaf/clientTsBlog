import { useNavigate, useParams } from "react-router-dom";
import {
    clearCurrentPost,
    getPostById,
    updatePostById,
} from "../redux/post/postSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useRef, useState } from "react";
import s from "./CreatePostPage.module.css";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import MDEditor from "@uiw/react-md-editor";
import {
    bold,
    italic,
    strikethrough,
    link,
} from "@uiw/react-md-editor/commands";
import toast from "react-hot-toast";

interface IFormInputs {
    title: string;
    text: string;
}
const EditPostPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const post = useAppSelector((state) => state.post.currentPost);
    const isLoading = useAppSelector((state) => state.post.isLoading);
    const [img, setImg] = useState<File | null>(null);
    const [crntImgURL, setCrntImgURL] = useState<string | null>(null);
    const [newImgURL, setNewImgURL] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [imageChanged, setImageChanged] = useState(false);
    const currentData = useRef<{
        title: string;
        text: string;
    }>({
        title: "",
        text: "",
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<IFormInputs>({ mode: "onChange" });
    const watchedTitle = watch("title");
    const watchedText = watch("text");

    useEffect(() => {
        register("text", {
            required: "This field is required",
            minLength: {
                value: 10,
                message: "Minimum 10 characters required",
            },
        });
    }, [register]);

    useEffect(() => {
        const getPost = async () => {
            if (id) {
                await dispatch(getPostById(id));
            }
        };
        getPost();
        return () => {
            dispatch(clearCurrentPost());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (post) {
            console.log("post received");
            setValue("title", post.title);
            setValue("text", post.text);
            setCrntImgURL(post.imgUrl);
            currentData.current = {
                title: post.title,
                text: post.text,
            };
        }
    }, [post, setValue]);

    //Перед сравнением нужно "нормализовать" строки, чтобы не было зависимости от того, откуда пришёл текст — с Windows, Linux или браузера.
    const normalizeNewlines = (str: string) =>
        str.replace(/\r\n/g, "\n").trim();
    const hasChanges =
        normalizeNewlines(watchedTitle || "") !==
            normalizeNewlines(currentData.current.title) ||
        normalizeNewlines(watchedText || "") !==
            normalizeNewlines(currentData.current.text);

    const navigate = useNavigate();

    const handleChoosePhotoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (!file) {
            setImg(null);
            setNewImgURL(null);
            setFileError(null);
            setImageChanged(false);
            return;
        }
        const allowedFormats = ["image/jpeg", "image/png"];
        if (!allowedFormats.includes(file.type)) {
            setFileError("Please select a JPG or PNG image.");
            return;
        }
        const maxSize = 8 * 1024 * 1024;
        if (file.size > maxSize) {
            setFileError("The file size must be less than 8MB.");
            return;
        }

        setFileError(null);
        setImg(file);
        setNewImgURL(URL.createObjectURL(file));
        setImageChanged(true);
    };

    const submitFormData = async (data: IFormInputs) => {
        try {
            if (id) {
                const formData = new FormData();
                if (imageChanged && img) {
                    formData.append("image", img);
                }
                formData.append("title", data.title);
                formData.append("text", data.text);
                await dispatch(
                    updatePostById({ postId: id, formData })
                ).unwrap();
                setCrntImgURL(null);
                setNewImgURL(null);
                setImg(null);
                reset();
                toast.success("Post successfully updated!");
                navigate("/my-posts");
            } else {
                throw new Error("Post ID not found");
            }
        } catch (err: any) {
            console.error("Error:", err);
            toast.error(err);
        }
    };

    return (
        <section className={s.createPost}>
            {isLoading && <Spinner />}

            <form
                onSubmit={handleSubmit(submitFormData)}
                className={s.createPost__form}
            >
                <h3 className={s.createPost__title}>Edit post</h3>
                {newImgURL ? (
                    <img
                        className={s.createPost__img}
                        src={newImgURL}
                        alt="new image"
                    />
                ) : crntImgURL ? (
                    <img
                        className={s.createPost__img}
                        src={crntImgURL}
                        alt="current image"
                    />
                ) : null}
                <label
                    className={`${s.createPost__choosePhoto} ${
                        newImgURL ? s.createPost__choosePhoto_disabled : ""
                    }`}
                    htmlFor="choosePhoto"
                >
                    Choose new photo (Max 8MB, JPG/PNG)
                </label>
                <input
                    className="visuallyHidden"
                    type="file"
                    id="choosePhoto"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleChoosePhotoChange}
                />
                {fileError && (
                    <p className={s.createPost__error}>{fileError}</p>
                )}
                <label className="visuallyHidden" htmlFor="title">
                    title
                </label>
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    className={s.createPost__input}
                    {...register("title", {
                        required: "This field is required",
                        minLength: {
                            value: 3,
                            message: "Minimum 3 characters required",
                        },
                        maxLength: {
                            value: 120,
                            message: "Maximum 120 characters allowed",
                        },
                    })}
                    onBlur={(e) => {
                        const trimmed = e.target.value.trim();
                        setValue("title", trimmed, {
                            shouldValidate: true,
                        });
                    }}
                />

                {errors?.title && (
                    <p className={s.createPost__error}>
                        {errors.title?.message || "Please check the field"}
                    </p>
                )}

                <label className="visuallyHidden" htmlFor="text">
                    text
                </label>

                <MDEditor
                    className={s.createPost__customEditor}
                    value={watch("text")}
                    onChange={(value = "") => {
                        setValue("text", value, { shouldValidate: true });
                    }}
                    commands={[bold, italic, strikethrough, link]}
                    extraCommands={[]}
                    preview="edit"
                    visibleDragbar={false}
                    textareaProps={
                        {
                            placeholder: "Write your story",
                            onBlur: (
                                e: React.FocusEvent<HTMLTextAreaElement>
                            ) => {
                                const trimmed = e.target.value.trim();
                                setValue("text", trimmed, {
                                    shouldValidate: true,
                                });
                            },
                        } as any
                    }
                />

                {errors?.text && (
                    <p className={s.createPost__error}>
                        {errors.text?.message || "Please check the field"}
                    </p>
                )}

                <button
                    className={s.createPost__button}
                    type="submit"
                    title={
                        !hasChanges && !imageChanged
                            ? "Make at least one change to proceed"
                            : !isValid
                            ? "Please fill in all required fields"
                            : ""
                    }
                    disabled={(!isValid || !hasChanges) && !imageChanged}
                >
                    Save changes
                </button>
            </form>
        </section>
    );
};

export default EditPostPage;
