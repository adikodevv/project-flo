import { NavLink } from "react-router-dom";
import scss from "./Header.module.scss";
import { useMain } from "../../../context/MainContext";

const Header = () => {
  const {
    cartCount,
    favorites,
    search,
    setSearch,
    language,
    setLanguage,
    isDark,
    toggleTheme,
    t,
  } = useMain();

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
          {t("header_home")}
        </NavLink>

        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? scss.activeLink : "")}
        >
          {t("header_catalog")}
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? scss.activeLink : "")}
        >
          {t("header_contacts")}
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? scss.activeLink : "")}
        >
          {t("header_login")}
        </NavLink>
      </nav>

      <div className={scss.actions}>
        <div className={scss.searchBox}>
          <input
            type="text"
            placeholder={t("header_search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>🔍</span>
        </div>

        <select
          className={scss.language}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="RU">RU</option>
          <option value="EN">EN</option>
          <option value="KG">KG</option>
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
            {cartCount > 0 && <span className={scss.badge}>{cartCount}</span>}
          </button>
        </NavLink>

        <button className={scss.themeToggle} onClick={toggleTheme}>
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Header;
