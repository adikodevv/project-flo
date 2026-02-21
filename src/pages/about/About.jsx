import React from "react";
import scss from "./About.module.scss";
import pink from "../../assets/img/pink.webp";
import img from "../../assets/img/img_2801.webp";
import ff from "../../assets/img/5780.jpg";
import bo from "../../assets/img/2-b0.jpg";
import ww from "../../assets/img/4475_1.jpg";
import rr from "../../assets/img/jpeg.webp";
import vp from "../../assets/img/vpiaz.webp";
import eb from "../../assets/img/6eb.png";
import aa from "../../assets/img/168613.jpg";
import ov from "../../assets/img/0v4.jpg";
import ab from "../../assets/img/1a3b.jpg";
import cj from "../../assets/img/3-1c.jpg";
import cz from "../../assets/img/1cz.jpg";
import rt from "../../assets/img/5420.jpg";
import ad from "../../assets/img/ad_4nx.jpg";
import { NavLink } from "react-router-dom";
import { useMain } from "../../context/MainContext";

const About = () => {
  const { t } = useMain();

  return (
    <div className={scss.about}>
      <div className={scss.parallaxBackground}></div>

      <div className={scss.aboutContent}>
        <h1>{t("about_title")}</h1>
        <p>{t("about_intro")}</p>
      </div>

      <div className={scss.tt}>
        <p>{t("about_story")}</p>
      </div>

      <div className={scss.hh}>
        <h1>{t("about_assortment_title")}</h1>
        <h2>
          <span>💐 {t("about_assortment_author")}</span>
        </h2>
        <img src={pink} alt="" />
        <img src={img} alt="" />
        <img src={ff} alt="" />
      </div>

      <div className={scss.ab}>
        <h2>
          <span>🌹 {t("about_assortment_roses")}</span>
        </h2>
        <img src={bo} alt="" />
        <img src={ww} alt="" />
        <img src={rr} alt="" />
      </div>

      <div className={scss.l}>
        <h2>
          <span>🌷 {t("about_assortment_seasonal")}</span>
        </h2>
        <img src={vp} alt="" />
        <img src={eb} alt="" />
        <img src={aa} alt="" />
      </div>

      <div className={scss.qq}>
        <h2>
          <span>🎁 {t("about_assortment_boxes")}</span>
        </h2>
        <img src={ov} alt="" />
        <img src={ab} alt="" />
        <img src={cj} alt="" />
      </div>

      <div className={scss.e}>
        <h2>
          <span>🌺 {t("about_assortment_custom")}</span>
        </h2>
        <img src={cz} alt="" />
        <img src={rt} alt="" />
        <img src={ad} alt="" />
      </div>

      <div className={scss.s}>
        <h1>{t("about_quality_text")}</h1>
      </div>

      <div className={scss.gh}>
        <h1>{t("about_bonus_title")}</h1>
        <div className={scss.j}>
          <h2>🔥 {t("about_bonus_1")}</h2>
          <h2>💝 {t("about_bonus_2")}</h2>
          <h2>🚚 {t("about_bonus_3")}</h2>
          <h2>🎉 {t("about_bonus_4")}</h2>
          <h1>{t("about_bonus_text")}</h1>
          <p>{t("about_bonus_note")}</p>
        </div>
      </div>

      <NavLink to="/coman">
        <button>💐 {t("about_team_button")}</button>
      </NavLink>
    </div>
  );
};

export default About;
