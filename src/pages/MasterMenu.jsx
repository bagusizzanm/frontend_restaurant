import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { LoaderCircleIcon } from "lucide-react";
import { toastStyleSuccess } from "../../utils/helper";

const MasterMenu = () => {
  const [menus, setMenus] = useState([]);
  const [menuTypes, setMenuTypes] = useState([]); // tipe menu dari backend
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    type: "",
    description: "",
  });

  // fetch menus dari backend
  const fetchMenus = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.MENU.GET);
      setMenus(res.data);
    } catch (err) {
      toast.error("Gagal memuat menu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // fetch tipe makanan (misal API khusus atau ambil distinct dari menus)
  const fetchMenuTypes = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.MENU.GET);
      const types = [...new Set(res.data.map((m) => m.type))];
      setMenuTypes(types);
    } catch (err) {
      console.error("Gagal memuat tipe menu:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
    fetchMenuTypes();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // update menu
        await axiosInstance.put(
          `${API_PATH.MENU.CREATE}/${formData.id}`,
          formData
        );
        toast.success("Menu berhasil diperbarui", toastStyleSuccess);
      } else {
        // tambah menu baru
        await axiosInstance.post(API_PATH.MENU.CREATE, formData);
        toast.success("Menu berhasil ditambahkan", toastStyleSuccess);
      }
      setFormData({ id: null, name: "", price: "", type: "", description: "" });
      fetchMenus();
      fetchMenuTypes();
    } catch (err) {
      console.error("Error:", err);
      toast.error("Gagal menyimpan menu", toastStyleError);
    }
  };

  const handleEdit = (menu) => {
    setFormData({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      type: menu.type,
      description: menu.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus menu ini?")) return;
    try {
      await axiosInstance.delete(`${API_PATH.MENU.CREATE}/${id}`);
      toast.success("Menu berhasil dihapus");
      fetchMenus();
      fetchMenuTypes();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Gagal menghapus menu");
    }
  };

  return (
    <DashboardLayout activeMenu="makanan">
      <div className="flex flex-col gap-4">
        {/* Form */}
        <Card className="p-6 border-none shadow-none w-xl">
          <h2 className="text-lg font-semibold mb-4">
            {formData.id ? "Edit Menu" : "Tambah Menu"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Nama Menu</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Harga</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Tipe</label>
              <Select
                value={formData.type}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, type: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe makanan" />
                </SelectTrigger>
                <SelectContent>
                  {menuTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm mb-1">Deskripsi</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">{formData.id ? "Update" : "Simpan"}</Button>
              {formData.id && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData({
                      id: null,
                      name: "",
                      price: "",
                      type: "",
                      description: "",
                    })
                  }
                >
                  Batal
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* List Menu */}
        <Card className="p-6 border-none shadow-none">
          <h2 className="text-lg font-semibold mb-4">Daftar Menu</h2>
          {loading ? (
            <LoaderCircleIcon className="animate-spin size-5" />
          ) : menus.length === 0 ? (
            <p>Tidak ada menu</p>
          ) : (
            <Table className="w-full overflow-auto">
              <TableCaption>List menu makanan & minuman</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Nama</TableHead>
                  <TableHead className="w-[120px]">Harga</TableHead>
                  <TableHead className="w-[120px]">Tipe</TableHead>
                  <TableHead className="w-[250px]">Deskripsi</TableHead>
                  <TableHead className="text-center w-[150px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus.map((menu) => (
                  <TableRow key={menu.id}>
                    <TableCell className="font-medium">{menu.name}</TableCell>
                    <TableCell>
                      Rp {parseInt(menu.price).toLocaleString()}
                    </TableCell>
                    <TableCell>{menu.type}</TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      {menu.description}
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(menu)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(menu.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MasterMenu;
