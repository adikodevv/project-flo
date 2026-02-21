import React from "react";
import { useMain } from "../../context/MainContext";

const Products = () => {
  const { t } = useMain();

  return <div>{t("page_products_title")}</div>;
};

export default Products;
