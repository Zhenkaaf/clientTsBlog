import { Link } from "react-router-dom";
import s from "./Posts.module.css";
import { MessageSquare, Eye } from "lucide-react";

const Posts = () => {
    return (
        <section className={`${s.posts} container `}>
            <div className={s.posts__body}>
                <h3 className={s.posts__title}>Posts:</h3>
                <div className={s.posts__container}>
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
                                Is it the beginning of the end for drive-thru I
                                it the beginning of the end for drive-thrus
                            </h4>
                            <div className={s.post__desc}>
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                            </div>
                        </div>
                    </Link>
                    <Link className={`${s.post} link`} to="#">
                        <div className={s.post__imageWrapper}>
                            {" "}
                            <img
                                src="https://i.pinimg.com/736x/2b/00/18/2b00186d6f2504242e15db73f50eee84.jpg"
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
                                Is it the beginning of the end for drive-thru I
                                it the beginning of the end for drive-thrus
                            </h4>
                            <div className={s.post__desc}>
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                            </div>
                        </div>
                    </Link>
                    <Link className={`${s.post} link`} to="#">
                        <div className={s.post__imageWrapper}>
                            {" "}
                            <img
                                src="https://bipbap.ru/wp-content/uploads/2017/04/3444df58d1da267e13bdf666a946a4f3ffa9b659.jpg"
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
                                Is it the beginning of the end for drive-thru I
                                it the beginning of the end for drive-thrus
                            </h4>
                            <div className={s.post__desc}>
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                            </div>
                        </div>
                    </Link>
                    <Link className={`${s.post} link`} to="#">
                        <div className={s.post__imageWrapper}>
                            {" "}
                            <img
                                src="data:image/png;base64,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"
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
                                Is it the beginning of the end for drive-thru I
                                it the beginning of the end for drive-thrus
                            </h4>
                            <div className={s.post__desc}>
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                            </div>
                        </div>
                    </Link>
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
                                Is it the beginning of the end for drive-thru I
                                it the beginning of the end for drive-thrus
                            </h4>
                            <div className={s.post__desc}>
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                                Is it the beginning of the end for drive-thrus
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Posts;
