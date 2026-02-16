import React from "react";
import { NavLink } from "react-router-dom";
import scss from "./AdminSidebar.module.scss";

const AdminSidebar = () => {
  return (
    <div className={scss.sidebar}>
      <div className={scss.logo}>
        <h2>Floriva Admin</h2>
      </div>

      <nav className={scss.nav}>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? `${scss.link} ${scss.active}` : scss.link
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? `${scss.link} ${scss.active}` : scss.link
          }
        >
          🌸 Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? `${scss.link} ${scss.active}` : scss.link
          }
        >
          🛒 Orders
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? `${scss.link} ${scss.active}` : scss.link
          }
        >
          👤 Users
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
