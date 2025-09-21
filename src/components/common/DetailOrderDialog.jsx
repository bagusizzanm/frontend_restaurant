import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "./ConfirmDialog";

const DetailOrderDialog = ({ order, trigger }) => {
  if (!order) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Pesanan Meja {order.table?.number}</DialogTitle>
          <DialogDescription>
            Status:{" "}
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                order.status === "open"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {order.status}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Tabel pesanan */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="py-2 px-3 text-left">Menu</th>
                <th className="py-2 px-3 text-center">Qty</th>
                <th className="py-2 px-3 text-right">Harga</th>
                <th className="py-2 px-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item) => (
                <tr key={item.id} className="border-b last:border-none">
                  <td className="py-2 px-3">{item.menu?.name}</td>
                  <td className="py-2 px-3 text-center">{item.qty}</td>
                  <td className="py-2 px-3 text-right">
                    Rp {parseInt(item.menu?.price).toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right">
                    Rp {parseInt(item.subtotal).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg">
            Rp {parseInt(order.total_price).toLocaleString()}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailOrderDialog;
