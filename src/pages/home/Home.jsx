import { useEffect, useMemo, useRef, useState } from "react";
import scss from "./Home.module.scss";
import ob from "../../assets/img/1b.jpg";
import byk from "../../assets/img/byk.jpg";
import by from "../../assets/img/by.webp";
import or from "../../assets/img/orig.webp";
import flor from "../../assets/img/flor.avif";
import del from "../../assets/img/deliv.png";
import bb from "../../assets/img/bb.webp";
import { NavLink } from "react-router-dom";
import dad from "../../assets/img/67f26d0621dab.jpg";
import sas from "../../assets/img/7937.jpg";
import { useMain } from "../../context/MainContext";
import flo from "../../assets/img/flo.jpg";
// import yy from "../../assets/img/5y11j.jpeg";
// import ll from "../../assets/img/1000.webp";
import ki from "../../assets/img/ki-2.jpg";
import mm from "../../assets/img/mm3.webp";
import te from "../../assets/img/te-3.jpg";
import mv from "../../assets/img/mv2.avif";
import pop from "../../assets/img/IMG_00.jpg";
import Sets from "../boxes/sets/Sets";
import Boxes from "../boxes/Boxes";

const sliderImages = [ki, ob, or];
const SLIDER_CAPTION_KEYS = [
  "home_slider_caption_1",
  "home_slider_caption_2",
  "home_slider_caption_3",
];
const WHY_CHOOSE_STATS_CONFIG = [
  {
    id: "clients",
    value: 100000,
    suffixKey: "home_stats_suffix_plus",
    labelKey: "home_stats_clients",
  },
  {
    id: "experience",
    value: 5,
    suffixKey: "home_stats_suffix_years",
    labelKey: "home_stats_experience",
  },
  {
    id: "bouquets",
    value: 5000,
    suffixKey: "home_stats_suffix_plus",
    labelKey: "home_stats_bouquets",
  },
  {
    id: "delivery",
    value: 98,
    suffixKey: "home_stats_suffix_percent",
    labelKey: "home_stats_delivery",
  },
  {
    id: "support",
    value: 24,
    suffixKey: "home_stats_suffix_24_7",
    labelKey: "home_stats_support",
  },
];
const HOME_REVIEWS_STORAGE_KEY = "home_reviews";
const HOME_REVIEWS_CLIENT_KEY = "home_reviews_client_id";
const LANGUAGE_LOCALES = {
  RU: "ru-RU",
  EN: "en-US",
  KG: "ky-KG",
};
const createEntityId = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const parseStoredReviews = (rawValue) => {
  try {
    const parsed = JSON.parse(rawValue || "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => ({
        id: item?.id || createEntityId(),
        name: String(item?.name || "").trim(),
        text: String(item?.text || "").trim(),
        createdAt: String(item?.createdAt || ""),
        authorClientId: String(item?.authorClientId || "").trim(),
      }))
      .filter((item) => item.name.length > 0 && item.text.length > 0);
  } catch {
    return [];
  }
};

