import React, { useEffect, useMemo, useState } from "react";
import scss from "./Contact.module.scss";
import { useMain } from "../../context/MainContext";

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const CONTACT_BENEFIT_KEYS = [
  "contact_benefit_1",
  "contact_benefit_2",
  "contact_benefit_3",
  "contact_benefit_4",
  "contact_benefit_5",
  "contact_benefit_6",
];

const CONTACT_FAQ_CONFIG = [
  {
    questionKey: "contact_faq_1_q",
    answerKey: "contact_faq_1_a",
  },
  {
    questionKey: "contact_faq_2_q",
    answerKey: "contact_faq_2_a",
  },
  {
    questionKey: "contact_faq_3_q",
    answerKey: "contact_faq_3_a",
  },
];

const Contact = () => {
  const { t } = useMain();
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const phrases = useMemo(
    () => [
      t("contact_phrase_1"),
      t("contact_phrase_2"),
      t("contact_phrase_3"),
      t("contact_phrase_4"),
    ],
    [t],
  );

  const contactFaq = useMemo(
    () =>
      CONTACT_FAQ_CONFIG.map((item) => ({
        question: t(item.questionKey),
        answer: t(item.answerKey),
      })),
    [t],
  );

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex] || "";

    if (charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 60);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setText("");
      setCharIndex(0);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [charIndex, phraseIndex, phrases]);

  const sendTelegramMessage = async () => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      alert(t("checkout_telegram_config_error"));
      return;
    }

    const message = `${t("contact_msg_new_request")} Floriva:\n${t("contact_msg_name")}: ${t("contact_msg_visitor")}\n${t("contact_msg_phone")}: +996 702 126 311\n${t("contact_msg_email")}: info@floriva.kg`;

    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`,
      );
      alert(t("contact_alert_sent"));
    } catch (err) {
      console.error(err);
      alert(t("contact_alert_error"));
    }
  };

  return (
    <div className={scss.contact}>
      <div className={scss.container}>
        <h1 className={scss.title}>{t("contact_title")} 💌</h1>

        <p className={scss.typeText}>{text}</p>

        <div className={scss.info}>
          <div className={scss.card}>
            <h3>{t("contact_phone_label")}</h3>
            <p>+996 702 126 311</p>
            <div className={scss.hearts}></div>
          </div>

          <div className={scss.card}>
            <h3>{t("contact_email_label")}</h3>
            <p>info@floriva.kg</p>
            <div className={scss.hearts}></div>
          </div>

          <div className={scss.card}>
            <h3>{t("contact_address_label")}</h3>
            <p>{t("contact_address")}</p>
            <div className={scss.hearts}></div>
          </div>

          <div
            className={scss.card}
            style={{ cursor: "pointer" }}
            onClick={sendTelegramMessage}
          >
            <h3>{t("contact_telegram_label")}</h3>
            <p>{t("contact_telegram_action")}</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
              alt="Telegram"
              style={{ width: "40px", marginTop: "10px" }}
            />
          </div>
        </div>

        <section className={scss.benefits}>
          <h2>{t("contact_benefits_title")}</h2>
          <div className={scss.benefitList}>
            {CONTACT_BENEFIT_KEYS.map((key) => (
              <span key={key} className={scss.benefitChip}>
                {t(key)}
              </span>
            ))}
          </div>
        </section>

        <section className={scss.detailsGrid}>
          <article className={scss.detailCard}>
            <h3>{t("contact_schedule_title")}</h3>
            <ul className={scss.detailList}>
              <li>
                <strong>{t("contact_schedule_weekdays_label")}:</strong>{" "}
                {t("contact_schedule_weekdays_value")}
              </li>
              <li>
                <strong>{t("contact_schedule_weekend_label")}:</strong>{" "}
                {t("contact_schedule_weekend_value")}
              </li>
              <li>
                <strong>{t("contact_schedule_night_label")}:</strong>{" "}
                {t("contact_schedule_night_value")}
              </li>
            </ul>
          </article>

          <article className={scss.detailCard}>
            <h3>{t("contact_delivery_title")}</h3>
            <ul className={scss.detailList}>
              <li>{t("contact_delivery_area_1")}</li>
              <li>{t("contact_delivery_area_2")}</li>
              <li>{t("contact_delivery_area_3")}</li>
            </ul>
          </article>

          <article className={scss.detailCard}>
            <h3>{t("contact_links_title")}</h3>
            <div className={scss.linkGroup}>
              <a href="tel:+996702126311">
                {t("contact_links_call", { phone: "+996 702 126 311" })}
              </a>
              <a href="mailto:info@floriva.kg">
                {t("contact_links_email", { email: "info@floriva.kg" })}
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contact_links_instagram")}
              </a>
            </div>
          </article>
        </section>

        <section className={scss.faq}>
          <h2>{t("contact_faq_title")}</h2>
          <div className={scss.faqGrid}>
            {contactFaq.map((item) => (
              <article key={item.question} className={scss.faqItem}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
