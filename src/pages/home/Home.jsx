import { useState, useEffect } from "react";
import scss from "./Home.module.scss";
import byket from "../../assets/img/byket.png";
import byke from "../../assets/img/byke.jpg";
import byk from "../../assets/img/byk.jpg";
import by from "../../assets/img/by.webp";
import b from "../../assets/img/b.webp";
import flo from "../../assets/img/flo.jpg";
import flor from "../../assets/img/flor.avif";
import del from "../../assets/img/deliv.png";
import bb from "../../assets/img/bb.webp";
import { NavLink } from "react-router-dom";
import vv from "../../assets/img/3182.jpg";
import dd from "../../assets/img/DSC_2695.webp";
import dad from "../../assets/img/67f26d0621dab.jpg";
import sas from "../../assets/img/7937.jpg";

const sliderImages = [byket, byke, vv, dd, b];

const Home = () => {
  const [current, setCurrent] = useState(0);

  // Автопрокрутка слайдера
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={scss.home}>
      {/* ------------------ Слайдер ------------------ */}
      <div className={scss.slider}>
        {sliderImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Букет ${idx + 1}`}
            className={idx === current ? scss.active : ""}
          />
        ))}
      </div>
      <div className={scss.l}>
        <h1>Добро пожаловать в Floriva</h1>
        <p>
          Мир нежности и красоты! Свежие букеты премиум-качества, созданные с
          любовью, прямо к вашей двери. Пусть каждый день будет наполнен
          цветочной магией 🌸
        </p>
      </div>
      <div className={scss.wao}>
        <h1>Как наши цветы попадают в ваши руки 🌹</h1>
        <div className={scss.steps}>
          <div className={scss.step}>
            <img src={flo} alt="" />
            <h3>
              <span>Выбор и сбор</span> – каждый цветок отбираем вручную
            </h3>
          </div>
          <div className={scss.step}>
            <img src={flor} alt="" />
            <h3>
              <span>Аккуратная упаковка</span> – букеты упаковываются стильно
            </h3>
          </div>
          <div className={scss.step}>
            <img src={del} alt="" />
            <h3>
              <span>Быстрая доставка</span> – цветы доставляются точно в срок
            </h3>
          </div>
          <div className={scss.step}>
            <img src={bb} alt="" />
            <h3>
              <span>Любовь в каждом лепестке</span> – каждый букет передает
              заботу
            </h3>
          </div>
        </div>
      </div>
      <div className={scss.cta}>
        <h1>
          Закажите свой букет уже сегодня и почувствуйте магию свежих цветов
          прямо у себя дома!
        </h1>
        <NavLink to="/delivery">Доставка и оплата</NavLink>
        <NavLink to="/about">О Нас</NavLink>
      </div>

      <div className={scss.hut}>
        <h1>Хит продажи 🔥</h1>

        <div className={scss.hitSales}>
          {/* Карточка 1 */}
          <div className={scss.card}>
            <img src={dad} alt="Букет Розовая магия" />
            <h3>Букет «Розовая магия»</h3>
            <p>Розы и свежие зелёные веточки</p>
            <span className={scss.price}>2 500 ₽</span>
            <button>Купить сейчас</button>
            <span className={scss.label}>Хит</span>
          </div>

          {/* Карточка 2 */}
          <div className={scss.card}>
            <img src={sas} alt="Букет Солнечный день" />
            <h3>Букет «Солнечный день»</h3>
            <p>Герберы, хризантемы и зелень</p>
            <span className={scss.price}>2 200 ₽</span>
            <button>Купить сейчас</button>
            <span className={scss.label}>🔥 Популярно</span>
          </div>

          {/* Карточка 3 */}
          <div className={scss.card}>
            <img src={byk} alt="Букет Нежность" />
            <h3>Букет «Нежность»</h3>
            <p>Розы в мягких тонах</p>
            <span className={scss.price}>3 000 ₽</span>
            <button>Купить сейчас</button>
            <span className={scss.label}>Хит</span>
          </div>

          {/* Карточка 4 */}
          <div className={scss.card}>
            <img src={by} alt="Букет Весеннее утро" />
            <h3>Букет «Весеннее утро»</h3>
            <p>Красные метровые розы </p>
            <span className={scss.price}>2 700 ₽</span>
            <button>Купить сейчас</button>
            <span className={scss.label}>🔥 Популярно</span>
          </div>
        </div>
      </div>
      <div className={scss.g}>
        <iframe
          title="Maximum Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.6501807969735!2d74.58452522649634!3d42.88022719282873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec81915eaf75d%3A0x9bfedde3851dcd21!2sMaximum!5e0!3m2!1sru!2skg!4v1771136787271!5m2!1sru!2skg"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "12px" }} // скруглённые углы
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Home;
