export const BASE_URL = "http://localhost:8000/api";

export const API_PATH = {
  AUTH: {
    LOGIN: `${BASE_URL}/login`,
    LOGOUT: `${BASE_URL}/logout`,
  },
  ORDER: {
    GET: `${BASE_URL}/orders`,
    POST: `${BASE_URL}/orders`,
  },
  TABLES: {
    GET: `${BASE_URL}/tables`,
  },
  MENU: {
    POST: `${BASE_URL}/menus`,
    GET: `${BASE_URL}/menus`,
  },
};
