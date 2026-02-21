import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import scss from "./Cart.module.scss";
import { useMain } from "../../context/MainContext";

const CART_API = "https://api-crud.elcho.dev/api/v1/e4389-5e9ab-9c633/cart";
const QUANTITY_BUMP_MS = 320;

const getItemKey = (item) => String(item?._id || item?.id || item?.name || "");

const Cart = () => {
  const navigate = useNavigate();
  const { increaseQuantity, decreaseQuantity, t } = useMain();
  const [cartItems, setCartItems] = useState([]);
  const [bumpMap, setBumpMap] = useState({});
  const bumpTimersRef = useRef({});
  const prevQuantitiesRef = useRef({});

  const triggerQuantityBump = useCallback((itemKey) => {
    if (!itemKey) return;

    setBumpMap((prev) => ({ ...prev, [itemKey]: true }));

    if (bumpTimersRef.current[itemKey]) {
      window.clearTimeout(bumpTimersRef.current[itemKey]);
    }

    bumpTimersRef.current[itemKey] = window.setTimeout(() => {
      setBumpMap((prev) => {
        const next = { ...prev };
        delete next[itemKey];
        return next;
      });
      delete bumpTimersRef.current[itemKey];
    }, QUANTITY_BUMP_MS);
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get(CART_API);
      const cartData = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data)
          ? response.data
          : [];

      setCartItems(cartData);
    } catch (error) {
      console.error("Cart API fetch error:", error);
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void fetchCart();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [fetchCart]);

  useEffect(() => {
    const nextQuantities = {};

    cartItems.forEach((item) => {
      const itemKey = getItemKey(item);
      const nextQty = Number(item.quantity || 0);
      nextQuantities[itemKey] = nextQty;

      const prevQty = prevQuantitiesRef.current[itemKey];
      if (typeof prevQty === "number" && nextQty > prevQty) {
        triggerQuantityBump(itemKey);
      }
    });

    prevQuantitiesRef.current = nextQuantities;
  }, [cartItems, triggerQuantityBump]);

  useEffect(
    () => () => {
      Object.values(bumpTimersRef.current).forEach((timerId) => {
        window.clearTimeout(timerId);
      });
      bumpTimersRef.current = {};
    },
    [],
  );

  const handleIncrease = async (item) => {
    await increaseQuantity(item);
    await fetchCart();
  };

  const handleDecrease = async (item) => {
    await decreaseQuantity(item);
    await fetchCart();
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0,
      )
    : 0;

  return (
    <div className={scss.cart}>
      <div className={scss.left}>
        <h1>{t("cart_title")} 🛒</h1>
        <p>
          {t("cart_items", {
            count: Array.isArray(cartItems) ? cartItems.length : 0,
          })}
        </p>

        {!Array.isArray(cartItems) || cartItems.length === 0 ? (
          <div className={scss.empty}>
            <h2>{t("cart_empty")} 💔</h2>
            <NavLink to="/catalog" className={scss.catalogLink}>
              {t("checkout_go_catalog")}
            </NavLink>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item._id || item.id} className={scss.card}>
              <img src={item.image} alt={item.name} />

              <div className={scss.info}>
                <h3>{item.name}</h3>
                <p>
                  {item.price} {t("currency")}
                </p>

                <div className={scss.controls}>
                  <button
                    type="button"
                    onClick={() => handleDecrease(item)}
                    aria-label={t("cart_decrease_quantity")}
                  >
                    -
                  </button>
                  <span
                    className={`${scss.quantity} ${
                      bumpMap[getItemKey(item)] ? scss.quantityBump : ""
                    }`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleIncrease(item)}
                    className={scss.plusBtn}
                    aria-label={t("cart_increase_quantity")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={scss.price}>
                {(Number(item.price) * Number(item.quantity)).toLocaleString()}{" "}
                {t("currency")}
              </div>
            </div>
          ))
        )}
      </div>

      {Array.isArray(cartItems) && cartItems.length > 0 && (
        <div className={scss.right}>
          <h3>{t("cart_total")}:</h3>
          <h2>
            {totalPrice.toLocaleString()} {t("currency")}
          </h2>

          <button className={scss.orderBtn} onClick={() => navigate("/checkOut")}>
            {t("cart_checkout")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
