# 🧑‍🎓 SISBJN — Sistem Informasi Siswa Bojonegoro

SISBJN adalah dashboard informasi siswa untuk sekolah-sekolah di Bojonegoro. Aplikasi ini membantu dinas pendidikan atau operator sekolah dalam melihat data siswa secara cepat, responsif, dan efisien.

---

## 🎯 Fitur Utama

- ✅ Menampilkan seluruh data siswa (nama, asal sekolah, tanggal lahir)
- 🔍 Fitur pencarian & filter berdasarkan:
  - Nama siswa
  - Asal sekolah
  - Tahun lahir
- 📊 Statistik total siswa, sekolah, dan rata-rata tahun lahir
- 📁 Data diambil dari API eksternal
- 📱 Responsive Design (Mobile Friendly)
- 🔄 Modal detail siswa saat diklik
- 📚 Tampilan sekolah & jumlah siswanya
- 🔧 Konfigurasi menggunakan `.env` untuk API
- ☁️ Siap untuk deployment di **Vercel**

---

## 🖼️ Tampilan Aplikasi

### 📱 Tampilan Mobile
<img src="https://ik.imagekit.io/ewvljtyzy/iPhone-14-Plus-5173-firebase-siswa-bjn-1751879802274.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev.png?updatedAt=1751893317447" width="250" alt="Mobile View" />

### 🖥️ Tampilan Desktop
<img src="https://ik.imagekit.io/ewvljtyzy/Macbook-Air-5173-firebase-siswa-bjn-1751879802274.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev.png?updatedAt=1751893199166" width="600" alt="Desktop View" />

---

## 🚀 Demo Live

> 🌐 [Klik untuk lihat versi live di Vercel](https://sisbjn.vercel.app)

---

## 🛠️ Teknologi yang Digunakan

- [React JS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)

---

## ⚙️ Setup Project (Lokal)

### 1. Clone Repo
```bash
git clone https://github.com/namamu/sistemInformasiSiswaBojonegoro.git
cd sistemInformasiSiswaBojonegoro
````

### 2. Install Dependency

```bash
npm install
```

### 3. Konfigurasi `.env`

Buat file `.env`:

```env
VITE_API_URL=API_SISWA
```

### 4. Jalankan Dev Server

```bash
npm run dev
```

---

## 📦 Build & Deploy ke Vercel

### Build Manual

```bash
npm run build
```

### Deploy ke Vercel

1. Push project ke GitHub
2. Masuk ke [Vercel Dashboard](https://vercel.com)
3. Import project → pilih GitHub repo
4. Masukkan Environment Variable:

   * `VITE_API_URL=API_SISWA
5. Klik **Deploy**

---

## ✍️ Struktur Folder

```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Dashboard.jsx
│   ├── ModalDetail.jsx
│   ├── SekolahList.jsx
│   ├── SiswaBySekolah.jsx
│   ├── TahunFilter.jsx
│   └── Stats.jsx
├── App.jsx
├── main.jsx
public/
├── favicon.png
```

---

## 📢 Lisensi

Proyek ini bebas digunakan untuk keperluan edukasi & internal. Untuk penggunaan lebih lanjut, hubungi pengembang.

---

## 🙌 Kontribusi

Jika kamu punya ide, fitur baru, atau perbaikan, silakan buka [Issue](https://github.com/namamu/sisbjn/issues) atau kirim Pull Request.

---

> Dibuat dengan ❤️ oleh Romi.

```
