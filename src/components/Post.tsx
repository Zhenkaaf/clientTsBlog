import s from "./Post.module.css";
import { Link } from "react-router-dom";
import { MessageSquare, Eye } from "lucide-react";

const Post = () => {
    return (
        <Link className={`${s.post} link`} to="#">
            <div className={s.post__imageWrapper}>
                {" "}
                <img
                    src="https://ld-wp73.template-help.com/wordpress/prod_25266/v2/wp-content/uploads/2019/09/14-1280x640.jpg"
                    alt=""
                    className={s.post__image}
                />
            </div>
            <div className={s.post__info}>
                <div className={s.post__details}>
                    <div className={s.post__stats}>
                        <div className={s.post__views}>
                            <Eye size={14} /> 12
                        </div>
                        <div className={s.post__comments}>
                            <MessageSquare size={14} /> 45
                        </div>
                    </div>
                    <time dateTime="2025-03-12">2025-03-12</time>
                </div>
                <h4 className={s.post__title}>
                    Is it the beginning of the end for drive-thru I it the
                    beginning of the end for drive-thrus
                </h4>
                <div className={s.post__desc}>
                    Is it the beginning of the end for drive-thrus Is it the
                    beginning of the end for drive-thrus Is it the beginning of
                    the end for drive-thrus Is it the beginning of the end for
                    drive-thrus
                </div>
            </div>
        </Link>
    );
};

export default Post;
