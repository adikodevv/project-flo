import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import AdminProducts from "../pages/admin/AdminProducts";

const AdminRoutes = () => {
  const routes = [
    {
      link: "/admin",
      element: <AdminPage />,
    },
    {
      link: "/admin/products", // Будет доступно по адресу /admin/products
      element: <AdminProducts />,
    },
  ];

  return (
    <Routes>
      {routes.map((item) => (
        <Route key={item.link} path={item.link} element={item.element} />
      ))}
    </Routes>
  );
};

export default AdminRoutes;
