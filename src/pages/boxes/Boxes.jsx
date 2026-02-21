import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useMain } from "../../context/MainContext";
import scss from "./Boxes.module.scss";
import by from "../../assets/img/by.webp";
import byk from "../../assets/img/byk.jpg";
import dad from "../../assets/img/67f26d0621dab.jpg";
import sas from "../../assets/img/7937.jpg";

const BOX_CARDS_CONFIG = [
  {
    id: "classic",
    image: by,
    tagKey: "boxes_card_classic_tag",
    titleKey: "boxes_card_classic_title",
    descriptionKey: "boxes_card_classic_desc",
    price: 5200,
  },
  {
    id: "festive",
    image: byk,
    tagKey: "boxes_card_festive_tag",
    titleKey: "boxes_card_festive_title",
    descriptionKey: "boxes_card_festive_desc",
    price: 6400,
  },
  {
    id: "premium",
    image: dad,
    tagKey: "boxes_card_premium_tag",
    titleKey: "boxes_card_premium_title",
    descriptionKey: "boxes_card_premium_desc",
    price: 7900,
  },
  {
    id: "soft",
    image: sas,
    tagKey: "boxes_card_soft_tag",
    titleKey: "boxes_card_soft_title",
    descriptionKey: "boxes_card_soft_desc",
    price: 5700,
  },
];

const BOX_FEATURE_KEYS = [
  "boxes_feature_1",
  "boxes_feature_2",
  "boxes_feature_3",
];

const Boxes = ({ compact = false }) => {
  const { t, addToCart } = useMain();

  const boxCards = useMemo(
    () =>
      BOX_CARDS_CONFIG.map((item) => ({
        ...item,
        tag: t(item.tagKey),
        title: t(item.titleKey),
        description: t(item.descriptionKey),
      })),
    [t],
  );

  return (
    <section className={`${scss.boxes} ${compact ? scss.compact : ""}`}>
      <div className={scss.head}>
        <span className={scss.kicker}>{t("boxes_kicker")}</span>
        <h2>{t("page_boxes_title")}</h2>
        <p>{t("boxes_intro")}</p>
      </div>

      <div className={scss.features}>
        {BOX_FEATURE_KEYS.map((key) => (
          <article key={key}>{t(key)}</article>
        ))}
      </div>

      <div className={scss.grid}>
        {boxCards.map((item) => (
          <article key={item.id} className={scss.card}>
            <div className={scss.imageWrap}>
              <img src={item.image} alt={item.title} />
            </div>

            <div className={scss.body}>
              <span className={scss.tag}>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className={scss.bottom}>
                <strong>
                  {Number(item.price).toLocaleString("ru-RU")} {t("currency")}
                </strong>
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      name: item.title,
                      description: item.description,
                      price: item.price,
                      image: item.image,
                    })
                  }
                >
                  {t("catalog_buy")}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={scss.actions}>
        <NavLink to="/catalog" className={scss.primaryLink}>
          {t("boxes_link_catalog")}
        </NavLink>
        <NavLink to="/boxes" className={scss.secondaryLink}>
          {t("boxes_link_all")}
        </NavLink>
      </div>
    </section>
  );
};

export default Boxes;
