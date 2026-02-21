import React from "react";
import scss from "./Coman.module.scss";
import tai from "../../../assets/img/taylor.jpg";
import hai from "../../../assets/img/1-hail.jpg";
import kr from "../../../assets/img/p-kras.jpg";
import { useMain } from "../../../context/MainContext";

const Coman = () => {
  const { t } = useMain();

  return (
    <div id={scss.coman}>
      <div className={scss.coman}>
        <h1>💐 {t("team_title")}</h1>
        <p>{t("team_intro")}</p>
        <h2>{t("team_values")}</h2>
      </div>

      <div className={scss.flo}>
        <h1>🌸 {t("team_anna_title")}</h1>
        <img src={tai} alt="" />
        <h2>{t("team_anna_desc_1")}</h2>
        <p>{t("team_anna_desc_2")}</p>
        <h2>{t("team_anna_desc_3")}</h2>
        <h4>{t("team_anna_quote")}</h4>
      </div>

      <div className={scss.diz}>
        <h1>🌷 {t("team_maria_title")}</h1>
        <img src={hai} alt="" />
        <h2>{t("team_maria_desc_1")}</h2>
        <h3>{t("team_maria_desc_2")}</h3>
      </div>

      <div className={scss.zi}>
        <h1>🌹 {t("team_max_title")}</h1>
        <img src={kr} alt="" />
        <h2>{t("team_max_desc_1")}</h2>
        <h3>{t("team_max_desc_2")}</h3>
      </div>

      <div className={scss.dev}>
        <h1>🚚 {t("team_delivery_title")}</h1>
        <h2>{t("team_delivery_desc_1")}</h2>
        <h3>{t("team_delivery_desc_2")}</h3>
      </div>

      <div className={scss.hh}>
        <h1>💖 {t("team_why_title")}</h1>
        <h2>{t("team_why_1")}</h2>
        <h2>{t("team_why_2")}</h2>
        <h2>{t("team_why_3")}</h2>
        <h2>{t("team_why_4")}</h2>
        <h2>{t("team_why_5")}</h2>
      </div>

      <div className={scss.qw}>
        <h1>🌺 {t("team_philosophy_title")}</h1>
        <h2>{t("team_philosophy_desc_1")}</h2>
        <h3>{t("team_philosophy_desc_2")}</h3>
      </div>
    </div>
  );
};

export default Coman;
