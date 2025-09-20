import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";

export const createOrder = async (tableId) => {
  const payload = { table_restaurant_id: tableId };

  const res = await axiosInstance.post(API_PATH.ORDER.CREATE, payload);
  return res.data;
};

export const addItemToOrder = async (orderId, menuId, qty) => {
  const res = await axiosInstance.post(
    `${API_PATH.ORDER.POST}/${orderId}/items`,
    { menu_id: menuId, qty }
  );
  return res.data;
};

export const closeOrder = async (orderId) => {
  const res = await axiosInstance.post(API_PATH.ORDER.CLOSE(orderId));
  return res.data;
};

export const getOrders = async (params = {}) => {
  const res = await axiosInstance.get(API_PATH.ORDER.GET, { params });
  return res.data;
};

export const getReceipt = async (orderId) => {
  const res = await axiosInstance.get(API_PATH.ORDER.RECEIPT(orderId), {
    responseType: "blob", // supaya bisa download PDF
  });
  return res.data;
};

export const getActiveOrderByTable = async (tableId) => {
  const res = await axiosInstance.get(API_PATH.ORDER.GET, {
    params: { table: tableId, status: "open" },
  });
  return res.data[0] || null;
};

export const fetchOrderByTable = async (tableId) => {
  const res = await axiosInstance.get(API_PATH.ORDER.GET, {
    params: { table_id: tableId, status: "open" },
  });

  // API return array, ambil order pertama (karena 1 meja hanya boleh punya 1 order open)
  return res.data.length > 0 ? res.data[0] : null;
};
