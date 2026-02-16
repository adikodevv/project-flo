import { createContext, useContext, useState } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  // Добавить в корзину
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Удалить из корзины
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Добавить в избранное
  const addToFavorites = (product) => {
    setFavorites((prev) => [...prev, product]);
  };

  // Удалить из избранного
  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MainContext.Provider
      value={{
        cart,
        favorites,
        search,
        setSearch,
        addToCart,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext);
