<div align="center">

<img src="public/KerjaAsyik.png" alt="KerjaSyik" width="80" />

# KerjaSyik

**Pencari kerja Indonesia berhak tahu mana lowongan yang aman.**

[![React](https://img.shields.io/badge/React_18-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)

*Gratis. Tanpa login. Langsung pakai.*

[Coba Sekarang →](https://kerjasyik.vercel.app) · [Cara Kerja](#cara-kerja) · [Tech Stack](#tech-stack)

</div>

&nbsp;

> Setiap tahun, ribuan pencari kerja Indonesia kehilangan uang, waktu, dan kepercayaan diri karena lowongan palsu.
> KerjaSyik hadir bukan karena ada peluang bisnis — tapi karena ada yang salah, dan kami bisa membantu memperbaikinya.

&nbsp;

## Apa yang Bisa KerjaSyik Lakukan

| Fitur | Cara Pakai | Yang Kamu Dapat |
|---|---|---|
| **Scan Loker** | Paste URL atau teks lowongan | Analisis indikator penipuan lengkap dengan alasan, bukan sekadar label |
| **Deteksi Gambar** | Upload screenshot lowongan | Deteksi elemen mencurigakan secara visual dari gambar apapun |
| **Cek Gaji** | Masukkan jabatan dan kota | Estimasi rentang gaji realistis berdasarkan data pasar Indonesia |

Semua fitur bekerja dalam hitungan detik. Semua gratis. Selamanya.

&nbsp;

## Tech Stack

KerjaSyik dibangun dengan stack modern yang dipilih bukan karena tren, tapi karena setiap teknologinya punya alasan.

```
React 18 + TypeScript    →  Type-safe, maintainable, scalable
Tailwind CSS             →  Design system yang konsisten dan cepat
Framer Motion            →  Animasi yang terasa hidup, bukan sekadar dekorasi
React Three Fiber        →  3D character dan parallax sinematik di browser
shadcn/ui                →  Accessible components tanpa overhead
Vite + Bun               →  Dev experience yang tidak menyiksa
```

&nbsp;

## Menjalankan Secara Lokal

```bash
# Clone
git clone https://github.com/NadaaaaH/KerjAsyk.git
cd KerjAsyk

# Install
npm install

# Jalankan
npm run dev
```

Buka `http://localhost:8080` — selesai.

&nbsp;

## Struktur Project

```
src/
├── assets/              # Logo, gambar, model 3D (.glb)
├── components/
│   ├── scenes/          # Setiap scene di landing page
│   ├── ui/              # shadcn/ui components
│   ├── Model3D.tsx      # Hero character 3D
│   ├── MascotGuide.tsx  # Maskot interaktif
│   ├── Navbar.tsx
│   └── Footer.tsx
├── pages/
│   ├── Index.tsx        # Landing page utama
│   ├── CaraKerja.tsx
│   └── Tentang.tsx
└── hooks/
```

&nbsp;

## Halaman

| Route | Isi |
|---|---|
| `/` | Landing page — hero 3D, scan loker, cek gaji, cara kerja |
| `/cara-kerja` | Penjelasan langkah demi langkah cara platform bekerja |
| `/tentang` | Latar belakang, nilai-nilai, dan tim di balik KerjaSyik |

&nbsp;

## Tim

Dibuat oleh dua orang yang percaya bahwa teknologi seharusnya melindungi, bukan mengeksploitasi.

| Nama | Peran |
|---|---|
| **Nada Haifa Nurfadhillah** | Project Leader & Front End Developer |
| **Nurafia Avanza** | UI Designer & Front End Developer |

&nbsp;

---

<div align="center">

© 2026 KerjaSyik

*Dibuat dengan niat baik untuk pencari kerja Indonesia.*

</div>