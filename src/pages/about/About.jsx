import React from "react";
import scss from "./About.module.scss";
import roza from "../../assets/img/roza.jpg";
import pink from "../../assets/img/pink.webp";
import img from "../../assets/img/img_2801.webp";
import ff from "../../assets/img/5780.jpg";
import kk from "../../assets/img/IMG_2281.jpg";
import bo from "../../assets/img/2-b0.jpg";
import ww from "../../assets/img/4475_1.jpg";
import rr from "../../assets/img/jpeg.webp";
import vp from "../../assets/img/vpiaz.webp";
import eb from "../../assets/img/6eb.png";
import aa from "../../assets/img/168613.jpg";
import nn from "../../assets/img/7ut4.webp";
import ov from "../../assets/img/0v4.jpg";
import ab from "../../assets/img/1a3b.jpg";
import cj from "../../assets/img/3-1c.jpg";
import cz from "../../assets/img/1cz.jpg";
import rt from "../../assets/img/5420.jpg";
import ad from "../../assets/img/ad_4nx.jpg";
import { NavLink } from "react-router-dom";
const About = () => {
  return (
    <div className={scss.about}>
      <div className={scss.parallaxBackground}></div>
      <div className={scss.aboutContent}>
        <h1>Наш мир цветов</h1>
        <p>
          Наш Цветочный Мир – История Любви к Цветам. Наша история началась с
          маленькой мечты и огромной страсти к прекрасному. Всё началось с
          простого желания: создавать не просто букеты, а настоящие эмоции,
          радость и незабываемые впечатления для каждого, кто любит цветы. Мы
          верим, что цветы — это язык, на котором говорят чувства, и наша миссия
          — помочь каждому передать эти чувства с помощью наших композиций.
        </p>
      </div>
      <div className={scss.tt}>
        <p>
          С первых дней мы открыли мастерскую с уютной атмосферой, где каждый
          букет собирается вручную с особой заботой. Мы тщательно выбираем
          каждый цветок, проверяем его свежесть и сочетаем с уникальными
          декоративными элементами, чтобы создавать композиции, которые вызывают
          восхищение и улыбку.
        </p>
      </div>
      <div className={scss.hh}>
        <h1>Мы гордимся тем, что можем предложить широкий ассортимент:</h1>
        <h2>
          <span>💐 Авторские дизайнерские букеты</span> — каждый уникален,
          создан с любовью.
        </h2>
        <img src={pink} alt="" />
        <img src={img} alt="" />
        <img src={ff} alt="" />
        {/* <img src={kk} alt="" /> */}
      </div>
      <div className={scss.ab}>
        <h2>
          <span>🌹 Премиальные розы</span> — только свежие и качественные цветы.
        </h2>
        <img src={bo} alt="" />
        <img src={ww} alt="" />
        <img src={rr} alt="" />
      </div>
      <div className={scss.l}>
        <h2>
          <span>🌷 Сезонные композиции</span> — красота природы в каждом букете.
        </h2>
        <img src={vp} alt="" />
        <img src={eb} alt="" />
        <img src={aa} alt="" />
        {/* <img src={nn} alt="" /> */}
      </div>
      <div className={scss.qq}>
        <h2>
          <span>🎁 Цветы в коробках </span>— стильный и современный подарок.
        </h2>
        <img src={ov} alt="" />
        <img src={ab} alt="" />
        <img src={cj} alt="" />
      </div>
      <div className={scss.e}>
        <h2>
          <span>🌺 Индивидуальные заказы</span> — полностью под ваш вкус и
          стиль.
        </h2>
        <img src={cz} alt="" />
        <img src={rt} alt="" />
        <img src={ad} alt="" />
      </div>
      <div className={scss.s}>
        <h1>
          Наши клиенты ценят нас за внимание к деталям, качество и надежность.
          Мы постоянно развиваемся, следим за мировыми трендами флористики,
          участвуем в мастер-классах и выставках, чтобы каждый букет был не
          просто красивым, а настоящим произведением искусства.
        </h1>
      </div>
      <div className={scss.gh}>
        <h1>
          Помимо качественных цветов, мы заботимся о приятных бонусах для наших
          клиентов:
        </h1>
        <div className={scss.j}>
          <h2>🔥 Букет недели со скидкой</h2>
          <h2>💝 Подарок к каждому заказу</h2>
          <h2>🚚 Бесплатная доставка по городу</h2>
          <h2>🎀 Специальные предложения к праздникам</h2>
          <h1>
            Для нас каждый заказ — это возможность подарить частичку счастья и
            радости. Мы верим, что цветы способны менять настроение, объединять
            людей и создавать воспоминания на всю жизнь.
          </h1>
          <p>
            Мы любим то, что делаем, и хотим делиться этой любовью с вами. Добро
            пожаловать в наш цветочный мир, где каждый лепесток рассказывает
            историю, а каждый букет — это эмоция, сохраненная на долгие годы.
          </p>
        </div>
      </div>
      <NavLink to="/coman">
        <button>💐 Наша команда</button>
      </NavLink>
    </div>
  );
};

export default About;
