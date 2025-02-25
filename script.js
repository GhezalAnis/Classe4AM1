// استيراد الوظائف من Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// تكوين Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDZvXy3zahfDtxDzmsS3o7ZHC1Qi7p0Jyk",
    authDomain: "am1-7039d.firebaseapp.com",
    projectId: "am1-7039d",
    storageBucket: "am1-7039d.firebasestorage.app",
    messagingSenderId: "461785502349",
    appId: "1:461785502349:web:4877d7ca241072588dc8c4",
    measurementId: "G-VL7PTE3XSP"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// تسجيل الدخول باستخدام Google
function loginWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem("user", JSON.stringify(user)); // حفظ بيانات المستخدم
            window.location.href = "profile.html"; // الانتقال إلى الصفحة الشخصية
        })
        .catch((error) => {
            console.error("خطأ أثناء تسجيل الدخول:", error);
        });
}

// تسجيل الخروج
function logout() {
    signOut(auth).then(() => {
        localStorage.removeItem("user"); // حذف بيانات المستخدم
        window.location.href = "index.html"; // الرجوع إلى الصفحة الرئيسية
    }).catch((error) => {
        console.error("خطأ أثناء تسجيل الخروج:", error);
    });
}

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const user = JSON.parse(localStorage.getItem("user"));

    if (loginBtn) {
        loginBtn.addEventListener("click", loginWithGoogle);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    // تحديث واجهة المستخدم في `profile.html`
    if (window.location.pathname.includes("profile.html")) {
        if (user) {
            document.getElementById("userName").textContent = user.displayName;
            document.getElementById("userEmail").textContent = user.email;
            document.getElementById("userPhoto").src = user.photoURL;
        } else {
            window.location.href = "index.html"; // إعادة التوجيه إذا لم يكن هناك مستخدم
        }
    }
});
