import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import scss from "./Catalog.module.scss";
import { useMain } from "../../context/MainContext";

const API_URL = "https://api-crud.elcho.dev/api/v1/ebe0d-8ea4c-406e6/product";
const CATEGORY_ORDER = [
  "bento_cake",
  "chocolate_set",
  "mini_bouquets",
  "seasonal_bouquets",
  "combo",
  "promotions",
  "daisy",
  "gypsophila",
  "for_mom",
  "for_friend",
  "for_colleague",
  "holiday",
  "march8",
  "for_girlfriend",
  "rose",
  "peony",
  "tulip",
  "bouquet",
];
const CATEGORY_LABEL_KEYS = {
  bento_cake: "admin_products_category_bento_cake",
  chocolate_set: "admin_products_category_chocolate_set",
  mini_bouquets: "admin_products_category_mini_bouquets",
  seasonal_bouquets: "admin_products_category_seasonal_bouquets",
  combo: "admin_products_category_combo",
  promotions: "admin_products_category_promotions",
  daisy: "admin_products_category_daisy",
  gypsophila: "admin_products_category_gypsophila",
  for_mom: "admin_products_category_for_mom",
  for_friend: "admin_products_category_for_friend",
  for_colleague: "admin_products_category_for_colleague",
  holiday: "admin_products_category_holiday",
  march8: "admin_products_category_march8",
  for_girlfriend: "admin_products_category_for_girlfriend",
  rose: "admin_products_category_rose",
  peony: "admin_products_category_peony",
  tulip: "admin_products_category_tulip",
  bouquet: "admin_products_category_bouquet",
};

const normalizeCategory = (category) => {
  const normalized = String(category || "")
    .trim()
    .toLowerCase();

  const aliasToCanonical = {
    bento_cake: "bento_cake",
    "bento-cake": "bento_cake",
    "bento cake": "bento_cake",
    бентоторт: "bento_cake",
    "бенто торт": "bento_cake",
    "бенто-торт": "bento_cake",
    chocolate_set: "chocolate_set",
    "chocolate-set": "chocolate_set",
    "chocolate set": "chocolate_set",
    "шоколадный набор": "chocolate_set",
    "шоколадные наборы": "chocolate_set",
    mini_bouquets: "mini_bouquets",
    "mini-bouquets": "mini_bouquets",
    "mini bouquets": "mini_bouquets",
    "мини букет": "mini_bouquets",
    "мини букеты": "mini_bouquets",
    seasonal_bouquets: "seasonal_bouquets",
    "seasonal-bouquets": "seasonal_bouquets",
    "seasonal bouquets": "seasonal_bouquets",
    "сезонный букет": "seasonal_bouquets",
    "сезонные букеты": "seasonal_bouquets",
    combo: "combo",
    combos: "combo",
    комбо: "combo",
    "комбо акция": "combo",
    "комбо акции": "combo",
    promotions: "promotions",
    promotion: "promotions",
    акция: "promotions",
    акции: "promotions",
    daisy: "daisy",
    daisies: "daisy",
    ромашка: "daisy",
    ромашки: "daisy",
    gypsophila: "gypsophila",
    гипсофила: "gypsophila",
    гипсофилы: "gypsophila",
    for_mom: "for_mom",
    "for-mom": "for_mom",
    mom: "for_mom",
    "for mom": "for_mom",
    "для мамы": "for_mom",
    маме: "for_mom",
    for_friend: "for_friend",
    "for-friend": "for_friend",
    friend: "for_friend",
    "for friend": "for_friend",
    "для подруги": "for_friend",
    подруге: "for_friend",
    for_colleague: "for_colleague",
    "for-colleague": "for_colleague",
    colleague: "for_colleague",
    "for colleague": "for_colleague",
    "для коллеги": "for_colleague",
    коллеге: "for_colleague",
    holiday: "holiday",
    holidays: "holiday",
    festive: "holiday",
    праздники: "holiday",
    праздник: "holiday",
    "для праздника": "holiday",
    march8: "march8",
    "march-8": "march8",
    "8march": "march8",
    "8 марта": "march8",
    "для 8 марта": "march8",
    for_girlfriend: "for_girlfriend",
    "for-girlfriend": "for_girlfriend",
    girlfriend: "for_girlfriend",
    "for girlfriend": "for_girlfriend",
    "для девушки": "for_girlfriend",
    девушке: "for_girlfriend",
    rose: "rose",
    roses: "rose",
    роза: "rose",
    розы: "rose",
    peony: "peony",
    peonies: "peony",
    пион: "peony",
    пионы: "peony",
    tulip: "tulip",
    tulips: "tulip",
    тюльпан: "tulip",
    тюльпаны: "tulip",
    bouquet: "bouquet",
    bouquets: "bouquet",
    букет: "bouquet",
    букеты: "bouquet",
  };

  return aliasToCanonical[normalized] || normalized;
};

