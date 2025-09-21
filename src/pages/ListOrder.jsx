import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/Input";
import { LoaderCircle } from "lucide-react";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { toast } from "react-hot-toast";
import { closeOrder } from "../services/orderService";
import { toastStyleError, toastStyleSuccess } from "../../utils/helper";
import DetailOrderDialog from "../components/common/DetailOrderDialog";

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTable, setSearchTable] = useState("");

  const fetchOrders = async () => {
    try {
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (searchTable) params.table = searchTable;
      const res = await axiosInstance.get(API_PATH.ORDER.GET, { params });
      const sorted = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setOrders(sorted);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Gagal memuat data order");
    } finally {
      setLoading(false);
    }
  };
  const handleCloseOrder = async (orderId) => {
    try {
      await closeOrder(orderId);
      toast.success("Order berhasil ditutup!", toastStyleSuccess);
      fetchOrders();
    } catch (err) {
      console.error("Error closing order:", err);
      toast.error("Gagal menutup order", toastStyleError);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, searchTable]);
  return (
    <DashboardLayout activeMenu="list-makanan">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Daftar Pesanan</h1>

          <div className="flex items-center gap-4">
            {/* Filter status */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            {/* Search by table */}
            <Input
              type="number"
              placeholder="Cari No Meja..."
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
              className="w-[180px] bg-white"
            />
          </div>
        </div>

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
            <table className="w-full bg-white rounded-lg text-sm border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-4 text-left">No Meja</th>
                  <th className="py-3 px-4 text-left">Pesanan</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Total</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-none">
                    {/* Nomor Meja */}
                    <td className="py-3 px-4 font-medium">
                      {order.table?.number}
                    </td>

                    {/* Daftar Pesanan */}
                    <td className="py-3 px-4">
                      <ul className="space-y-1">
                        {order.items?.map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>{item.menu?.name}</span>
                            <span className="text-gray-600">
                              {item.qty} x Rp{" "}
                              {parseInt(item.menu?.price).toLocaleString()}
                            </span>
                            <span className="font-semibold">
                              Rp {parseInt(item.subtotal).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          order.status === "open"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-3 px-4 text-right font-semibold">
                      Rp {parseInt(order.total_price).toLocaleString()}
                    </td>

                    {/* Aksi */}
                    <td className="py-3 px-4 text-center space-x-2">
                      <DetailOrderDialog
                        order={order}
                        trigger={
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                          >
                            Detail
                          </Button>
                        }
                      />
                      {order.status === "open" && (
                        <ConfirmDialog
                          title="Tutup Order"
                          message={`Apakah Anda yakin ingin menutup order meja ${order.table?.number}?`}
                          confirmText="Ya, tutup"
                          cancelText="Batal"
                          onConfirm={() => handleCloseOrder(order.id)}
                          trigger={
                            <Button
                              size="sm"
                              variant="destructive"
                              className="cursor-pointer hover:bg-red-700"
                            >
                              Tutup
                            </Button>
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ListOrder;
