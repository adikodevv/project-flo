import React, { useEffect, useState } from "react";
import axios from "axios";
import scss from "./AdminProducts.module.scss";
import { useMain } from "../../context/MainContext";

const API_URL = "https://api-crud.elcho.dev/api/v1/ebe0d-8ea4c-406e6/product";
const CATEGORY_OPTIONS = [
  { value: "bento_cake", labelKey: "admin_products_category_bento_cake" },
  {
    value: "chocolate_set",
    labelKey: "admin_products_category_chocolate_set",
  },
  {
    value: "mini_bouquets",
    labelKey: "admin_products_category_mini_bouquets",
  },
  {
    value: "seasonal_bouquets",
    labelKey: "admin_products_category_seasonal_bouquets",
  },
  { value: "combo", labelKey: "admin_products_category_combo" },
  { value: "promotions", labelKey: "admin_products_category_promotions" },
  { value: "daisy", labelKey: "admin_products_category_daisy" },
  {
    value: "gypsophila",
    labelKey: "admin_products_category_gypsophila",
  },
  { value: "rose", labelKey: "admin_products_category_rose" },
  { value: "peony", labelKey: "admin_products_category_peony" },
  { value: "tulip", labelKey: "admin_products_category_tulip" },
  { value: "bouquet", labelKey: "admin_products_category_bouquet" },
  { value: "for_mom", labelKey: "admin_products_category_for_mom" },
  { value: "for_friend", labelKey: "admin_products_category_for_friend" },
  {
    value: "for_colleague",
    labelKey: "admin_products_category_for_colleague",
  },
  { value: "holiday", labelKey: "admin_products_category_holiday" },
  { value: "march8", labelKey: "admin_products_category_march8" },
  {
    value: "for_girlfriend",
    labelKey: "admin_products_category_for_girlfriend",
  },
];

const AdminProducts = () => {
  const { t } = useMain();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [imagePreviewError, setImagePreviewError] = useState(false);

  const getCategoryLabel = (rawCategory) => {
    const normalized = String(rawCategory || "")
      .trim()
      .toLowerCase();
    const found = CATEGORY_OPTIONS.find((item) => item.value === normalized);
    return found ? t(found.labelKey) : rawCategory;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data?.data)) {
        setProducts(response.data.data);
      } else if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Admin products fetch error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setCategory("");
    setImagePreviewError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description: description.trim(),
      price: Number(price),
      image,
      category,
    };

    try {
      if (editId) {
        await axios.patch(`${API_URL}/${editId}`, productData);
      } else {
        await axios.post(API_URL, productData);
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Admin products save error:", error);
      alert(t("admin_products_error_save"));
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm(t("admin_products_confirm_delete"))) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Admin products delete error:", error);
      alert(t("admin_products_error_delete"));
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setName(item.name || "");
    setDescription(item.description || "");
    setPrice(item.price ?? "");
    setImage(item.image || "");
    setCategory(item.category || "");
    setImagePreviewError(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={scss.admin_products}>
      <h1>{t("admin_products_title")}</h1>

      <form onSubmit={handleSubmit} className={scss.form}>
        <h3>
          {editId
            ? t("admin_products_edit_product")
            : t("admin_products_add_product")}
        </h3>

        <input
          type="text"
          placeholder={t("admin_products_name_placeholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder={t("admin_products_description_placeholder")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <input
          type="number"
          placeholder={t("admin_products_price_placeholder")}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder={t("admin_products_image_placeholder")}
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
            setImagePreviewError(false);
          }}
          required
        />

        <div className={scss.image_preview}>
          <p>{t("admin_products_image_preview_title")}</p>
          <div className={scss.preview_box}>
            {image && !imagePreviewError ? (
              <img
                src={image}
                alt={t("admin_products_image_preview_alt")}
                onError={() => setImagePreviewError(true)}
              />
            ) : (
              <div className={scss.preview_placeholder}>
                {imagePreviewError
                  ? t("admin_products_image_preview_error")
                  : t("admin_products_image_preview_hint")}
              </div>
            )}
          </div>
          <small>{t("admin_products_image_preview_note")}</small>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">{t("admin_products_select_category")}</option>
          {CATEGORY_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {t(item.labelKey)}
            </option>
          ))}
        </select>

        <div className={scss.buttons}>
          <button type="submit" className={scss.save_btn}>
            {editId
              ? t("admin_products_save_changes")
              : t("admin_products_add_button")}
          </button>

          {editId && (
            <button type="button" onClick={resetForm}>
              {t("admin_products_cancel")}
            </button>
          )}
        </div>
      </form>

      <hr />

      {loading ? (
        <p>{t("admin_products_loading")}</p>
      ) : (
        <div className={scss.product_grid}>
          {products.map((item) => (
            <div key={item._id} className={scss.product_card}>
              <img src={item.image} alt={item.name} />
              <div className={scss.info}>
                <h4>{item.name}</h4>
                <p className={scss.price}>
                  {item.price} {t("currency")}
                </p>
                {item.description ? (
                  <p className={scss.description}>
                    <strong>{t("admin_products_description_label")}:</strong>{" "}
                    {item.description}
                  </p>
                ) : null}
                <p className={scss.meta}>
                  <strong>{t("admin_products_category_label")}:</strong>{" "}
                  {getCategoryLabel(item.category)}
                </p>
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
