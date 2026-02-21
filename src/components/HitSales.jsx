import React, { useEffect, useState } from "react";
import axios from "axios";
import scss from "./HitSales.module.scss";
import { useMain } from "../context/MainContext";

const API_URL = "https://api-crud.elcho.dev/api/v1/ebe0d-8ea4c-406e6/product";

const HitSales = () => {
  const { t } = useMain();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data?.data || response.data || [];
        setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (error) {
        console.error("Hit sales fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHits();
  }, []);

  if (loading) {
    return (
      <div className={scss.hut}>
        <h1>{t("hitsales_loading")}</h1>
      </div>
    );
  }

  return (
    <div className={scss.home}>
      <section className={scss.hut}>
        <h1>{t("hitsales_title")}</h1>

        <div className={scss.hitSales}>
          {products.map((item) => (
            <div key={item._id} className={scss.card}>
              <span className={scss.label}>{t("hitsales_label")}</span>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description || t("hitsales_description")}</p>
              <span className={scss.price}>
                {Number(item.price).toLocaleString()} {t("currency")}
              </span>
              <button>{t("hitsales_buy")}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HitSales;
