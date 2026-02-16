import scss from "./Footer.module.scss";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={scss.footer}>
      {/* 🌹 Падающие лепестки  */}
      <div className={scss.petals}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className={scss.container}>
        <div className={scss.logoBlock}>
          <h2 className={scss.shimmer}>🌸 Floriva</h2>
          <p>Элегантные букеты премиум-качества с доставкой по Бишкеку 💕</p>

          <div className={scss.socials}>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTelegramPlane />
            </a>
            <a href="#">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className={scss.links}>
          <h4>Навигация</h4>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/about">О нас</NavLink>
          <NavLink to="/contact">Контакты</NavLink>
        </div>

        <div className={scss.contacts}>
          <h4>Контакты</h4>
          <p>📍 Бишкек</p>
          <p>📞 +996 702 126 311</p>
          <p>✉️ info@floriva.kg</p>
        </div>
      </div>

      <div className={scss.bottom}>© 2026 Floriva — Premium Flowers 🌷</div>
    </footer>
  );
};

export default Footer;
