import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_CODES,
  TRANSLATIONS,
} from "../i18n/config";

const MainContext = createContext();
const CART_API = "https://api-crud.elcho.dev/api/v1/e4389-5e9ab-9c633/cart";
const FAVORITES_STORAGE_KEY = "favorites";
const THEME_STORAGE_KEY = "theme";

const formatTranslation = (template, vars = {}) =>
  String(template).replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`,
  );

const isSupportedLanguage = (lang) =>
  Object.prototype.hasOwnProperty.call(TRANSLATIONS, lang);

const getItemId = (item) =>
  item?._id ?? item?.id ?? item?.name ?? item?.title ?? null;

export const MainProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsed = JSON.parse(savedFavorites || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    const savedLanguage = localStorage.getItem("language");
    const normalized = (savedLanguage || "").toUpperCase();
    return isSupportedLanguage(normalized) ? normalized : DEFAULT_LANGUAGE;
  });
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  });
  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = LANGUAGE_CODES[language] || "ru";
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  }, [theme, isDark]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const changeLanguage = (nextLanguage) => {
    const normalized = String(nextLanguage || "").toUpperCase();
    if (!isSupportedLanguage(normalized)) return;
    setLanguage(normalized);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const t = (key, vars = {}) => {
    const fallbackDictionary = TRANSLATIONS[DEFAULT_LANGUAGE] || {};
    const dictionary = TRANSLATIONS[language] || fallbackDictionary;
    const text = dictionary[key] || fallbackDictionary[key] || key;
    return formatTranslation(text, vars);
  };

  const buildCartPayload = (item, quantity) => ({
    name: item.name,
    price: item.price,
    image: item.image,
    quantity,
  });

  const fetchCart = async () => {
    try {
      const res = await axios.get(CART_API);
      const cartData = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : [];

      setCart(cartData);
      setCartCount(
        cartData.reduce((acc, item) => acc + Number(item.quantity || 0), 0),
      );
    } catch (err) {
      console.error(err);
      setCart([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const existing = cart.find((item) => item.name === product.name);
      const existingId = existing?._id ?? existing?.id;

      if (existing) {
        await axios.put(
          `${CART_API}/${existingId}`,
          buildCartPayload(existing, Number(existing.quantity || 0) + 1),
        );
      } else {
        await axios.post(CART_API, buildCartPayload(product, 1));
      }

      await fetchCart();
    } catch (err) {
      console.error("Ошибка добавления:", err);
    }
  };

  const increaseQuantity = async (item) => {
    try {
      const itemId = item?._id ?? item?.id;
      if (!itemId) return;

      await axios.put(
        `${CART_API}/${itemId}`,
        buildCartPayload(item, Number(item.quantity || 0) + 1),
      );
      await fetchCart();
    } catch (err) {
      console.error("Ошибка при увеличении:", err);
    }
  };

  const decreaseQuantity = async (item) => {
    try {
      const itemId = item?._id ?? item?.id;
      if (!itemId) return;

      if (Number(item.quantity || 0) <= 1) {
        await axios.delete(`${CART_API}/${itemId}`);
      } else {
        await axios.put(
          `${CART_API}/${itemId}`,
          buildCartPayload(item, Number(item.quantity || 0) - 1),
        );
      }
      await fetchCart();
    } catch (err) {
      console.error("Ошибка при уменьшении:", err);
    }
  };

  const isFavorite = (itemOrId) => {
    const targetId =
      typeof itemOrId === "object" ? getItemId(itemOrId) : itemOrId;
    if (!targetId) return false;
    return favorites.some((favoriteItem) => getItemId(favoriteItem) === targetId);
  };

  const toggleFavorite = (product) => {
    const productId = getItemId(product);
    if (!productId) return;

    setFavorites((prev) => {
      const exists = prev.some((item) => getItemId(item) === productId);
      if (exists) {
        return prev.filter((item) => getItemId(item) !== productId);
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (itemOrId) => {
    const targetId =
      typeof itemOrId === "object" ? getItemId(itemOrId) : itemOrId;
    if (!targetId) return;
    setFavorites((prev) =>
      prev.filter((favoriteItem) => getItemId(favoriteItem) !== targetId),
    );
  };

  return (
    <MainContext.Provider
      value={{
        cart,
        favorites,
        search,
        setSearch,
        cartCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        toggleFavorite,
        removeFromFavorites,
        isFavorite,
        language,
        setLanguage: changeLanguage,
        theme,
        isDark,
        setTheme,
        toggleTheme,
        t,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext);
