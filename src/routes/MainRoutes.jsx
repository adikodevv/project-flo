import React from "react";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Register from "../pages/Auth/register/Register";
import Cart from "../pages/cart/Cart";
import Products from "../pages/products/Products";
import Login from "../pages/Auth/login/Login";
import CheckOut from "../pages/checkOut/CheckOut";
import Catalog from "../pages/catalog/Catalog";
import Boxes from "../pages/boxes/Boxes";
import Delivery from "../pages/delivery/Delivery";
import Sets from "../pages/boxes/sets/Sets";
import { Route, Routes } from "react-router-dom";
import Favorites from "../pages/favorites/Favorites";
import Coman from "../pages/about/coman/Coman";

const MainRoutes = () => {
  const routes = [
    {
      link: "/",
      element: <Home />,
    },
    {
      link: "/about",
      element: <About />,
    },
    {
      link: "/boxes",
      element: <Boxes />,
    },
    {
      link: "/contact",
      element: <Contact />,
    },
    {
      link: "/register",
      element: <Register />,
    },
    {
      link: "/cart",
      element: <Cart />,
    },
    {
      link: "/products",
      element: <Products />,
    },
    {
      link: "/login",
      element: <Login />,
    },
    {
      link: "/checkOut",
      element: <CheckOut />,
    },
    {
      link: "/catalog",
      element: <Catalog />,
    },
    {
      link: "/delivery",
      element: <Delivery />,
    },
    {
      link: "/sets",
      element: <Sets />,
    },
    {
      link: "/favorites",
      element: <Favorites />,
    },
    {
      link: "/coman",
      element: <Coman />,
    },
  ];
  return (
    <div>
      <Routes>
        {routes.map((item) => (
          <Route path={item.link} element={item.element} />
        ))}
      </Routes>
    </div>
  );
};

export default MainRoutes;
