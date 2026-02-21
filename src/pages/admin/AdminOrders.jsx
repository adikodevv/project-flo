import { useEffect, useMemo, useState } from "react";
import { useMain } from "../../context/MainContext";
import {
  ORDERS_STORAGE_KEY,
  readOrdersFromStorage,
  writeOrdersToStorage,
} from "../../utils/orderStorage";
import scss from "./AdminOrders.module.scss";

const ORDER_STATUS_OPTIONS = [
  { value: "new", labelKey: "admin_orders_status_new" },
  { value: "processing", labelKey: "admin_orders_status_processing" },
  { value: "delivered", labelKey: "admin_orders_status_delivered" },
  { value: "canceled", labelKey: "admin_orders_status_canceled" },
];

const AdminOrders = () => {
  const { t, language } = useMain();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const numberLocale =
    language === "EN" ? "en-US" : language === "KG" ? "ky-KG" : "ru-RU";

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

  const loadOrders = () => {
    setOrders(readOrdersFromStorage());
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const handleStorage = (event) => {
      if (!event.key || event.key === ORDERS_STORAGE_KEY) {
        loadOrders();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateStatus = (orderId, nextStatus) => {
    setOrders((prev) => {
      const updated = prev.map((order) =>
        order.id === orderId ? { ...order, status: nextStatus } : order,
      );
      writeOrdersToStorage(updated);
      return updated;
    });
  };

  const deleteOrder = (orderId) => {
    if (!window.confirm(t("admin_orders_confirm_delete"))) return;

    setOrders((prev) => {
      const updated = prev.filter((order) => order.id !== orderId);
      writeOrdersToStorage(updated);
      return updated;
    });
  };

  const filteredOrders = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
      )
      .filter((order) =>
        statusFilter === "all" ? true : String(order.status || "new") === statusFilter,
      )
      .filter((order) => {
        if (!normalizedSearch) return true;
        const haystack = [
          order.id,
          order.customerName,
          order.phone,
          order.address,
          ...(Array.isArray(order.items) ? order.items.map((item) => item.name) : []),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalizedSearch);
      });
  }, [orders, searchTerm, statusFilter]);

  return (
    <section className={scss.ordersPage}>
      <header className={scss.header}>
        <div>
          <h1>{t("admin_orders_title")}</h1>
          <p>{t("admin_orders_subtitle", { count: filteredOrders.length })}</p>
        </div>
        <button type="button" onClick={loadOrders}>
          {t("admin_orders_refresh")}
        </button>
      </header>

      <div className={scss.filters}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={t("admin_orders_search_placeholder")}
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">{t("admin_orders_filter_all")}</option>
          {ORDER_STATUS_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {t(status.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className={scss.empty}>{t("admin_orders_empty")}</p>
      ) : (
        <div className={scss.grid}>
          {filteredOrders.map((order) => (
            <article key={order.id || order.createdAt} className={scss.card}>
              <div className={scss.cardTop}>
                <div>
                  <strong>{order.id || "-"}</strong>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <select
                  value={order.status || "new"}
                  onChange={(event) => updateStatus(order.id, event.target.value)}
                >
                  {ORDER_STATUS_OPTIONS.map((status) => (
                    <option key={status.value} value={status.value}>
                      {t(status.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={scss.meta}>
                <p>
                  <span>{t("checkout_name")}:</span> {order.customerName || "-"}
                </p>
                <p>
                  <span>{t("checkout_phone")}:</span> {order.phone || "-"}
                </p>
                <p>
                  <span>{t("checkout_address")}:</span> {order.address || "-"}
                </p>
                <p>
                  <span>{t("checkout_total")}:</span>{" "}
                  {Number(order.totalPrice || 0).toLocaleString(numberLocale)} {t("currency")}
                </p>
              </div>

              <div className={scss.items}>
                <h4>{t("admin_orders_items_title")}</h4>
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={`${item.name}-${index}`}>
                        <span>{item.name}</span>
                        <strong>
                          {Number(item.quantity || 1)} x{" "}
                          {Number(item.price || 0).toLocaleString(numberLocale)} {t("currency")}
                        </strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={scss.emptyItems}>{t("admin_orders_no_items")}</p>
                )}
              </div>

              <div className={scss.actions}>
                <button type="button" onClick={() => deleteOrder(order.id)}>
                  {t("admin_orders_delete")}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminOrders;
