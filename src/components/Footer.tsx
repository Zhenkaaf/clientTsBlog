import s from "./Footer.module.css";
const Footer = () => {
    const startYear = 2025;
    const currentYear = new Date().getFullYear();

    const copyright =
        startYear === currentYear
            ? `© Zhenkaaf, ${startYear}`
            : `© Zhenkaaf, ${startYear} – ${currentYear}`;

    return (
        <footer className={s.footer}>
            <div className="container">
                <div className={s.footer__body}>
                    <p>{copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
