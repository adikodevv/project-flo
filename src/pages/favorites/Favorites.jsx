import React from "react";
import { useMain } from "../../context/MainContext";
import scss from "./Favorites.module.scss";

const Favorites = () => {
  const { favorites, removeFromFavorites, addToCart, t } = useMain();

  return (
    <section className={scss.favoritesPage}>
      <div className={scss.container}>
        <div className={scss.header}>
          <h1>{t("favorites_title")}</h1>
          <p>{t("favorites_subtitle", { count: favorites.length })}</p>
        </div>

        {favorites.length === 0 ? (
          <div className={scss.empty}>
            <h2>{t("favorites_empty_title")}</h2>
            <p>{t("favorites_empty_text")}</p>
          </div>
        ) : (
          <div className={scss.grid}>
            {favorites.map((item) => (
              <article key={item._id || item.id || item.name} className={scss.card}>
                <div className={scss.imageWrap}>
                  <img src={item.image} alt={item.name} />
                </div>

                <div className={scss.body}>
                  <h3>{item.name}</h3>
                  <p className={scss.price}>
                    {Number(item.price).toLocaleString()} {t("currency")}
                  </p>

                  <div className={scss.actions}>
                    <button
                      type="button"
                      className={scss.removeBtn}
                      onClick={() => removeFromFavorites(item)}
                    >
                      {t("favorites_remove")}
                    </button>
                    <button
                      type="button"
                      className={scss.cartBtn}
                      onClick={() => addToCart(item)}
                    >
                      {t("favorites_add_to_cart")}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
