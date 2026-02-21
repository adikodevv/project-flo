import React from "react";
import { useMain } from "../../context/MainContext";

const News = () => {
  const { t } = useMain();

  return <div>{t("page_news_title")}</div>;
};

export default News;
