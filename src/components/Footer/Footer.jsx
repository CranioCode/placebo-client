import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="bg-tertiary text-white text-xl flex items-center justify-center">
      <span>&#169; 2022 |</span>
      <a
        href="https://github.com/CranioCode/placebo"
        target={"_blank"}
        rel={"noopener noreferrer"}
        className="ml-1">
        Placebo
      </a>
    </footer>
  );
};

export default Footer;
