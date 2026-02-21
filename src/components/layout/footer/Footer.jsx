import { NavLink } from "react-router-dom";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import scss from "./Footer.module.scss";
import { useMain } from "../../../context/MainContext";

const CONTACT_PHONE_VIEW = "+996 702 126 311";
const CONTACT_PHONE_LINK = "+996702126311";
const CONTACT_EMAIL = "info@floriva.kg";
const INSTAGRAM_URL = "https://www.instagram.com/floriva.kg";
const TELEGRAM_URL = "https://t.me/floriva_kg";
const WHATSAPP_URL = "https://wa.me/996702126311";

const Footer = () => {
  const { t } = useMain();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={scss.footer}>
      <div className={scss.petals}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className={scss.container}>
        <div className={scss.logoBlock}>
          <h2 className={scss.shimmer}>Floriva</h2>
          <p>{t("footer_description")}</p>

          <div className={scss.socials}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <FaTelegramPlane />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className={scss.links}>
          <h4>{t("footer_nav")}</h4>
          <div className={scss.navGrid}>
            <div className={scss.navColumn}>
              <NavLink to="/">{t("header_home")}</NavLink>
              <NavLink to="/catalog">{t("header_catalog")}</NavLink>
              <NavLink to="/delivery">{t("delivery_title")}</NavLink>
            </div>
            <div className={scss.navColumn}>
              <NavLink to="/favorites">{t("page_favorites_title")}</NavLink>
              <NavLink to="/about">{t("footer_about")}</NavLink>
              <NavLink to="/contact">{t("footer_contacts")}</NavLink>
            </div>
          </div>
        </div>

        <div className={scss.contacts}>
          <h4>{t("footer_contacts")}</h4>
          <p>{t("footer_city_label")}: {t("footer_city")}</p>
          <a href={`tel:${CONTACT_PHONE_LINK}`}>
            {t("footer_phone_label")}: {CONTACT_PHONE_VIEW}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            {t("footer_email_label")}: {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className={scss.bottom}>
        {currentYear} · {t("footer_bottom")}
      </div>
    </footer>
  );
};

export default Footer;
