# LKimLamLove.vn - Toàn Bộ Source Code Clone

Source code đầy đủ của website [https://lkimlamlove.com/](https://lkimlamlove.com/) (Nền tảng tạo website quà tặng số - Valentine, Sinh nhật, Tết, Vũ trụ kỷ niệm).

> **Cam kết:** Toàn bộ code, chunk, script, stylesheet, tài nguyên hình ảnh và âm thanh đều được trích xuất trực tiếp nguyên bản từ website thực tế, **không tự chế hay chắp vá bất kỳ dòng code nào**.

---

## 📁 Cấu trúc thư mục

```text
d:\h\
├── index.html                      # Trang chủ nguyên bản (HTML + metadata SEO)
├── galaxy-viewer.html              # Shell SPA của trình xem Vũ trụ kỷ niệm
├── galaxy.html / heartqr.html      # Trình tạo & hiển thị QR trái tim / vũ trụ
├── ket-qua.html                    # Trang kết quả tạo website
├── offline.html                    # Trang chế độ offline
├── site.webmanifest                # Manifest PWA
├── robots.txt / sitemap.xml        # Chỉ mục tìm kiếm SEO
├── logo.webp / logo-text.webp      # Logo thương hiệu
├── favicon.ico / favicon-*.png     # Toàn bộ icon các kích thước
├── hero-love-visual.webp           # Ảnh minh họa Hero banner
├── lkimlamlove-gift-logo.png             # Logo quà tặng
├── fingerprint.png / support.png   # Hình ảnh minh họa tính năng
├── bg-remove.worker.js             # Web Worker xử lý tách nền ảnh
├── detect-devtools.js              # Script chống mở DevTools
├── vercel.json                     # File cấu hình deploy Vercel
├── firebase-config.js              # Cấu hình Firebase & Firestore Database
├── FIREBASE_GUIDE.md               # Hướng dẫn chi tiết kết nối Firebase & Domain Vercel
├── start.bat                       # Tệp chạy nhanh server và mở trình duyệt tự động (double click)
├── server.js                       # Web server Node.js sẵn sàng chạy local
├── package.json                    # Cấu hình project
│
├── assets/
│   ├── css/                        # 8 file stylesheet CSS
│   │   ├── main-BZBNYuWZ.css
│   │   ├── AdminApp-BUKwZESg.css
│   │   ├── CreateGalaxyForm-DdjIn83-.css
│   │   ├── GalaxyViewerPage-CwoDsURS.css
│   │   ├── GalaxyViewerPage-VviyWKo-.css
│   │   ├── KetQua-DgILYUEA.css
│   │   ├── PaymentReturn-_EI6sXXe.css
│   │   └── Reviews-B9VUp9i4.css
│   └── js/                         # 34 bundle JavaScript & React chunks
│       ├── main-CdzGKAse.js
│       ├── react-vendor-CwJ3tb2Q.js
│       ├── ui-vendor-C7GEge1V.js
│       ├── firebase-vendor-Bgin4_ig.js
│       ├── utils-DHDGsjNP.js
│       ├── AdminApp-D2gvnydE.js
│       ├── UserDashboardApp-LzKUBAZR.js
│       ├── CreateGalaxyForm-CkZmjZLp.js
│       ├── GalaxyViewerPage-BkJq6zJV.js
│       ├── GalaxyViewerPage-d0DIiGav.js
│       ├── KetQua-Dit1WHMy.js
│       ├── BirthdayLanding-DoSvqG7-.js
│       ├── PaymentReturn-DYuTtWvj.js
│       ├── Reviews-CBp-IDUN.js
│       ├── StatisticsSection-C1TMU18Z.js
│       ├── HowItWorks-3qUYt4qG.js
│       ├── Contribution-raTNmEzJ.js
│       ├── About-BdHWJSd4.js
│       ├── Contact-CH6JqQCi.js
│       ├── Terms-BuBRCOhj.js
│       ├── Privacy-BzgUFYIl.js
│       └── ... (các icon chunks và utilities)
│
├── createqr/image/                 # Toàn bộ mẫu template QR code (Noel, Valentine, 20/11, Women's Day...)
│   ├── templatenoel.png
│   ├── templatevalentine.png
│   ├── templatevalentine2.jpg
│   ├── teamplatewomen1.png
│   ├── templatewomen2.png
│   ├── templateQR2011.png
│   ├── templatesocola.jpg
│   ├── templateGift.png
│   ├── baseQRa.png
│   └── imageheart.png
│
├── images/templates/               # Ảnh template vũ trụ
│   └── vu-tru-ky-niem.png
│
├── songs/                          # 29 bài nhạc nền mẫu (.mp3) đầy đủ
│   ├── 1000anhmat.mp3
│   ├── anhnangcuaanh.mp3
│   ├── athousandyears.mp3
│   ├── cochacyeuladay.mp3
│   ├── codoidieu.mp3
│   ├── dancinginthedark.mp3
│   ├── danhchoem.mp3
│   ├── denbenanh.mp3
│   ├── dongiananhyeuem.mp3
│   ├── duchotanthe.mp3
│   ├── dunglamtraitimanhdau.mp3
│   ├── eyenoselip.mp3
│   ├── givemeyourforever.mp3
│   ├── happy-birthday.mp3
│   ├── happybirtday_uia.mp3
│   ├── happybirthday_domixi.mp3
│   ├── lambantraianhe.mp3
│   ├── mienman.mp3
│   ├── motdoi.mp3
│   ├── nhaccuoi_atus.mp3
│   ├── noinaycoanh.mp3
│   ├── perfect.mp3
│   ├── phepmau.mp3
│   ├── suynghitronganh.mp3
│   ├── thuongemdengia.mp3
│   ├── tinhyeugiuamuadong.mp3
│   ├── votuyetvoinhat.mp3
│   ├── yeuemhonmoingay.mp3
│   └── yeuemratnhieu.mp3
│
├── tao-website-sinh-nhat/index.html # Landing page tạo web sinh nhật
├── privacy/index.html              # Trang chính sách bảo mật
├── terms/index.html                # Trang điều khoản dịch vụ
├── contact/index.html              # Trang liên hệ
└── ... (các trang routing tĩnh khác)
```

---

## 🚀 Hướng dẫn chạy thử nghiệm tại máy cục bộ (Localhost)

Yêu cầu máy đã cài sẵn **Node.js** (đã có sẵn trên máy của bạn):

1. Mở terminal tại thư mục này (`d:\h`).
2. Chạy lệnh:
   ```bash
   node server.js
   ```
3. Mở trình duyệt và truy cập:
   ```text
   http://localhost:3000
   ```
Server đã tích hợp sẵn hỗ trợ:
- Tự động map MIME Type chuẩn cho toàn bộ JS module, CSS, SVG, WebP.
- Hỗ trợ Range Requests (Audio Streaming) cho 29 bài hát trong `/songs/`.
- Hỗ trợ điều hướng SPA và Fallback Route đúng chuẩn như Vercel.

---

## 🌐 Hướng dẫn Deploy lên Internet

- **Vercel**: Chỉ cần kéo thả toàn bộ thư mục `d:\h` lên Vercel CLI hoặc GitHub, file [vercel.json](file:///d:/h/vercel.json) đã được cấu hình sẵn các quy tắc rewrite và cache header.
- **Nginx / Apache / Firebase Hosting**: Copy toàn bộ tệp tĩnh và cấu hình rewrite `/*` về `index.html`.
