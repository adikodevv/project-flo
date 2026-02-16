import React, { useState, useEffect } from "react";
import axios from "axios";
import scss from "./AdminProducts.module.scss";

const API_URL = "https://api-crud.elcho.dev/api/v1/ebe0d-8ea4c-406e6/product";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Состояния для формы
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Состояние для редактирования
  const [editId, setEditId] = useState(null);

  // 1. Получение данных (READ)
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      // Проверяем: если response.data — это объект, и в нем есть массив data
      if (Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else if (Array.isArray(response.data)) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Ошибка при гет-запросе:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Добавление или Обновление (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price: Number(price), image };

    try {
      if (editId) {
        // Если есть editId — значит мы обновляем (PATCH/PUT)
        await axios.patch(`${API_URL}/${editId}`, productData);
        setEditId(null);
      } else {
        // Если нет — создаем новый (POST)
        await axios.post(API_URL, productData);
      }

      // Очистка полей и обновление списка
      setName("");
      setPrice("");
      setImage("");
      fetchProducts();
    } catch (error) {
      alert("Ошибка при сохранении!");
    }
  };

  // 3. Удаление (DELETE)
  const deleteProduct = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
      } catch (error) {
        alert("Не удалось удалить товар");
      }
    }
  };

  // 4. Подготовка к редактированию
  const startEdit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setPrice(item.price);
    setImage(item.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={scss.admin_products}>
      <h1>Управление продуктами</h1>

      {/* ФОРМА */}
      <form onSubmit={handleSubmit} className={scss.form}>
        <h3>{editId ? "Редактировать товар" : "Добавить новый товар"}</h3>
        <input
          type="text"
          placeholder="Название товара"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL изображения"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <div className={scss.buttons}>
          <button type="submit" className={scss.save_btn}>
            {editId ? "Сохранить изменения" : "Добавить"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setName("");
                setPrice("");
                setImage("");
              }}
            >
              Отмена
            </button>
          )}
        </div>
      </form>

      <hr />

      {/* СПИСОК ТОВАРОВ */}
      {loading ? (
        <p>Загрузка данных...</p>
      ) : (
        <div className={scss.product_grid}>
          {products?.map((item) => (
            <div key={item._id} className={scss.product_card}>
              <img src={item.image} alt={item.name} />
              <div className={scss.info}>
                <h4>{item.name}</h4>
                <p>{item.price} сом</p>
                <div className={scss.actions}>
                  <button
                    onClick={() => startEdit(item)}
                    className={scss.edit_btn}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className={scss.delete_btn}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
