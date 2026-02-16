import { NavLink } from "react-router-dom";
import scss from "./Header.module.scss";
import { useMain } from "../../../context/MainContext";
import { useState, useEffect } from "react";

const Header = () => {
  const { cart, favorites, search, setSearch } = useMain();

  // получаем сохраненную тему
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  // применяем тему
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className={scss.header}>
      <NavLink to="/">
        <div className={scss.logo}>🌸 Floriva</div>
      </NavLink>

      <nav className={scss.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? scss.activeLink : "")}
        >
          Главная
        </NavLink>

        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? scss.activeLink : "")}
        >
          Каталог
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? scss.activeLink : "")}
        >
          Контакты
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? scss.activeLink : "")}
        >
          Войти
        </NavLink>
      </nav>

      <div className={scss.actions}>
        <div className={scss.searchBox}>
          <input
            type="text"
            placeholder="Поиск цветов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>🔍</span>
        </div>

        <select className={scss.language}>
          <option>RU</option>
          <option>EN</option>
          <option>KG</option>
        </select>

        <NavLink to="/favorites">
          <button className={scss.favorite}>
            ❤️
            {favorites.length > 0 && (
              <span className={scss.badge}>{favorites.length}</span>
            )}
          </button>
        </NavLink>

        <NavLink to="/cart">
          <button className={scss.cart}>
            🛒
            {cart.length > 0 && (
              <span className={scss.badge}>{cart.length}</span>
            )}
          </button>
        </NavLink>

        <button className={scss.themeToggle} onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Header;
