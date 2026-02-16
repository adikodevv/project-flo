import React, { useEffect, useState } from "react";
import scss from "./Contact.module.scss";

const phrases = [
  "Цветы говорят громче слов 🌷",
  "Создаём эмоции в каждом букете 💖",
  "Твоя история начинается здесь ✨",
  "Дарите любовь красиво 🌸",
];

const TELEGRAM_BOT_TOKEN = "8454470549:AAHzwIPIqrLNXAtlaajf_3mHHcY_7widXmk"; // твой токен
const TELEGRAM_CHAT_ID = "ВАШ_CHAT_ID"; // сюда вставь свой chat_id

const Contact = () => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 60);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setText("");
        setCharIndex(0);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
    }
  }, [charIndex, phraseIndex]);

  const sendTelegramMessage = async () => {
    const message = `💌 Новый запрос с сайта Flovira:
Имя: Посетитель
Телефон: +996 702 126 311
Email: info@floriva.kg`;

    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(
          message,
        )}`,
      );
      alert("Сообщение отправлено в Telegram!");
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке сообщения");
    }
  };

  return (
    <div className={scss.contact}>
      <div className={scss.container}>
        <h1 className={scss.title}>Свяжитесь с нами 💌</h1>

        <p className={scss.typeText}>{text}</p>

        <div className={scss.info}>
          <div className={scss.card}>
            <h3>📞 Телефон</h3>
            <p>+996 702 126 311</p>
            <div className={scss.hearts}></div>
          </div>

          <div className={scss.card}>
            <h3>📧 Email</h3>
            <p>info@floriva.kg</p>
            <div className={scss.hearts}></div>
          </div>

          <div className={scss.card}>
            <h3>📍 Адрес</h3>
            <p>Бишкек, ул. Цветочная 25</p>
            <div className={scss.hearts}></div>
          </div>

          <div
            className={scss.card}
            style={{ cursor: "pointer" }}
            onClick={sendTelegramMessage}
          >
            <h3>💬 Telegram</h3>
            <p>Отправить сообщение в бот</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
              alt="Telegram"
              style={{ width: "40px", marginTop: "10px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
