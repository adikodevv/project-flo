import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import scss from "./AdminSidebar.module.scss";
import { useMain } from "../../context/MainContext";

const AdminSidebar = () => {
  const { t, isDark, toggleTheme } = useMain();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login", { replace: true });
  };

  return (
    <div className={scss.sidebar}>
      <div className={scss.logo}>
        <h2>{t("admin_sidebar_title")}</h2>
        <span>{t("admin_sidebar_subtitle")}</span>
      </div>

      <nav className={scss.nav}>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? `${scss.link} ${scss.active}` : scss.link
          }
        >
          {t("admin_sidebar_dashboard")}
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? `${scss.link} ${scss.active}` : scss.link
          }
        >
          {t("admin_sidebar_products")}
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? `${scss.link} ${scss.active}` : scss.link
          }
        >
          {t("admin_sidebar_orders")}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? `${scss.link} ${scss.active}` : scss.link
          }
        >
          {t("admin_sidebar_users")}
        </NavLink>
      </nav>

      <button
        type="button"
        className={scss.themeToggle}
        onClick={toggleTheme}
        aria-label={t("admin_sidebar_toggle_theme")}
      >
        {isDark ? t("admin_sidebar_light_mode") : t("admin_sidebar_dark_mode")}{" "}
        {isDark ? "☀️" : "🌙"}
      </button>

      <button
        type="button"
        className={scss.logoutBtn}
        onClick={handleLogout}
      >
        {t("admin_sidebar_logout")}
      </button>
    </div>
  );
};

export default AdminSidebar;
