import s from "./PopularPosts.module.css";

const PopularPosts = () => {
    return (
        <section className={`${s.popular} container`}>
            <div className={s.popular__wrapper}>
                <div className={`${s.popular__big} ${s.post}`}>
                    <div className={s.post__imageWrapper}>
                        <img
                            className={s.post__img}
                            src="https://i.pinimg.com/736x/7e/1f/52/7e1f5204cd468f3708679dbb2ce9e894.jpg"
                            alt="Post Image"
                        />
                    </div>

                    <div className={s.post__info}>
                        <h3 className={s.post__title}>Popular</h3>
                        <time className={s.post__date} dateTime="2025-03-12">
                            12 March 2025
                        </time>
                    </div>
                </div>

                <div className={`${s.popular__middle} ${s.post}`}>
                    <div className={s.post__imageWrapper}>
                        <img
                            className={s.post__img}
                            src="https://i.pinimg.com/736x/9c/3d/9f/9c3d9f577fc5ee701ca0eec6096d51fe.jpg"
                            alt="Post Image"
                        />
                    </div>
                    <div className={s.post__info}>
                        <h3 className={s.post__title}>Popular</h3>
                        <time className={s.post__date} dateTime="2025-03-12">
                            12 March 2025
                        </time>
                    </div>
                </div>

                <div className={`${s.popular__small1} ${s.post}`}>
                    <div className={s.post__imageWrapper}>
                        <img
                            className={s.post__img}
                            src="https://i.pinimg.com/736x/6a/36/d3/6a36d3dfcea2b870ab2f5d4513af87b8.jpg"
                            alt="Post Image"
                        />
                    </div>
                    <div className={s.post__info}>
                        <h3 className={s.post__title}>Popular</h3>
                        <time className={s.post__date} dateTime="2025-03-12">
                            12 March 2025
                        </time>
                    </div>
                </div>

                <div className={`${s.popular__small2} ${s.post}`}>
                    <div className={s.post__imageWrapper}>
                        <img
                            className={s.post__img}
                            src="https://i.pinimg.com/736x/39/2e/2b/392e2b35eb97313a59f50b5cf2eb020d.jpg"
                            alt="Post Image"
                        />
                    </div>
                    <div className={s.post__info}>
                        <h3 className={s.post__title}>Popular</h3>
                        <time className={s.post__date} dateTime="2025-03-12">
                            12 March 2025
                        </time>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularPosts;

/* <div className={`${s.popular__left} ${s.post}`}>
                    <div className={s.post__imageWrapper}>
                        <img
                            className={s.post__img}
                            src="https://i.pinimg.com/736x/7e/1f/52/7e1f5204cd468f3708679dbb2ce9e894.jpg"
                            alt="Post Image"
                        />
                    </div>

                    <div className={s.post__info}>
                        <h3 className={s.post__title}>Popular</h3>
                        <time className={s.post__date} dateTime="2025-03-12">
                            12 March 2025
                        </time>
                    </div>
                </div>
                <div className={s.popular__right}>
                    <div className={`${s.popular__middle} ${s.post}`}>
                        <div className={s.post__imageWrapper}>
                            <img
                                className={s.post__img}
                                src="https://i.pinimg.com/736x/9c/3d/9f/9c3d9f577fc5ee701ca0eec6096d51fe.jpg"
                                alt="Post Image"
                            />
                        </div>
                        <div className={s.post__info}>
                            <h3 className={s.post__title}>Popular</h3>
                            <time
                                className={s.post__date}
                                dateTime="2025-03-12"
                            >
                                12 March 2025
                            </time>
                        </div>
                    </div>
                    <div className={s.popular__smallPosts}>
                        <div className={`${s.popular__small} ${s.post}`}>
                            <div className={s.post__imageWrapper}>
                                <img
                                    className={s.post__img}
                                    src="https://i.pinimg.com/736x/6a/36/d3/6a36d3dfcea2b870ab2f5d4513af87b8.jpg"
                                    alt="Post Image"
                                />
                            </div>
                            <div className={s.post__info}>
                                <h3 className={s.post__title}>
                                    Popular
                                </h3>
                                <time
                                    className={s.post__date}
                                    dateTime="2025-03-12"
                                >
                                    12 March 2025
                                </time>
                            </div>
                        </div>
                        <div className={`${s.popular__small} ${s.post}`}>
                            <div className={s.post__imageWrapper}>
                                <img
                                    className={s.post__img}
                                    src="https://i.pinimg.com/736x/39/2e/2b/392e2b35eb97313a59f50b5cf2eb020d.jpg"
                                    alt="Post Image"
                                />
                            </div>
                            <div className={s.post__info}>
                                <h3 className={s.post__title}>
                                    Popular
                                </h3>
                                <time
                                    className={s.post__date}
                                    dateTime="2025-03-12"
                                >
                                    12 March 2025
                                </time>
                            </div>
                        </div>
                    </div>
                </div> */
