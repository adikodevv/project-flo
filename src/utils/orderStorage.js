export const ORDERS_STORAGE_KEY = "floriva_orders";

const parseArray = (rawValue) => {
  try {
    const parsed = JSON.parse(rawValue || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const readOrdersFromStorage = () => {
  if (typeof window === "undefined") return [];
  return parseArray(localStorage.getItem(ORDERS_STORAGE_KEY));
};

export const writeOrdersToStorage = (orders) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export const generateOrderId = () =>
  `ORD-${Date.now()}-${Math.random().toString(16).slice(2, 6).toUpperCase()}`;

export const addOrderToStorage = (order) => {
  if (typeof window === "undefined") return;
  const current = readOrdersFromStorage();
  const next = [order, ...current];
  writeOrdersToStorage(next);
};
