# 🌌 Little Universe

> A little corner of the internet that represents me.

**Little Universe** adalah website personal interaktif yang menjadi ruang digital untuk memperkenalkan identitas, minat, musik favorit, dan kreativitas pemiliknya. Website ini menggabungkan *personal branding*, eksplorasi desain antarmuka, dan pengembangan web dalam satu pengalaman yang personal.

Alih-alih menjadi portofolio formal yang hanya menampilkan daftar proyek, Little Universe dibuat sebagai *personal playground*—tempat untuk mengekspresikan diri, mengeksplorasi ide, dan membagikan hal-hal yang membentuk identitas pemiliknya.

## 📱 Adaptive viewport behavior

`js/responsive.js` observes the live viewport instead of relying on device-name detection. It updates the root HTML attributes when the screen is resized or rotated:

- `data-layout`: `mobile-portrait`, `mobile-landscape`, `desktop-portrait`, or `desktop-landscape`
- `data-orientation`: `portrait` or `landscape`
- `data-input`: `touch` or `precise`
- `--live-vh` / `--live-vw`: viewport units that respond to mobile browser chrome

The script also emits a `littleuniverse:viewportchange` custom event for interactive modules. CSS media queries remain the fallback, so the layout still adapts if JavaScript is unavailable. Breakpoints are based on the current viewport width rather than hard-coded device models because screen sizes and browser zoom vary.

## ✨ Tujuan Proyek

Little Universe dikembangkan untuk:

- **Personal branding** — memperkenalkan identitas, minat, dan aktivitas pemilik melalui website personal.
- **Eksplorasi UI/UX** — mempraktikkan desain antarmuka yang modern, responsif, dan nyaman digunakan.
- **Pengembangan web** — mengembangkan kemampuan HTML, CSS, dan JavaScript melalui proyek langsung.
- **Kreativitas dan eksperimen** — menggabungkan profil, musik, tautan sosial, dan mini-games dalam satu tempat.
- **Eksplorasi teknologi** — menjadi ruang untuk mempelajari dan mencoba pendekatan baru dalam pengembangan perangkat lunak.

## 🎨 Konsep Desain

Little Universe menggunakan tampilan dashboard personal dengan nuansa kosmik yang terinspirasi dari langit malam, galaksi, dan gradasi biru-ungu.

- **Cosmic visual identity** — palet gelap dengan aksen biru-ungu dan artwork bertema luar angkasa.
- **Modern typography** — tipografi bersih yang mengutamakan keterbacaan.
- **Card-based layout** — informasi dikelompokkan dalam kartu agar mudah dipindai.
- **Responsive design** — layout beradaptasi untuk desktop maupun perangkat mobile.
- **Performance awareness** — menghindari efek visual berlebihan dan memakai artwork SVG yang ringan.

## 🚀 Fitur

- 👤 **Personal profile** — menampilkan informasi singkat, identitas digital, dan tautan yang relevan.
- 💡 **Passions & interests** — memperkenalkan minat seperti software engineering, web development, Android, linguistik, otomasi, dan open source.
- 🎵 **Music corner** — menampilkan pilihan musik, artwork, dan tautan langsung ke YouTube Music.
- 🔗 **Social connections** — menghubungkan pengunjung dengan profil dan platform sosial pemilik.
- 🎮 **Mini-games** — permainan Snake dan Tic-Tac-Toe yang dapat dimainkan langsung.
- 🌓 **Theme toggle** — pilihan tema yang disimpan secara lokal di browser.
- 📱 **Responsive interface** — tata letak yang menyesuaikan ukuran layar desktop dan ponsel.
- 📊 **Analytics opsional** — integrasi Umami untuk mencatat page views setelah Website ID dikonfigurasi, dengan tautan dashboard publik opsional.
- ♿ **Reduced-motion support** — menghormati preferensi sistem untuk mengurangi animasi.

## 🧰 Teknologi

- **HTML5** — struktur dan konten halaman.
- **CSS3** — layout, tipografi, warna, animasi, dan responsivitas.
- **JavaScript (ES modules)** — interaksi website dan logika mini-games.
- **SVG** — ikon dan artwork vektor.
- **GitHub Pages** — opsi publikasi untuk website statis.

Proyek ini tidak menggunakan framework JavaScript atau proses build. Namun, karena menggunakan **JavaScript ES modules**, jalankan melalui server lokal, bukan dengan membuka `index.html` langsung menggunakan skema `file://`.

## 📁 Struktur Proyek

```text
LittleUniverse/
├── index.html
├── README.md
├── assets/
│   ├── avatar-cat.jpg
│   ├── avatar.svg
│   ├── cosmic-cover.svg
│   ├── favicon.svg
│   └── music-cover.svg
├── css/
│   └── styles.css
└── js/
    ├── app.js
    ├── data/
    │   └── site.js
    └── games/
        ├── snake.js
        └── tic-tac-toe.js
```

## ⚙️ Menjalankan Secara Lokal

1. Unduh atau clone repository.
2. Ekstrak arsip ZIP jika diperlukan.
3. Buka folder proyek menggunakan editor kode, misalnya Visual Studio Code.
4. Jalankan server statis dari folder proyek. Jika Python tersedia, gunakan:

   ```bash
   python -m http.server 8000
   ```

5. Buka `http://localhost:8000` di browser.

Alternatifnya, gunakan ekstensi **Live Server** di Visual Studio Code.

## ✏️ Kustomisasi

