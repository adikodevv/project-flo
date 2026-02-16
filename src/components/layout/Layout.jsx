import React from "react";
import Header from "./header/Header";
import MainRoutes from "../../routes/MainRoutes";
import Footer from "./footer/Footer";
import ScrollToTop from "./ScrollToTop/ScrollToTop";

const Layout = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <main>
        <MainRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
