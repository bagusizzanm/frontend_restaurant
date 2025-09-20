import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATH } from "../../../utils/apiPath";
import {
  ArrowLeft,
  LoaderCircle,
  MinusIcon,
  PlusIcon,
  Printer,
  Save,
  SendIcon,
  Trash,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toastStyleError, toastStyleSuccess } from "../../../utils/helper";
import toast from "react-hot-toast";
import { addItemToOrder, createOrder } from "../../services/orderService";

const DetailsTable = ({ table, setChoosedTable }) => {
  const [menus, setMenus] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [orderId, setOrderId] = useState(table?.order?.id || null);

  useEffect(() => {
    if (table?.order?.id) {
      setOrderId(table.order.id);
    }
  }, [table]);

  const getMenus = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.MENU.GET);
      setMenus(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching menus: ", error);
      toast.error("Error fetching menus: ", error, toastStyleError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  const categories = [...new Set(menus.map((m) => m.type))];

  const addItem = (menu) => {
    setOrderItems((prev) => {
      const exists = prev.find((item) => item.id === menu.id);
      if (exists) {
        return prev.map((item) =>
          item.id === menu.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...menu, qty: 1 }];
    });
  };

  const updateQty = (id, type) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            let qty = type === "inc" ? item.qty + 1 : item.qty - 1;
            return { ...item, qty: qty > 0 ? qty : 1 };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleSendToKitchen = async () => {
    if (!orderId) {
      const newOrder = await createOrder(table.id);
      console.log("API response createOrder:", newOrder);
      currentOrderId = newOrder.id ?? newOrder.order?.id;
      setOrderId(currentOrderId);
      console.log("Table props:", table);
      console.log("Order id in DetailsTable:", table?.order?.id);
    }
    try {
      for (const item of orderItems) {
        setLoading(true);
        await addItemToOrder(orderId, item.id, item.qty);
      }
      console.log("items: ", orderItems);

      toast.success("Pesanan berhasil di proses!", toastStyleSuccess);
      setOrderItems([]);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.error("Server error: ", error.response.data);
        toast.error(
          error.response.data.message || "Server error",
          toastStyleError
        );
      } else if (error.request) {
        console.error("No response: ", error.request);
        toast.error("Tidak ada respon dari server", toastStyleError);
      } else {
        console.error("Error sending order: ", error.message);
        toast.error(error.message, toastStyleError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-around p-3 border-b bg-white rounded-lg">
        <div className="w-full flex justify-between items-center gap-2">
          <Button
            variant="ghost"
            className="flex justify-center items-center cursor-pointer font-medium bg-gray-100 hover:bg-gray-200 text-gray-700"
            onClick={() => setChoosedTable(null)}
          >
            <ArrowLeft strokeWidth={1.5} className="size-4" /> Back
          </Button>
          <h2 className="text-lg font-semibold">Table {table?.number}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Menu list (left) */}
        <div className="w-2/3 border-r overflow-y-auto p-4">
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="flex gap-2 mb-4">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="capitalize cursor-pointer"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat} value={cat}>
                <Input
                  placeholder="Search menu items..."
                  className="mb-4 bg-white shadow-none"
                />
                <div className="space-y-3">
                  {menus
                    .filter((m) => m.type === cat)
                    .map((menu) => (
                      <Card
                        key={menu.id}
                        className="flex justify-between p-4 border-none shadow-none"
                      >
                        <div className="flex space-x-5 items-center">
                          <div className="w-full">
                            <h4 className="font-medium">{menu.name}</h4>
                            <p className="text-sm text-gray-500">
                              {menu.description || "-"}
                            </p>
                            <p className="text-sm font-semibold mt-1">
                              Rp {parseInt(menu.price).toLocaleString()}
                            </p>
                          </div>
                          <Button size="icon" onClick={() => addItem(menu)}>
                            <PlusIcon />
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Current Order (right) */}
        <div className="w-1/3 p-4 flex flex-col">
          <h3 className="text-md font-semibold mb-2">Current Order</h3>
          <p className="text-sm text-gray-500 mb-4">
            Table {table?.number} – {new Date().toLocaleDateString()}
          </p>

          <div className="flex-1 overflow-y-auto space-y-3">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      size="icon"
                      className="cursor-pointer"
                      variant="outline"
                      onClick={() => updateQty(item.id, "dec")}
                    >
                      <MinusIcon className="size-3" />
                    </Button>
                    <span>{item.qty}</span>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => updateQty(item.id, "inc")}
                    >
                      <PlusIcon className="size-3" />
                    </Button>
                    <Button
                      size="icon"
                      className="hover:bg-red-800 cursor-pointer"
                      variant="destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash className="size-3" />
                    </Button>
                  </div>
                </div>
                <p className="font-semibold">Rp {item.price * item.qty}</p>
              </div>
            ))}
          </div>

          {/* Total + Actions */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>Rp {total}</span>
            </div>
            <Button
              className="w-full cursor-pointer"
              onClick={handleSendToKitchen}
            >
              {loading ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <SendIcon className="size-4" /> Send to kitchen
                </>
              )}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="w-1/2 cursor-pointer">
                <Save className="size-4" /> Save Draft
              </Button>
              <Button variant="outline" className="w-1/2 cursor-pointer">
                <Printer className="size-4" /> Print Bill
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTable;
