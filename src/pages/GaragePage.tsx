import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createPost } from "../redux/post/postSlice";

const GaragePage = () => {
    const [img, setImg] = useState<File | null>(null);
    const [imgURL, setImgURL] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const postErrTxt = useAppSelector((state) => state.post.postErrTxt);
    if (postErrTxt) {
        console.error(postErrTxt);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0]); // Устанавливаем первый выбранный файл
            setImgURL(URL.createObjectURL(e.target.files[0]));
        } else {
            setImg(null); // Если файл не выбран, устанавливаем null
            setImgURL(null);
        }
    };

    const sendFile = async () => {
        try {
            if (img) {
                console.log("img OK", img);
                const formData = new FormData();
                formData.append("image", img);
                formData.append("title", "mytttile");
                formData.append("text", "andtext");
                console.log("FormData:", [...formData]);
                const post = await dispatch(createPost(formData)).unwrap();
                //const res = await myAxios.post("/post/create-post", formData);
                console.log("Ответ от сервера:", post);
                setAvatar(post.imgUrl);
            } else {
                console.log("No image selected");
            }
        } catch (err: any) {
            console.log("garage", err);
        }
    };

    return (
        <div>
            GaragePage
            <div>
                {avatar ? (
                    <img src={`${avatar}`} />
                ) : (
                    <img
                        src="https://ld-wp73.template-help.com/wordpress/prod_25266/v2/wp-content/uploads/2019/09/14-1280x640.jpg"
                        alt=""
                    />
                )}
            </div>
            <label htmlFor="addPhoto">addPhoto</label>
            <input
                className="visuallyHidden"
                type="file"
                id="addPhoto"
                onChange={handleFileChange}
            />
            <button onClick={sendFile}>open</button>
            {imgURL && (
                <img
                    src={imgURL}
                    alt="Selected"
                    style={{ width: "200px", height: "auto" }}
                />
            )}
        </div>
    );
};

export default GaragePage;
