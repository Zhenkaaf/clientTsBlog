import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createPost } from "../redux/post/postSlice";
import s from "./CreatePostPage.module.css";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

interface IPostFormData {
    title: string;
    text: string;
}
interface IFormInputs {
    title: string;
    text: string;
}
const CreatePostPage = () => {
    const [img, setImg] = useState<File | null>(null);
    const [imgURL, setImgURL] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const postErrTxt = useAppSelector((state) => state.post.postErrTxt);
    if (postErrTxt) {
        console.error(postErrTxt);
    }

    const isLoading = useAppSelector((state) => state.post.isLoading);

    const handleChoosePhotoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        // Проверка на наличие файла
        if (!file) {
            setImg(null);
            setImgURL(null);
            setFileError(null);
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

        // Если файл прошёл все проверки
        setFileError(null);
        setImg(file);
        setImgURL(URL.createObjectURL(file));
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid },
    } = useForm<IFormInputs>({ mode: "onBlur" });

    const submitFormData = async (data: IFormInputs) => {
        try {
            if (img) {
                const formData = new FormData();
                formData.append("image", img);
                formData.append("title", data.title);
                formData.append("text", data.text);
                const post = await dispatch(createPost(formData)).unwrap();
                console.log("Ответ от сервера:", post);
                setImgURL(null);
                setImg(null);
                reset();
                toast.success("Post successfully created!");
            } else {
                throw new Error("No image selected");
            }
        } catch (err: any) {
            console.error("Error:", err);
            toast.error(err);
        }
    };

    return (
        <div className={s.createPost}>
            {isLoading && <Spinner />}
            <section className="container">
                <form
                    onSubmit={handleSubmit(submitFormData)}
                    className={s.createPost__form}
                >
                    <h3 className={s.createPost__title}>Create post</h3>
                    {imgURL && (
                        <img
                            className={s.createPost__img}
                            src={imgURL}
                            alt="image"
                        />
                    )}
                    <label
                        className={`${s.createPost__choosePhoto} ${
                            imgURL ? s.createPost__choosePhoto_disabled : ""
                        }`}
                        htmlFor="choosePhoto"
                    >
                        Choose photo (Max 8MB, JPG/PNG only)
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
                                value: 100,
                                message: "Maximum 100 characters allowed",
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
                    <textarea
                        id="text"
                        placeholder="Write your story"
                        className={s.createPost__textarea}
                        rows={8}
                        {...register("text", {
                            required: "This field is required",
                            minLength: {
                                value: 10,
                                message: "Minimum 10 characters required",
                            },
                        })}
                        onBlur={(e) => {
                            const trimmed = e.target.value.trim();
                            setValue("text", trimmed, {
                                shouldValidate: true,
                            });
                        }}
                    />
                    {errors?.text && (
                        <p className={s.createPost__error}>
                            {errors.text?.message || "Please check the field"}
                        </p>
                    )}

                    <button
                        className={s.createPost__button}
                        type="submit"
                        disabled={!isValid || !imgURL}
                        title={
                            !isValid
                                ? "Please fill in all required fields"
                                : !imgURL
                                ? "Please select an image"
                                : ""
                        }
                    >
                        Publish
                    </button>
                </form>
            </section>
        </div>
    );
};

export default CreatePostPage;