const compareCategories = (a, b) => {
  const aIndex = CATEGORY_ORDER.indexOf(a);
  const bIndex = CATEGORY_ORDER.indexOf(b);

  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  if (aIndex !== -1) return -1;
  if (bIndex !== -1) return 1;
  return a.localeCompare(b);
};

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const { addToCart, toggleFavorite, isFavorite, t } = useMain();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        const rawData = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : [];

        const normalizedProducts = rawData.map((item) => ({
          ...item,
          category: normalizeCategory(item.category),
        }));

        setProducts(normalizedProducts);
      } catch (error) {
        console.error("Ошибка загрузки каталога:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = useMemo(() => {
    const available = Array.from(
      new Set(
        products
          .map((product) => normalizeCategory(product.category))
          .filter(Boolean),
      ),
    ).sort(compareCategories);

    return ["all", ...available];
  }, [products]);

  const getCategoryLabel = (category) => {
    if (category === "all") return t("catalog_all");
    const key = CATEGORY_LABEL_KEYS[category];
    return key ? t(key) : category;
  };

  const filteredProducts = products
    .filter((item) =>
      `${String(item.name || "")} ${String(item.description || "")}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
    .filter((item) =>
      selectedCategory === "all" ? true : item.category === selectedCategory,
    );

  if (loading) return <div className={scss.loader}>{t("catalog_loading")}</div>;

  return (
    <div className={scss.catalogPage}>
      <div className={scss.container}>
        <header
          className={`${scss.header} ${scrolled ? scss.transparent : ""}`}
        >
          <h1>{t("catalog_title")}</h1>
          <div className={scss.searchBox}>
            <input
              type="text"
              placeholder={t("catalog_search_placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className={scss.categories}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${scss.categoryBtn} ${
                selectedCategory === category ? scss.activeCategory : ""
              }`}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        <div className={scss.grid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item._id} className={scss.card}>
                <div className={scss.imgWrapper}>
                  <img src={item.image} alt={item.name} />
                  <button
                    type="button"
                    className={`${scss.favoriteBtn} ${
                      isFavorite(item) ? scss.favoriteBtnActive : ""
                    }`}
                    onClick={() => toggleFavorite(item)}
                    aria-label={t("catalog_favorite_toggle")}
                  >
                    ♥
                  </button>
                  {item.price > 3000 && (
                    <span className={scss.badge}>{t("catalog_premium")}</span>
                  )}
                </div>

                <div className={scss.info}>
                  <h3>{item.name}</h3>
                  {item.description ? (
                    <p className={scss.description}>{item.description}</p>
                  ) : null}
                  <p className={scss.price}>
                    {item.price?.toLocaleString()} {t("currency")}
                  </p>
                  <button className={scss.buyBtn} onClick={() => addToCart(item)}>
                    {t("catalog_buy")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={scss.empty}>{t("catalog_empty")} 🌸</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
