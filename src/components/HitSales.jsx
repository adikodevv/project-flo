import React, { useState, useEffect } from "react";
import axios from "axios";
import scss from "./HitSales.module.scss"; // Путь к твоему файлу стилей

const API_URL = "https://api-crud.elcho.dev/api/v1/ebe0d-8ea4c-406e6/product";

const HitSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data.data || response.data;
        // Берем первые 4 товара для секции "Хит"
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHits();
  }, []);

  if (loading)
    return (
      <div className={scss.hut}>
        <h1>Загрузка...</h1>
      </div>
    );

  return (
    <div className={scss.home}>
      <section className={scss.hut}>
        <h1>Хит продажи 🔥</h1>

        <div className={scss.hitSales}>
          {products.map((item) => (
            <div key={item._id} className={scss.card}>
              {/* Лейбл "Хит" из твоих стилей */}
              <span className={scss.label}>Хит</span>

              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>
              <p>Свежие цветы с доставкой</p>

              <span className={scss.price}>
                {item.price.toLocaleString()} ₽
              </span>

              <button>Купить сейчас</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HitSales;
