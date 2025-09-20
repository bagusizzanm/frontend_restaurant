# Frontend Restaurant Management System

Frontend untuk Restaurant Management System menggunakan **React.js + Vite** dengan dukungan autentikasi, manajemen meja, pesanan, dan laporan.

## 🚀 Fitur

- Login (multiple role: server, kasir)
- Dashboard status meja (Available, Occupied, Reserved, Inactive)
- Manajemen menu makanan & minuman (CRUD)
- Pemesanan meja & tambah item ke order
- List order & tutup order

## 🛠️ Tech Stack

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [axios](https://axios-http.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [react-router-dom](https://reactrouter.com/)
- [react-to-print](https://www.npmjs.com/package/react-to-print)

## 📂 Struktur Proyek

```
src/
 ├── components/
 │   ├── layout/
 │   │   ├── DashboardLayout.jsx
 │   │   └── Table.jsx
 │   ├── ui/
 │   │   ├── button.jsx
 │   │   ├── input.jsx
 │   │   ├── dialog.jsx
 │   │   └── table.jsx
 │   └── StatusLegendStat.jsx
 │
 ├── pages/
 │   ├── Dashboard.jsx
 │   ├── DetailsTable.jsx
 │   ├── ListOrder.jsx
 │   ├── MasterMenu.jsx
 │   └── GuestTable.jsx
 │
 ├── context/
 │   └── AuthContext.jsx
 │
 ├──
 │
 └── main.jsx
utils/
  ├── axiosInstance.js
  ├── apiPath.js
  ├── statusConfig.js
  └── helper.js
```

## ⚙️ Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/bagusizzanm/frontend_restaurant.git
   cd restaurant-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Jalankan development server:

   ```bash
   npm run dev
   ```

## 📌 Catatan

- Role login (`server` atau `kasir`).
- Semua request API menggunakan `axiosInstance` dengan token dari `AuthContext`.
- Jika ada error `401 Unauthenticated`, pastikan backend sudah berjalan dan token login tersimpan dengan benar.
