import React, { useEffect, useState } from "react";
import scss from "./Delivery.module.scss";
import {
  FaTruck,
  FaCreditCard,
  FaMoneyBillAlt,
  FaPaypal,
} from "react-icons/fa";
import { useMain } from "../../context/MainContext";

const Delivery = () => {
  const { t } = useMain();
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.index);
          setVisibleCards((prev) =>
            prev.includes(index) ? prev : [...prev, index],
          );
        });
      },
      { threshold: 0.2 },
    );

    const cards = document.querySelectorAll(`.${scss.card}`);
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const deliveryOptions = [
    {
      icon: <FaTruck />,
      title: t("delivery_fast_title"),
      description: t("delivery_fast_desc"),
    },
    {
      icon: <FaCreditCard />,
      title: t("delivery_card_title"),
      description: t("delivery_card_desc"),
    },
    {
      icon: <FaMoneyBillAlt />,
      title: t("delivery_cash_title"),
      description: t("delivery_cash_desc"),
    },
    {
      icon: <FaPaypal />,
      title: t("delivery_paypal_title"),
      description: t("delivery_paypal_desc"),
    },
  ];

  return (
    <div className={scss.delivery}>
      <h2>{t("delivery_title")} 🌸</h2>
      <div className={scss.cards}>
        {deliveryOptions.map((option, index) => (
          <div
            key={index}
            className={`${scss.card} ${visibleCards.includes(index) ? scss.show : ""}`}
            data-index={index}
          >
            <div className={scss.icon}>{option.icon}</div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Delivery;
