import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMain } from "../../context/MainContext";
import scss from "./CheckOut.module.scss";
import { addOrderToStorage, generateOrderId } from "../../utils/orderStorage";

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const defaultForm = {
  name: "",
  phone: "",
  address: "",
  deliveryDate: "",
  deliveryTime: "",
  payment: "cash",
  comment: "",
};

const timeSlots = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const paymentLabelByCode = {
  cash: "checkout_payment_cash",
  card: "checkout_payment_card",
  online: "checkout_payment_online",
};

const formatItemLine = (item, currency) => {
  const quantity = Number(item.quantity || 1);
  const total = Number(item.price || 0) * quantity;
  return `- ${item.name}: ${quantity} x ${Number(item.price || 0).toLocaleString()} ${currency} = ${total.toLocaleString()} ${currency}`;
};

const sendTelegramMessage = async (message) => {
  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    },
  );

  const result = await response.json();
  if (!response.ok || !result?.ok) {
    throw new Error(result?.description || "Telegram send error");
  }
};

const CheckOut = () => {
  const navigate = useNavigate();
  const { cart, t } = useMain();
  const [formData, setFormData] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = Array.isArray(cart)
    ? cart.reduce(
        (acc, item) =>
          acc + Number(item.price || 0) * Number(item.quantity || 0),
        0,
      )
    : 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!Array.isArray(cart) || cart.length === 0) return;
    if (isSubmitting) return;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      alert(t("checkout_telegram_config_error"));
      return;
    }

    const paymentKey =
      paymentLabelByCode[formData.payment] || "checkout_payment_cash";
    const currency = t("currency");
    const itemsText = cart
      .map((item) => formatItemLine(item, currency))
      .join("\n");
    const commentText = formData.comment ? formData.comment : "-";
    const message = [
      "New order Floriva",
      "",
      `${t("checkout_name")}: ${formData.name}`,
      `${t("checkout_phone")}: ${formData.phone}`,
      `${t("checkout_address")}: ${formData.address}`,
      `${t("checkout_date")}: ${formData.deliveryDate}`,
      `${t("checkout_time")}: ${formData.deliveryTime}`,
      `${t("checkout_payment_title")}: ${t(paymentKey)}`,
      `${t("checkout_comment")}: ${commentText}`,
      "",
      `${t("checkout_summary_title")}:`,
      itemsText,
      "",
      `${t("checkout_total")}: ${totalPrice.toLocaleString()} ${currency}`,
    ].join("\n");

    try {
      setIsSubmitting(true);
      await sendTelegramMessage(message);

      addOrderToStorage({
        id: generateOrderId(),
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
        payment: formData.payment,
        comment: formData.comment,
        status: "new",
        totalPrice,
        createdAt: new Date().toISOString(),
        items: cart.map((item) => ({
          name: item.name,
          price: Number(item.price || 0),
          quantity: Number(item.quantity || 1),
          image: item.image || "",
        })),
      });

      alert(t("checkout_success_alert"));
      setFormData(defaultForm);
      navigate("/");
    } catch (error) {
      console.error("Telegram order send error:", error);
      alert(t("checkout_telegram_send_error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <section className={scss.checkoutPage}>
        <div className={scss.container}>
          <div className={scss.empty}>
            <h1>{t("checkout_empty_title")}</h1>
            <p>{t("checkout_empty_text")}</p>
            <NavLink to="/catalog" className={scss.catalogLink}>
              {t("checkout_go_catalog")}
            </NavLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={scss.checkoutPage}>
      <div className={scss.container}>
        <h1 className={scss.pageTitle}>{t("page_checkout_title")}</h1>

        <div className={scss.grid}>
          <form className={scss.formCard} onSubmit={handleSubmit}>
            <h2 className={scss.sectionTitle}>{t("checkout_customer_title")}</h2>

            <label className={scss.field}>
              <span>{t("checkout_name")}</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className={scss.field}>
              <span>{t("checkout_phone")}</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label className={scss.field}>
              <span>{t("checkout_address")}</span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>

            <div className={scss.row}>
              <label className={scss.field}>
                <span>{t("checkout_date")}</span>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className={scss.field}>
                <span>{t("checkout_time")}</span>
                <select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t("checkout_time_placeholder")}</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className={scss.payments}>
              <legend className={scss.legend}>{t("checkout_payment_title")}</legend>

              <div className={scss.paymentList}>
                <label className={scss.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={formData.payment === "cash"}
                    onChange={handleChange}
                  />
                  <span>{t("checkout_payment_cash")}</span>
                </label>

                <label className={scss.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.payment === "card"}
                    onChange={handleChange}
                  />
                  <span>{t("checkout_payment_card")}</span>
                </label>

                <label className={scss.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={formData.payment === "online"}
                    onChange={handleChange}
                  />
                  <span>{t("checkout_payment_online")}</span>
                </label>
              </div>
            </fieldset>

            <label className={scss.field}>
              <span>{t("checkout_comment")}</span>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder={t("checkout_comment_placeholder")}
                rows={4}
              />
            </label>

            <button
              type="submit"
              className={scss.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("checkout_submit_sending")
                : t("checkout_submit")}
            </button>
          </form>

          <aside className={scss.summaryCard}>
            <h2>{t("checkout_summary_title")}</h2>

            <div className={scss.items}>
              {cart.map((item) => (
                <div
                  key={item._id || item.id || item.name}
                  className={scss.itemRow}
                >
                  <div className={scss.itemInfo}>
                    <h4 className={scss.itemName}>{item.name}</h4>
                    <p className={scss.itemMeta}>
                      {t("checkout_item_qty", { count: item.quantity || 1 })}
                    </p>
                  </div>
                  <strong className={scss.itemPrice}>
                    {(
                      Number(item.price || 0) * Number(item.quantity || 1)
                    ).toLocaleString()}{" "}
                    {t("currency")}
                  </strong>
                </div>
              ))}
            </div>

            <div className={scss.totals}>
              <div>
                <span>{t("checkout_items_count")}</span>
                <span>{cart.length}</span>
              </div>
              <div>
                <span>{t("checkout_delivery")}</span>
                <span>{t("checkout_delivery_free")}</span>
              </div>
              <div className={scss.finalTotal}>
                <span>{t("checkout_total")}</span>
                <span>
                  {totalPrice.toLocaleString()} {t("currency")}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
