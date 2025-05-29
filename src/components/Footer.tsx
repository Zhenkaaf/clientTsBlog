import s from "./Footer.module.css";
const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className="container">
                <div className={s.footer__body}>
                    <p>© Zhenkaaf 2025</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
