import { Navigate } from "react-router-dom";
import ScrollToTop from "../layout/ScrollToTop/ScrollToTop";
import AdminSidebar from "./SideBar";
import AdminRoutes from "../../routes/AdminRoutes";
import scss from "./AdminLayout.module.scss";

const AdminLayout = () => {
  const isAuth =
    typeof window !== "undefined" && localStorage.getItem("isAuth") === "true";

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={scss.adminLayout}>
      <ScrollToTop />

      <AdminSidebar />

      <main className={scss.content}>
        <AdminRoutes />
      </main>
    </div>
  );
};

export default AdminLayout;
