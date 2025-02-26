// استيراد وظائف Firebase Authentication
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

// تهيئة Firebase Auth
const auth = getAuth();
const provider = new GoogleAuthProvider();

// تسجيل الدخول باستخدام Google
document.getElementById("googleLogin").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("✅ تسجيل الدخول ناجح:", result.user);
            window.location.href = "profile.html"; // توجيه المستخدم إلى ملفه الشخصي بعد تسجيل الدخول
        })
        .catch((error) => {
            console.error("❌ خطأ في تسجيل الدخول:", error);
        });
});

// متابعة حالة المستخدم وعرض بياناته
onAuthStateChanged(auth, (user) => {
    if (user) {
        // عرض بيانات المستخدم في صفحة الملف الشخصي
        if (window.location.pathname.includes("profile.html")) {
            document.getElementById("userName").textContent = user.displayName || "مستخدم مجهول";
            document.getElementById("userEmail").textContent = user.email;
            document.getElementById("userImage").src = user.photoURL || "default-avatar.png";
        }
    } else {
        // إذا لم يكن المستخدم مسجلاً الدخول، إعادة التوجيه إلى الصفحة الرئيسية
        if (window.location.pathname.includes("profile.html")) {
            window.location.href = "index.html";
        }
    }
});

// تسجيل الخروج
if (window.location.pathname.includes("profile.html")) {
    document.getElementById("logoutButton").addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                console.log("🚪 تم تسجيل الخروج بنجاح!");
                window.location.href = "index.html"; // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الخروج
            })
            .catch((error) => {
                console.error("❌ خطأ أثناء تسجيل الخروج:", error);
            });
    });
}
