import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";

export const createOrder = async (tableId, userId) => {
  const payload = { table_restaurant_id: tableId, user_id: userId };

  const res = await axiosInstance.post(API_PATH.ORDER.CREATE, payload);
  return res.data;
};

export const addItemToOrder = async (orderId, menuId, qty, subtotal = null) => {
  const payload = { menu_id: menuId, qty };
  if (subtotal) payload.subtotal = subtotal;

  const res = await axiosInstance.post(
    API_PATH.ORDER.ADD_ITEM(orderId),
    payload
  );
  return res.data;
};

export const closeOrder = async (orderId) => {
  const res = await axiosInstance.put(API_PATH.ORDER.CLOSE(orderId));
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
