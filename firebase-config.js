/**
 * =========================================================================
 * LKimLamLove.vn - Cấu hình Firebase & Firestore Database
 * =========================================================================
 * 
 * HƯỚNG DẪN ĐIỀN THÔNG TIN FIREBASE CỦA BẠN:
 * 1. Truy cập https://console.firebase.google.com/
 * 2. Tạo một Project mới (hoặc chọn project có sẵn).
 * 3. Vào Project Settings (Cài đặt dự án) -> General -> Your apps -> Thêm Web App (</>).
 * 4. Copy đoạn firebaseConfig và dán đè vào object `window.FIREBASE_CONFIG` bên dưới.
 * 
 * BẮT BUỘC ĐỂ ĐĂNG NHẬP GOOGLE HOẠT ĐỘNG TRÊN VERCEL / DOMAIN RIÊNG:
 * 1. Vào Firebase Console -> Authentication -> Sign-in method -> Bật "Google".
 * 2. Vào Firebase Console -> Authentication -> Settings -> Authorized domains (Miền được ủy quyền).
 *    Thêm các domain sau:
 *    - localhost
 *    - <ten-project-cua-ban>.vercel.app
 *    - <domain-rieng-cua-ban.com> (ví dụ: mygift.vn)
 * 
 * BẬT DATABASE FIRESTORE:
 * 1. Vào Firebase Console -> Firestore Database -> Tạo cơ sở dữ liệu (Create Database).
 * 2. Chọn "Start in test mode" (hoặc cấu hình Rules cho phép đọc/ghi theo auth).
 */

window.FIREBASE_CONFIG = window.FIREBASE_CONFIG || {
  apiKey: "AIzaSyDN3YxOpqxqfBQgHOvtFk6JJvztlV3vTH8",
  authDomain: "deargift-e6488.firebaseapp.com",
  projectId: "deargift-e6488",
  storageBucket: "deargift-e6488.appspot.com",
  messagingSenderId: "391379008795",
  appId: "1:391379008795:web:4b1c98f17f824690e2e7be",
  measurementId: "G-VGBLRMQM9L"
};

// =========================================================================
// Khởi tạo Firebase SDK & Firestore Database helper
// =========================================================================
(function() {
  function initFirebaseDatabase() {
    if (typeof firebase === "undefined") {
      // Tải Firebase compat SDK từ Google CDN nếu chưa có
      var scriptApp = document.createElement("script");
      scriptApp.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js";
      scriptApp.onload = function() {
        var scriptAuth = document.createElement("script");
        scriptAuth.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js";
        
        var scriptFirestore = document.createElement("script");
        scriptFirestore.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js";

        scriptFirestore.onload = function() {
          setupDatabase();
        };

        document.head.appendChild(scriptAuth);
        document.head.appendChild(scriptFirestore);
      };
      document.head.appendChild(scriptApp);
    } else {
      setupDatabase();
    }
  }

  function setupDatabase() {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(window.FIREBASE_CONFIG);
      }
      var db = firebase.firestore();
      window.LKimLamLoveDB = db;

      window.LKimLamLoveFirebase = {
        db: db,
        auth: firebase.auth(),

        // Lưu thông tin người dùng vào Firestore khi đăng nhập Google thành công
        saveUser: function(user) {
          if (!user || (!user.uid && !user.id)) return Promise.resolve();
          var uid = user.uid || user.id;
          return db.collection("users").doc(uid).set({
            uid: uid,
            email: user.email || "",
            displayName: user.displayName || user.name || "",
            photoURL: user.photoURL || user.avatar || "",
            role: user.role || "user",
            lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true }).then(function() {
            console.log("[LKimLamLove Firestore] Đã lưu thông tin người dùng:", uid);
          }).catch(function(err) {
            console.warn("[LKimLamLove Firestore] Lưu thông tin user (Firestore):", err.message);
          });
        },

        // Lưu dữ liệu website quà tặng / vũ trụ tạo bởi người dùng
        saveGift: function(giftData) {
          var id = giftData.id || ("gift_" + Date.now());
          return db.collection("gifts").doc(id).set(Object.assign({}, giftData, {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }), { merge: true }).then(function() {
            console.log("[LKimLamLove Firestore] Đã lưu quà tặng ID:", id);
            return id;
          });
        },

        // Lấy danh sách quà tặng của người dùng
        getUserGifts: function(uid) {
          return db.collection("gifts").where("userId", "==", uid).get().then(function(snapshot) {
            var gifts = [];
            snapshot.forEach(function(doc) {
              gifts.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return gifts;
          });
        },

        // Lấy thông tin quà tặng theo ID
        getGiftById: function(id) {
          return db.collection("gifts").doc(id).get().then(function(doc) {
            return doc.exists ? Object.assign({ id: doc.id }, doc.data()) : null;
          });
        }
      };

      console.log("%c[LKimLamLove Firebase] Đã kết nối Firebase & Firestore thành công!", "color: #10B981; font-weight: bold; font-size: 13px;");
      console.log("[LKimLamLove Firebase] Project ID:", window.FIREBASE_CONFIG.projectId);
      console.log("[LKimLamLove Firebase] Auth Domain:", window.FIREBASE_CONFIG.authDomain);
      console.log("[LKimLamLove Firebase] Domain hiện tại:", window.location.hostname);
    } catch (e) {
      console.warn("[LKimLamLove Firebase Init]", e.message);
    }
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFirebaseDatabase);
  } else {
    initFirebaseDatabase();
  }
})();
