export const BASE_URL = "http://localhost:8000/api";

export const API_PATH = {
  AUTH: {
    LOGIN: `${BASE_URL}/login`,
    LOGOUT: `${BASE_URL}/logout`,
  },
  ORDER: {
    GET: `${BASE_URL}/orders`,
    POST: `${BASE_URL}/orders`,
    CREATE: `${BASE_URL}/orders`,
    ADD_ITEM: (orderId) => `${BASE_URL}/orders/${orderId}/items`,
    CLOSE: (orderId) => `${BASE_URL}/orders/${orderId}/close`,
    RECEIPT: (orderId) => `${BASE_URL}/orders/${orderId}/receipt`,
  },
  TABLES: {
    GET: `${BASE_URL}/tables`,
  },
  MENU: {
    CREATE: `${BASE_URL}/menus`,
    GET: `${BASE_URL}/menus`,
    UPDATE: (id) => `${BASE_URL}/menus/${id}`,
    DELETE: (id) => `${BASE_URL}/menus/${id}`,
  },
};
