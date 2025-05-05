import s from "./PopularPosts.module.css";

const PopularPosts = () => {
    return (
        <section className={s.popular}>
            <div className="container">
                <div className={s.popular__wrapper}>
                    <div className={`${s.popular__big} ${s.post}`}>
                        <div className={s.post__imageWrapper}>
                            <img
                                className={s.post__img}
                                src="https://a.d-cd.net/fF_9ImAA9Tq13W5FKVfVidI4lb8-1920.jpg"
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

                    <div className={`${s.popular__middle} ${s.post}`}>
                        <div className={s.post__imageWrapper}>
                            <img
                                className={s.post__img}
                                src="https://a.d-cd.net/UAAAAgBGaeA-960.jpg"
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
                            <time
                                className={s.post__date}
                                dateTime="2025-03-12"
                            >
                                12 March 2025
                            </time>
                        </div>
                    </div>

                    <div className={`${s.popular__small2} ${s.post}`}>
                        <div className={s.post__imageWrapper}>
                            <img
                                className={s.post__img}
                                src="https://i.pinimg.com/736x/7e/1f/52/7e1f5204cd468f3708679dbb2ce9e894.jpg"
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
                </div>
            </div>
        </section>
    );
};

export default PopularPosts;
