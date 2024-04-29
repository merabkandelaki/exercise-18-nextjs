import Image from "next/image";
import LogoFooter from "../../assets/logo_footer.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <Image className="logo-footer" src={LogoFooter} alt="logo footer" />
        <span>COMM | React</span>
      </div>
      <span>&copy; 2024 kandelakimerab@gmail.com</span>
    </div>
  );
};

export default Footer;
