import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useMain } from "../../context/MainContext";
import {
  ORDERS_STORAGE_KEY,
  readOrdersFromStorage,
} from "../../utils/orderStorage";
import scss from "./AdminPage.module.scss";

const PRODUCTS_API_URL = "https://api-crud.elcho.dev/api/v1/ebe0d-8ea4c-406e6/product";
const USERS_API_URL = "https://69653e01e8ce952ce1f49d37.mockapi.io/user";

const toArray = (data) =>
  Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

function AdminPage() {
  const { t, language } = useMain();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const numberLocale = language === "EN" ? "en-US" : language === "KG" ? "ky-KG" : "ru-RU";

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString(numberLocale);

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return new Intl.DateTimeFormat(numberLocale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const refreshDashboard = async () => {
    setLoading(true);
    try {
      const [productsRes, usersRes] = await Promise.all([
        axios.get(PRODUCTS_API_URL).catch(() => ({ data: [] })),
        axios.get(USERS_API_URL).catch(() => ({ data: [] })),
      ]);

      setProducts(toArray(productsRes.data));
      setUsers(toArray(usersRes.data));
      setOrders(readOrdersFromStorage());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  useEffect(() => {
    const handleStorage = (event) => {
      if (!event.key || event.key === ORDERS_STORAGE_KEY) {
        setOrders(readOrdersFromStorage());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const metrics = useMemo(() => {
    const revenue = orders.reduce(
      (acc, item) => acc + Number(item.totalPrice || item.total || 0),
      0,
    );

    const activeOrders = orders.filter((item) =>
      ["new", "processing"].includes(String(item.status || "")),
    ).length;

    return [
      {
        id: "products",
        label: t("admin_dashboard_products_count"),
        value: products.length,
      },
      {
        id: "users",
        label: t("admin_dashboard_users_count"),
        value: users.length,
      },
      {
        id: "orders",
        label: t("admin_dashboard_orders_count"),
        value: orders.length,
      },
      {
        id: "activeOrders",
        label: t("admin_dashboard_active_orders"),
        value: activeOrders,
      },
      {
        id: "revenue",
        label: t("admin_dashboard_revenue"),
        value: `${formatMoney(revenue)} ${t("currency")}`,
      },
    ];
  }, [orders, products.length, users.length, t]);

  const topCategories = useMemo(() => {
    const map = new Map();
    products.forEach((item) => {
      const category = String(item.category || "").trim() || t("catalog_all");
      map.set(category, (map.get(category) || 0) + 1);
    });

    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [products, t]);

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort(
          (a, b) =>
            new Date(b.createdAt || b.date || 0).getTime() -
            new Date(a.createdAt || a.date || 0).getTime(),
        )
        .slice(0, 5),
    [orders],
  );

  return (
    <section className={scss.dashboard}>
      <header className={scss.header}>
        <div>
          <h1>{t("admin_page_title")}</h1>
          <p>{t("admin_dashboard_subtitle")}</p>
        </div>
        <button type="button" onClick={refreshDashboard} disabled={loading}>
          {loading ? t("admin_dashboard_refreshing") : t("admin_dashboard_refresh")}
        </button>
      </header>

      <div className={scss.statsGrid}>
        {metrics.map((metric) => (
          <article key={metric.id} className={scss.statCard}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className={scss.grid}>
        <article className={scss.panel}>
          <h2>{t("admin_dashboard_recent_orders")}</h2>
          {recentOrders.length === 0 ? (
            <p className={scss.empty}>{t("admin_dashboard_no_orders")}</p>
          ) : (
            <div className={scss.rows}>
              {recentOrders.map((order) => (
                <div key={order.id || order.createdAt} className={scss.row}>
                  <div>
                    <strong>{order.id || "-"}</strong>
                    <span>{order.customerName || "-"}</span>
                  </div>
                  <div>
                    <strong>
                      {formatMoney(order.totalPrice || order.total || 0)} {t("currency")}
                    </strong>
                    <span>{formatDate(order.createdAt || order.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className={scss.panel}>
          <h2>{t("admin_dashboard_top_categories")}</h2>
          {topCategories.length === 0 ? (
            <p className={scss.empty}>{t("admin_dashboard_no_categories")}</p>
          ) : (
            <ul className={scss.categoryList}>
              {topCategories.map(([category, count]) => (
                <li key={category}>
                  <span>{category}</span>
                  <strong>{count}</strong>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  );
}

export default AdminPage;
