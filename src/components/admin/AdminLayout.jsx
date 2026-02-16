import { Outlet } from "react-router-dom";
import ScrollToTop from "../layout/ScrollToTop/ScrollToTop";
import AdminSidebar from "./SideBar";
import AdminRoutes from "../../routes/AdminRoutes";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ScrollToTop />

      <AdminSidebar />

      <main style={{ flexGrow: 1, padding: "20px" }}>
        <AdminRoutes />
      </main>
    </div>
  );
};

export default AdminLayout;
