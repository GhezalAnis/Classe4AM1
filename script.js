document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-btn");

    if (loginButton) {
        loginButton.addEventListener("click", function () {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result => {
                let user = result.user;
                localStorage.setItem("userName", user.displayName);
                localStorage.setItem("userEmail", user.email);
                localStorage.setItem("userPhoto", user.photoURL);
                window.location.href = "profile.html"; // انتقال إلى صفحة الملف الشخصي
            }).catch(error => {
                console.error("خطأ في تسجيل الدخول:", error);
            });
        });
    }
});
