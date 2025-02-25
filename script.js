// استيراد Firebase Authentication
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// تهيئة Firebase
const auth = getAuth();
const provider = new GoogleAuthProvider();

// تسجيل الدخول باستخدام جوجل
function loginWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem("user", JSON.stringify(user)); // تخزين بيانات المستخدم
            window.location.href = "profile.html"; // الانتقال إلى صفحة البروفايل
        })
        .catch((error) => {
            console.error("خطأ أثناء تسجيل الدخول:", error);
        });
}

// تسجيل الخروج
function logout() {
    signOut(auth).then(() => {
        localStorage.removeItem("user");
        window.location.href = "index.html"; // العودة إلى الصفحة الرئيسية
    }).catch((error) => {
        console.error("خطأ أثناء تسجيل الخروج:", error);
    });
}

// التأكد من تحميل الصفحة قبل إضافة الأحداث
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginBtn) loginBtn.addEventListener("click", loginWithGoogle);
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
});
