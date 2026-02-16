import React from "react";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return <AdminLayout />;
  }

  return <Layout />;
};

export default App;
