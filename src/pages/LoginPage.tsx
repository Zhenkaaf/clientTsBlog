import { Link } from "react-router-dom";
import s from "./LoginPage.module.css";
import { useForm } from "react-hook-form";

interface IFormInputs {
    email: string;
    password: string;
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<IFormInputs>({ mode: "onBlur" });

    const processFormData = (data: IFormInputs) => {
        console.log(data);
        reset();
    };
    return (
        <div className={s.login}>
            <div className="container">
                <form
                    onSubmit={handleSubmit(processFormData)}
                    className={s.login__form}
                >
                    <h3 className={s.login__title}>Login</h3>
                    <label className="visuallyHidden" htmlFor="email">
                        email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className={s.login__input}
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                    {errors?.email && (
                        <p className={s.login__error}>
                            {errors.email?.message || "Error"}
                        </p>
                    )}

                    <label className="visuallyHidden" htmlFor="password">
                        password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className={s.login__input}
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "minimum 6 characters",
                            },
                            maxLength: {
                                value: 20,
                                message: "Maximum 20 characters",
                            },
                            pattern: {
                                value: /^\S*$/,
                                message: "Password can not contain spaces",
                            },
                        })}
                    />
                    {errors?.password && (
                        <p className={s.login__error}>
                            {errors.password?.message || "Error"}
                        </p>
                    )}
                    <button
                        className={s.login__button}
                        type="submit"
                        disabled={!isValid}
                    >
                        Login
                    </button>

                    <div className={s.login__footer}>
                        <p> Do not have an account yet?</p>
                        <Link
                            to="/register"
                            className={`${s.login__link} link`}
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
