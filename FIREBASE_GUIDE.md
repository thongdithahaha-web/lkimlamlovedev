# Hướng Dẫn Cấu Hình Firebase, Đăng Nhập Google & Deploy Vercel (Domain Riêng)

Tài liệu này hướng dẫn chi tiết cách kết nối cơ sở dữ liệu Firebase (Firestore), kích hoạt Đăng nhập Google, và cấu hình để chạy hoàn hảo khi deploy lên Vercel với tên miền riêng (custom domain).

---

## BƯỚC 1: Tạo & Cấu hình Project trên Firebase Console

1. Truy cập [https://console.firebase.google.com/](https://console.firebase.google.com/) và đăng nhập tài khoản Google của bạn.
2. Bấm **"Add project" (Thêm dự án)**, đặt tên cho dự án (ví dụ: `lkimlamlove-mygift`).
3. Tắt hoặc bật Google Analytics tùy ý -> Bấm **"Create project"**.
4. Sau khi tạo xong, ở trang Dashboard, bấm vào biểu tượng Web **`</>`** để thêm Web App:
   - Đặt App nickname (ví dụ: `lkimlamlove-web`).
   - Bấm **"Register app"**.
   - Firebase sẽ hiển thị đoạn mã `firebaseConfig`. Bạn copy các thông số đó:
     ```javascript
     const firebaseConfig = {
       apiKey: "AIzaSy...",
       authDomain: "your-project-id.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project-id.appspot.com",
       messagingSenderId: "123456789...",
       appId: "1:123456789:web:...",
       measurementId: "G-..."
     };
     ```
5. Mở file [firebase-config.js](file:///d:/h/firebase-config.js) trong thư mục dự án và dán thông số của bạn vào phần:
   ```javascript
   window.FIREBASE_CONFIG = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "...",
     measurementId: "..."
   };
   ```

---

## BƯỚC 2: Bật Đăng nhập Google (Google Sign-In)

1. Tại menu bên trái Firebase Console, chọn **Build** -> **Authentication** -> Bấm **"Get started"**.
2. Chọn tab **"Sign-in method"** -> Chọn **"Google"**.
3. Bật công tắc **Enable (Bật)**.
4. Chọn email hỗ trợ dự án trong mục **Support email for project**.
5. Bấm **"Save" (Lưu)**.

---

## BƯỚC 3: BẮT BUỘC - Thêm Tên Miền Được Ủy Quyền (Authorized Domains)

> ⚠️ **LƯU Ý QUAN TRỌNG:** Nếu không làm bước này, khi deploy lên Vercel hoặc gắn domain riêng, Google Sign-in sẽ báo lỗi:  
> `auth/unauthorized-domain: This domain is not authorized for OAuth operations for your Firebase project.`

1. Trong **Authentication**, chọn tab **"Settings"** (Cài đặt).
2. Chọn mục **"Authorized domains"** (Miền được ủy quyền).
3. Bấm **"Add domain"** và thêm các domain sau:
   - `localhost` (mặc định đã có)
   - Tên miền Vercel của bạn (ví dụ: `lkimlamlove-mygift.vercel.app`)
   - Tên miền riêng của bạn (ví dụ: `lkimlamlove.com`, `mygift.com`, `quatang.net`)

---

## BƯỚC 4: Kích hoạt Cơ sở dữ liệu Firestore Database

1. Tại menu bên trái, chọn **Build** -> **Firestore Database** -> Bấm **"Create database"**.
2. Chọn vị trí lưu trữ (Location): ví dụ `asia-southeast1` (Singapore) để truy cập nhanh từ Việt Nam.
3. Chọn quy tắc bảo mật:
   - Chọn **"Start in test mode"** (để test nhanh trong 30 ngày).
   - Hoặc vào tab **Rules** và dán cấu hình chuẩn sau:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         // Bộ sưu tập thông tin người dùng
         match /users/{userId} {
           allow read: if true;
           allow write: if request.auth != null && request.auth.uid == userId;
         }
         // Bộ sưu tập quà tặng / vũ trụ
         match /gifts/{giftId} {
           allow read: if true;
           allow write: if request.auth != null;
         }
         // Mặc định cho phép đọc/ghi khi đã đăng nhập
         match /{document=**} {
           allow read, write: if request.auth != null;
         }
       }
     }
     ```
4. Bấm **"Publish"** để áp dụng rules.

---

## BƯỚC 5: Deploy lên Vercel & Gắn Domain Riêng

### Cách 1: Sử dụng Vercel CLI (Nhanh nhất)
1. Cài đặt Vercel CLI nếu chưa có:
   ```bash
   npm install -g vercel
   ```
2. Mở terminal tại thư mục `d:\h`:
   ```bash
   vercel --prod
   ```
3. Vercel sẽ tự động tải lên và cung cấp link `https://<ten-project>.vercel.app`.

### Cách 2: Sử dụng GitHub
1. Tạo một repository mới trên GitHub.
2. Đẩy toàn bộ thư mục `d:\h` lên repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit LKimLamLove full clone"
   git branch -M main
   git remote add origin <link-repo-github>
   git push -u origin main
   ```
3. Truy cập [https://vercel.com/](https://vercel.com/) -> Bấm **"Add New Project"** -> Chọn repository vừa tạo -> Bấm **"Deploy"**.

### Gắn Domain riêng trên Vercel:
1. Vào project trên **Vercel Dashboard** -> Chọn **Settings** -> **Domains**.
2. Nhập domain của bạn (ví dụ: `lkimlamlove.com` hoặc `mygift.com`) -> Bấm **"Add"**.
3. Cấu hình bản ghi DNS tại nhà cung cấp tên miền của bạn theo hướng dẫn của Vercel (bản ghi A `@ -> 76.76.21.21` hoặc CNAME).
4. Sau khi domain Active, nhớ quay lại **Bước 3** để điền domain này vào **Authorized domains** của Firebase!
