import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useMain } from "../../../context/MainContext";
import scss from "./Sets.module.scss";
import mm from "../../../assets/img/mm3.webp";
import te from "../../../assets/img/te-3.jpg";
import mv from "../../../assets/img/mv2.avif";
import pop from "../../../assets/img/IMG_00.jpg";
import bb from "../../../assets/img/bb.webp";
import by from "../../../assets/img/by.webp";

const SET_CARDS_CONFIG = [
  {
    id: "mom",
    image: mm,
    tagKey: "sets_card_mom_tag",
    titleKey: "sets_card_mom_title",
    descriptionKey: "sets_card_mom_desc",
    price: 4900,
  },
  {
    id: "lover",
    image: te,
    tagKey: "sets_card_lover_tag",
    titleKey: "sets_card_lover_title",
    descriptionKey: "sets_card_lover_desc",
    price: 6900,
  },
  {
    id: "friend",
    image: mv,
    tagKey: "sets_card_friend_tag",
    titleKey: "sets_card_friend_title",
    descriptionKey: "sets_card_friend_desc",
    price: 4300,
  },
  {
    id: "office",
    image: pop,
    tagKey: "sets_card_office_tag",
    titleKey: "sets_card_office_title",
    descriptionKey: "sets_card_office_desc",
    price: 5200,
  },
  {
    id: "march8",
    image: bb,
    tagKey: "sets_card_march8_tag",
    titleKey: "sets_card_march8_title",
    descriptionKey: "sets_card_march8_desc",
    price: 7500,
  },
  {
    id: "surprise",
    image: by,
    tagKey: "sets_card_surprise_tag",
    titleKey: "sets_card_surprise_title",
    descriptionKey: "sets_card_surprise_desc",
    price: 5600,
  },
];

const SET_BENEFIT_KEYS = [
  "sets_benefit_1",
  "sets_benefit_2",
  "sets_benefit_3",
];

const Sets = ({ compact = false }) => {
  const { t, addToCart } = useMain();

  const setCards = useMemo(
    () =>
      SET_CARDS_CONFIG.map((item) => ({
        ...item,
        tag: t(item.tagKey),
        title: t(item.titleKey),
        description: t(item.descriptionKey),
      })),
    [t],
  );

  return (
    <section className={`${scss.sets} ${compact ? scss.compact : ""}`}>
      <div className={scss.top}>
        <span className={scss.kicker}>{t("sets_kicker")}</span>
        <h2>{t("page_sets_title")}</h2>
        <p>{t("sets_intro")}</p>
      </div>

      <div className={scss.benefits}>
        {SET_BENEFIT_KEYS.map((key) => (
          <article key={key} className={scss.benefit}>
            {t(key)}
          </article>
        ))}
      </div>

      <div className={scss.grid}>
        {setCards.map((item) => (
          <article key={item.id} className={scss.card}>
            <div className={scss.imageWrap}>
              <img src={item.image} alt={item.title} />
            </div>

            <div className={scss.cardBody}>
              <span className={scss.tag}>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div className={scss.cardBottom}>
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
        <NavLink to="/catalog" className={scss.catalogLink}>
          {t("sets_link_catalog")}
        </NavLink>
        <NavLink to="/sets" className={scss.setsLink}>
          {t("sets_link_all")}
        </NavLink>
      </div>
    </section>
  );
};

export default Sets;
