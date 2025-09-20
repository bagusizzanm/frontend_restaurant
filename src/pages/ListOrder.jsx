import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.ORDER.GET);
      setOrders(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Gagal memuat data order");
    } finally {
      setLoading(false);
    }
  };
  const handleCloseOrder = async (orderId) => {
    // try {
    //   await closeOrder(orderId);
    //   toast.success("Order berhasil ditutup!");
    //   fetchOrders(); // refresh list
    // } catch (err) {
    //   console.error("Error closing order:", err);
    //   toast.error("Gagal menutup order");
    // }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <DashboardLayout activeMenu="list-makanan">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Daftar Pesanan</h1>

        {loading ? (
          <div className="flex items-center justify-center">
            <LoaderCircle className="animate-spin size-32 text-blue-500" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 font-semibold text-4xl">
            Tidak ada pesanan.
          </p>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="p-4  border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    Meja {order.table?.number}
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      order.status === "open"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-2">Menu</th>
                        <th className="text-center py-2">Qty</th>
                        <th className="text-right py-2">Harga</th>
                        <th className="text-right py-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items?.map((item) => (
                        <tr key={item.id} className="border-b last:border-none">
                          <td className="py-2">{item.menu?.name}</td>
                          <td className="py-2 text-center">{item.qty}</td>
                          <td className="py-2 text-right">
                            Rp {parseInt(item.menu?.price).toLocaleString()}
                          </td>
                          <td className="py-2 text-right">
                            Rp {parseInt(item.subtotal).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold">
                    Total: Rp {parseInt(order.total_price).toLocaleString()}
                  </span>
                  {order.status === "open" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCloseOrder(order.id)}
                    >
                      Tutup Order
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ListOrder;
