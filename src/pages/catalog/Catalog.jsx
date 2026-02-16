import React, { useState, useEffect } from "react";
import axios from "axios";
import scss from "./Catalog.module.scss";

const API_URL = "https://api-crud.elcho.dev/api/v1/ebe0d-8ea4c-406e6/product";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data.data || response.data;
        setProducts(data);
      } catch (error) {
        console.error("Ошибка загрузки каталога:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Фильтрация по поиску
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <div className={scss.loader}>Загрузка цветов...</div>;

  return (
    <div className={scss.catalogPage}>
      <div className={scss.container}>
        <header className={scss.header}>
          <h1>Каталог букетов</h1>
          <div className={scss.searchBox}>
            <input
              type="text"
              placeholder="Поиск любимых цветов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className={scss.grid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item._id} className={scss.card}>
                <div className={scss.imgWrapper}>
                  <img src={item.image} alt={item.name} />
                  {item.price > 3000 && (
                    <span className={scss.badge}>Premium</span>
                  )}
                </div>
                <div className={scss.info}>
                  <h3>{item.name}</h3>
                  <p className={scss.price}>{item.price.toLocaleString()} ₽</p>
                  <button className={scss.buyBtn}>В корзину</button>
                </div>
              </div>
            ))
          ) : (
            <div className={scss.empty}>
              По вашему запросу ничего не найдено 🌸
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