| File | Kegunaan |
|---|---|
| `index.html` | Struktur halaman dan elemen konten |
| `css/styles.css` | Warna, tipografi, layout, responsivitas, dan efek visual |
| `js/data/site.js` | Data profil, deskripsi, minat, musik, tautan sosial, dan konfigurasi analytics |
| `js/app.js` | Interaksi utama website dan pengaturan antarmuka |
| `js/games/snake.js` | Logika permainan Snake |
| `js/games/tic-tac-toe.js` | Logika permainan Tic-Tac-Toe |
| `assets/` | Foto profil, ikon, dan artwork |

### Mengubah profil dan konten

Edit `js/data/site.js` untuk menyesuaikan informasi profil, deskripsi, status, minat, teks ticker, musik, dan tautan sosial. Gunakan URL lengkap dengan `https://` untuk tautan eksternal.

### Mengubah tautan musik

Ubah `music.title`, `music.artist`, `music.url`, dan `music.artwork` di `js/data/site.js`. Tombol musik membuka tautan yang ditentukan secara langsung; website tidak menyematkan pemutar musik dan tidak menggunakan API musik.

### Mengubah foto profil

Ikon kategori menggunakan SVG lokal di folder `assets/` (`software-web.svg`, `linguistics.svg`, `android-devices.svg`, `tools-automation.svg`, `open-source.svg`, dan `music-internet.svg`). Ikon GitHub dan Telegram juga memakai SVG lokal. Seluruh ikon dapat diganti tanpa mengubah struktur komponen.

Foto profil saat ini berada di `assets/avatar-cat.jpg`. Ganti file tersebut atau sesuaikan nilai `site.avatar` di `js/data/site.js`. Jika mengganti nama atau lokasi aset, pastikan path yang dirujuk tetap benar.

## 📊 Integrasi Analytics dengan Umami

Little Universe sudah menyiapkan integrasi Umami yang **nonaktif secara default**. Tracking belum mengirim data sampai konfigurasi diisi dengan Website ID yang valid. Ini memungkinkan proyek tetap berjalan saat belum dipublikasikan atau belum memiliki akun analytics.

### Mengaktifkan Umami

1. Buat akun di [Umami Cloud](https://cloud.umami.is/) atau siapkan server Umami sendiri.
2. Daftarkan Little Universe sebagai website di dashboard Umami.
3. Salin **Website ID** dari pengaturan website.
4. Buka `js/data/site.js` dan isi konfigurasi berikut:

   ```js
   analytics: {
     provider: "umami",
     scriptUrl: "https://cloud.umami.is/script.js",
     websiteId: "ISI_WEBSITE_ID_DARI_UMAMI",
     publicDashboardUrl: ""
   },
   ```

   Jika menggunakan self-hosted Umami, ubah `scriptUrl` ke alamat script instalasi sendiri. Jangan menaruh password, API secret, atau kredensial dashboard di kode frontend.

5. Publikasikan ulang website dan kunjungi Little Universe untuk menguji apakah page views muncul di dashboard Umami. Ekstensi pemblokir iklan atau pengaturan privasi browser dapat menghalangi tracking.

### Membuat statistik publik

1. Di dashboard Umami, pilih website Little Universe dan buat **Share URL** untuk tampilan yang memang ingin dibagikan.
2. Salin URL Share tersebut ke `analytics.publicDashboardUrl` jika ingin menampilkan tautan statistik opsional di footer Little Universe.
3. Untuk website pribadi terpisah `rizzhold.md`, tambahkan tautan yang sama pada halaman yang diinginkan. Contoh HTML:

   ```html
   <a href="URL_SHARE_UMAMI" target="_blank" rel="noopener noreferrer">
     View website statistics ↗
   </a>
   ```

Dashboard publik bisa dilihat siapa pun yang memiliki tautannya. Bagikan hanya metrik yang nyaman ditampilkan secara publik. Dashboard pemilik tetap diakses melalui login Umami; jangan membagikan kredensial pemilik.

**Catatan:** integrasi ini hanya menyiapkan sisi Little Universe. Akun Umami, Website ID, URL Share, dan tautan di website `rizzhold.md` harus dikonfigurasi setelah alamat website dan dashboard tersedia. Statistik tidak bersifat retroaktif; pengumpulan dimulai setelah tracking aktif.

## 🌐 Publikasi dengan GitHub Pages

1. Buat repository GitHub dan unggah isi folder proyek—bukan file ZIP luarnya.
2. Buka **Settings → Pages**.
3. Pada bagian build and deployment, pilih **Deploy from a branch**.
4. Pilih branch yang digunakan, biasanya `main`, serta folder `/ (root)` jika `index.html` berada di root repository.
5. Simpan konfigurasi dan tunggu proses deployment selesai.
6. Buka URL yang diberikan GitHub Pages.

Tidak diperlukan perintah build. Pastikan path aset bersifat relatif dan seluruh file yang dirujuk ikut diunggah.

## 🛠️ Pengembangan Selanjutnya

- Menyempurnakan aksesibilitas dan navigasi keyboard.
- Mengoptimalkan aset serta performa pada perangkat mobile.
- Menambahkan animasi mikro yang tidak mengganggu kenyamanan.
- Mengembangkan mini-games dan interaksi personal lainnya.
- Menguji tampilan pada lebih banyak ukuran layar dan browser.

## 📄 Lisensi dan Aset

Proyek ini merupakan karya personal untuk eksplorasi desain dan pengembangan web. Sebelum menggunakan ulang atau mendistribusikan kode maupun aset, periksa ketentuan lisensi yang berlaku. Font dan aset pihak ketiga tetap mengikuti lisensi masing-masing.

---

*Made with curiosity, code, and a little bit of the universe.* 🌌