const getOrCreateReviewsClientId = () => {
  if (typeof window === "undefined") return "";

  const storedClientId = localStorage.getItem(HOME_REVIEWS_CLIENT_KEY);
  if (storedClientId) return storedClientId;

  const newClientId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `client-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;

  localStorage.setItem(HOME_REVIEWS_CLIENT_KEY, newClientId);
  return newClientId;
};

const MARCH8_PROMO_IDEA_CONFIG = [
  {
    emoji: "👩",
    titleKey: "home_march8_idea_1_title",
    descriptionKey: "home_march8_idea_1_desc",
    image: mm,
  },
  {
    emoji: "❤️",
    titleKey: "home_march8_idea_2_title",
    descriptionKey: "home_march8_idea_2_desc",
    image: te,
  },
  {
    emoji: "👭",
    titleKey: "home_march8_idea_3_title",
    descriptionKey: "home_march8_idea_3_desc",
    image: mv,
  },
  {
    emoji: "👩‍💼",
    titleKey: "home_march8_idea_4_title",
    descriptionKey: "home_march8_idea_4_desc",
    image: pop,
  },
];
const SPECIAL_OFFERS_CONFIG = [
  {
    badgeKey: "home_offer_1_badge",
    titleKey: "home_offer_1_title",
    descriptionKey: "home_offer_1_desc",
  },
  {
    badgeKey: "home_offer_2_badge",
    titleKey: "home_offer_2_title",
    descriptionKey: "home_offer_2_desc",
  },
  {
    badgeKey: "home_offer_3_badge",
    titleKey: "home_offer_3_title",
    descriptionKey: "home_offer_3_desc",
  },
  {
    badgeKey: "home_offer_4_badge",
    titleKey: "home_offer_4_title",
    descriptionKey: "home_offer_4_desc",
  },
  {
    badgeKey: "home_offer_5_badge",
    titleKey: "home_offer_5_title",
    descriptionKey: "home_offer_5_desc",
  },
  {
    badgeKey: "home_offer_6_badge",
    titleKey: "home_offer_6_title",
    descriptionKey: "home_offer_6_desc",
  },
  {
    badgeKey: "home_offer_7_badge",
    titleKey: "home_offer_7_title",
    descriptionKey: "home_offer_7_desc",
  },
  {
    badgeKey: "home_offer_8_badge",
    titleKey: "home_offer_8_title",
    descriptionKey: "home_offer_8_desc",
  },
];
const WHY_BENEFIT_KEYS = [
  "home_benefit_1",
  "home_benefit_2",
  "home_benefit_3",
  "home_benefit_4",
];

const getNextMarch8Date = (fromDate = new Date()) => {
  const target = new Date(fromDate.getFullYear(), 2, 8, 0, 0, 0, 0);

  if (fromDate.getTime() >= target.getTime()) {
    target.setFullYear(target.getFullYear() + 1);
  }

  return target;
};

const getMarch8Countdown = () => {
  const now = new Date();
  const targetDate = getNextMarch8Date(now);
  const diffMs = Math.max(0, targetDate.getTime() - now.getTime());

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    targetYear: targetDate.getFullYear(),
  };
};

const formatCountdownValue = (value) => String(value).padStart(2, "0");

const Home = () => {
  const { t, language, addToCart } = useMain();
  const [current, setCurrent] = useState(0);
  const [reviewsClientId] = useState(() => getOrCreateReviewsClientId());
  const [reviews, setReviews] = useState(() => {
    if (typeof window === "undefined") return [];
    const clientId = getOrCreateReviewsClientId();
    const storedReviews = parseStoredReviews(
      localStorage.getItem(HOME_REVIEWS_STORAGE_KEY),
    );
    return storedReviews.map((item) =>
      item.authorClientId
        ? item
        : {
            ...item,
            authorClientId: clientId,
          },
    );
  });
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [march8Countdown, setMarch8Countdown] = useState(() =>
    getMarch8Countdown(),
  );
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(() =>
    WHY_CHOOSE_STATS_CONFIG.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {}),
  );
  const whyChooseUsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = () => setMarch8Countdown(getMarch8Countdown());

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(HOME_REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    const section = whyChooseUsRef.current;
    if (!section || isStatsVisible) return;

    let observer;

    const triggerStatsAnimation = () => {
      setIsStatsVisible(true);
    };

    const checkVisibility = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const isVisible =
        rect.top <= viewportHeight * 0.85 &&
        rect.bottom >= viewportHeight * 0.2;

      if (isVisible) {
        triggerStatsAnimation();
        return true;
      }

      return false;
    };

    if (checkVisibility()) return;

    const handleScrollCheck = () => {
      checkVisibility();
    };

    window.addEventListener("scroll", handleScrollCheck, { passive: true });
    window.addEventListener("resize", handleScrollCheck);

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (!entry?.isIntersecting) return;
          triggerStatsAnimation();
        },
        { threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
      );

      observer.observe(section);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollCheck);
      window.removeEventListener("resize", handleScrollCheck);
      if (observer) observer.disconnect();
    };
  }, [isStatsVisible]);

  useEffect(() => {
    if (!isStatsVisible) return;

    const duration = 1400;
    const startTime = performance.now();
    const finalValues = WHY_CHOOSE_STATS_CONFIG.reduce((acc, item) => {
      acc[item.id] = item.value;
      return acc;
    }, {});
    let rafId;

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      if (progress >= 1) {
        setAnimatedStats(finalValues);
        return;
      }

      setAnimatedStats(() =>
        WHY_CHOOSE_STATS_CONFIG.reduce((acc, item) => {
          acc[item.id] = Math.round(item.value * easedProgress);
          return acc;
        }, {}),
      );

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isStatsVisible]);

  const steps = useMemo(
    () => [
      {
        image: flo,
        title: t("home_step_pick_title"),
        description: t("home_step_pick_desc"),
      },
      {
        image: flor,
        title: t("home_step_pack_title"),
        description: t("home_step_pack_desc"),
      },
      {
        image: del,
        title: t("home_step_delivery_title"),
        description: t("home_step_delivery_desc"),
      },
      {
        image: bb,
        title: t("home_step_care_title"),
        description: t("home_step_care_desc"),
      },
    ],
    [t],
  );

  const hitCards = useMemo(
    () => [
      {
        image: dad,
        name: t("home_hit_1_name"),
        description: t("home_hit_1_desc"),
        price: 4500,
        label: t("home_hit_1_label"),
      },
      {
        image: sas,
        name: t("home_hit_2_name"),
        description: t("home_hit_2_desc"),
        price: 3200,
        label: t("home_hit_2_label"),
      },
      {
        image: byk,
        name: t("home_hit_3_name"),
        description: t("home_hit_3_desc"),
        price: 7000,
        label: t("home_hit_3_label"),
      },
      {
        image: by,
        name: t("home_hit_4_name"),
        description: t("home_hit_4_desc"),
        price: 5700,
        label: t("home_hit_4_label"),
      },
    ],
    [t],
  );

  const sliderCaptions = useMemo(
    () => SLIDER_CAPTION_KEYS.map((key) => t(key)),
    [t],
  );

  const whyChooseStats = useMemo(
    () =>
      WHY_CHOOSE_STATS_CONFIG.map((item) => ({
        ...item,
        suffix: t(item.suffixKey),
        label: t(item.labelKey),
      })),
    [t],
  );

  const march8PromoIdeas = useMemo(
    () =>
      MARCH8_PROMO_IDEA_CONFIG.map((item) => ({
        ...item,
        title: t(item.titleKey),
        description: t(item.descriptionKey),
      })),
    [t],
  );

  const specialOffers = useMemo(
    () =>
      SPECIAL_OFFERS_CONFIG.map((item) => ({
        badge: t(item.badgeKey),
        title: t(item.titleKey),
        description: t(item.descriptionKey),
      })),
    [t],
  );

  const reviewDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(LANGUAGE_LOCALES[language] || "ru-RU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    [language],
  );

  const formatReviewDate = (dateValue) => {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "";
    return reviewDateFormatter.format(date);
  };

  const isReviewOwner = (review) =>
    Boolean(review?.authorClientId) &&
    Boolean(reviewsClientId) &&
    review.authorClientId === reviewsClientId;

  const handleSubmitReview = (event) => {
    event.preventDefault();

    const safeName = reviewName.trim();
    const safeText = reviewText.trim();
    const activeClientId = reviewsClientId || getOrCreateReviewsClientId();

    if (!safeName || !safeText) {
      alert(t("home_reviews_alert_fill"));
      return;
    }

    if (editingReviewId) {
      const reviewToEdit = reviews.find((item) => item.id === editingReviewId);

      if (!reviewToEdit || reviewToEdit.authorClientId !== activeClientId) {
        alert(t("home_reviews_alert_owner_edit"));
        handleCancelEdit();
        return;
      }

      setReviews((prev) =>
        prev.map((item) =>
          item.id === editingReviewId && item.authorClientId === activeClientId
            ? {
                ...item,
                name: safeName.slice(0, 40),
                text: safeText.slice(0, 350),
              }
            : item,
        ),
      );
      setEditingReviewId(null);
      setReviewName("");
      setReviewText("");
      alert(t("home_reviews_alert_updated"));
      return;
    }

    const newReview = {
      id: createEntityId(),
      name: safeName.slice(0, 40),
      text: safeText.slice(0, 350),
      createdAt: new Date().toISOString(),
      authorClientId: activeClientId,
    };

    setReviews((prev) => [newReview, ...prev].slice(0, 30));
    setReviewName("");
    setReviewText("");
    alert(t("home_reviews_alert_success"));
  };

  const handleDeleteReview = (reviewId) => {
    const reviewToDelete = reviews.find((item) => item.id === reviewId);

    if (!reviewToDelete || !isReviewOwner(reviewToDelete)) {
      alert(t("home_reviews_alert_owner_delete"));
      return;
    }

    if (editingReviewId === reviewId) {
      setEditingReviewId(null);
      setReviewName("");
      setReviewText("");
    }
    setReviews((prev) => prev.filter((item) => item.id !== reviewId));
  };

  const handleStartEditReview = (review) => {
    if (!isReviewOwner(review)) {
      alert(t("home_reviews_alert_owner_edit"));
      return;
    }

    setEditingReviewId(review.id);
    setReviewName(review.name);
    setReviewText(review.text);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setReviewName("");
    setReviewText("");
  };

  return (
    <div className={scss.home}>
      <p className={scss.sliderPromo}>{t("home_slider_caption_1")}</p>
      <div className={scss.slider}>
        {sliderImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={t("home_slider_alt", { index: idx + 1 })}
            className={idx === current ? scss.active : ""}
          />
        ))}
        {sliderCaptions[current] ? (
          <p className={scss.sliderCaption}>{sliderCaptions[current]}</p>
        ) : null}
      </div>

      <div className={scss.l}>
        <h1>{t("home_intro_title")}</h1>
        <p>{t("home_intro_text")}</p>

        <section className={scss.march8Promo}>
          <div className={scss.march8Header}>
            <h2>{t("home_march8_countdown_title")}</h2>
            <div className={scss.countdownGrid}>
              <article className={scss.countdownItem}>
                <strong>{formatCountdownValue(march8Countdown.days)}</strong>
                <span>{t("home_march8_days")}</span>
              </article>
              <article className={scss.countdownItem}>
                <strong>{formatCountdownValue(march8Countdown.hours)}</strong>
                <span>{t("home_march8_hours")}</span>
              </article>
              <article className={scss.countdownItem}>
                <strong>{formatCountdownValue(march8Countdown.minutes)}</strong>
                <span>{t("home_march8_minutes")}</span>
              </article>
              <article className={scss.countdownItem}>
                <strong>{formatCountdownValue(march8Countdown.seconds)}</strong>
                <span>{t("home_march8_seconds")}</span>
              </article>
            </div>
            <p>
              {t("home_march8_countdown_text", {
                year: march8Countdown.targetYear,
              })}
            </p>
          </div>

          <div className={scss.march8Ideas}>
            {march8PromoIdeas.map((item) => (
              <article key={item.title} className={scss.march8IdeaCard}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={scss.march8IdeaImage}
                />
                <div className={scss.march8IdeaEmoji}>{item.emoji}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <NavLink to="/catalog" className={scss.march8IdeaLink}>
                  {t("home_march8_idea_link")}
                </NavLink>
              </article>
            ))}
          </div>
        </section>

        <div className={scss.specialOffers}>
          <div className={scss.specialOffersHeader}>
            <h2>{t("home_offers_title")}</h2>
            <p>{t("home_offers_subtitle")}</p>
          </div>

          {specialOffers.map((offer, index) => (
            <article key={`${offer.title}-${index}`} className={scss.offerCard}>
              <span className={scss.offerBadge}>{offer.badge}</span>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={scss.wao}>
        <h1>{t("home_steps_title")}</h1>
        <div className={scss.steps}>
          {steps.map((step, index) => (
            <div key={index} className={scss.step}>
              <img src={step.image} alt={step.title} />
              <h3>
                <span>{step.title}</span> - {step.description}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <section ref={whyChooseUsRef} className={scss.whyChooseUs}>
        <h2>{t("home_why_title")}</h2>
        <div className={scss.statsGrid}>
          {whyChooseStats.map((item) => (
            <article key={item.id} className={scss.statItem}>
              <strong>
                {Number(animatedStats[item.id] || 0).toLocaleString(
                  LANGUAGE_LOCALES[language] || "ru-RU",
                )}
                {item.suffix}
              </strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={scss.whyBenefits}>
        <ul className={scss.whyBenefitsList}>
          {WHY_BENEFIT_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
        <article className={scss.photoBeforeSend}>
          <div className={scss.photoBeforeSendIcon}>📸</div>
          <div className={scss.photoBeforeSendContent}>
            <h3>{t("home_photo_before_send_title")}</h3>
            <p>{t("home_photo_before_send_text")}</p>
          </div>
        </article>
      </section>

      <div className={scss.cta}>
        <h1>{t("home_cta_title")}</h1>
        <NavLink to="/delivery">{t("home_cta_delivery")}</NavLink>
        <NavLink to="/about">{t("home_cta_about")}</NavLink>
      </div>

      <div className={scss.hut}>
        <h1>{t("home_hits_title")}</h1>

        <div className={scss.hitSales}>
          {hitCards.map((item, index) => (
            <div key={index} className={scss.card}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className={scss.price}>
                {Number(item.price).toLocaleString()} {t("currency")}
              </span>
              <button type="button" onClick={() => addToCart(item)}>
                {t("catalog_buy")}
              </button>
              <span className={scss.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Sets compact />
      <Boxes compact />

      <section className={scss.reviews}>
        <div className={scss.reviewsHeader}>
          <h1>{t("home_reviews_title")}</h1>
          <p>{t("home_reviews_subtitle")}</p>
        </div>

        <form className={scss.reviewForm} onSubmit={handleSubmitReview}>
          <input
            type="text"
            value={reviewName}
            onChange={(event) => setReviewName(event.target.value)}
            placeholder={t("home_reviews_name_placeholder")}
            maxLength={40}
          />
          <textarea
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            placeholder={t("home_reviews_text_placeholder")}
            rows={4}
            maxLength={350}
          />
          <div className={scss.reviewFormActions}>
            <button type="submit">
              {editingReviewId
                ? t("home_reviews_save")
                : t("home_reviews_submit")}
            </button>
            {editingReviewId && (
              <button
                type="button"
                className={scss.reviewCancelBtn}
                onClick={handleCancelEdit}
              >
                {t("home_reviews_cancel_edit")}
              </button>
            )}
          </div>
        </form>

        {reviews.length === 0 ? (
          <p className={scss.reviewEmpty}>{t("home_reviews_empty")}</p>
        ) : (
          <div className={scss.reviewsGrid}>
            {reviews.map((review) => (
              <article key={review.id} className={scss.reviewCard}>
                <div className={scss.reviewMeta}>
                  <strong>{review.name}</strong>
                  <span>{formatReviewDate(review.createdAt)}</span>
                </div>
                <p>{review.text}</p>
                <div className={scss.reviewActions}>
                  {isReviewOwner(review) ? (
                    <>
                      <button
                        type="button"
                        className={scss.reviewEditBtn}
                        onClick={() => handleStartEditReview(review)}
                      >
                        {t("home_reviews_edit")}
                      </button>
                      <button
                        type="button"
                        className={scss.reviewDeleteBtn}
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        {t("home_reviews_delete")}
                      </button>
                    </>
                  ) : (
                    <span className={scss.reviewOwnerNote}>
                      {t("home_reviews_owner_note")}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className={scss.g}>
        <iframe
          title={t("home_map_title")}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.6501807969735!2d74.58452522649634!3d42.88022719282873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec81915eaf75d%3A0x9bfedde3851dcd21!2sMaximum!5e0!3m2!1sru!2skg!4v1771136787271!5m2!1sru!2skg"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Home;
