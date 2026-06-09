const token = localStorage.getItem("token");

// सिर्फ protected pages पर check करो
const protectedPages = [
    "dashboard.html",
    "crops.html",
    "farmers.html",
    "reports.html",
    "analytics.html",
    "settings.html"
];

const currentPage = window.location.pathname;

const isProtected = protectedPages.some(page =>
    currentPage.includes(page)
);

// agar protected page hai aur token nahi hai
if (isProtected && !token) {
    window.location.href = "../auth/login.html";
}
// Yeh script check karegi ki user login hai ya nahi
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const currentPage = window.location.pathname;

    // Agar token nahi hai aur user dashboard dekhne ki koshish kare
    if (!token && !currentPage.includes("login.html") && !currentPage.includes("signup.html")) {
        alert("Access Denied! Please login first.");
        // Use login page par bhej do
        if (currentPage.includes("pages/")) {
            window.location.href = "login.html";
        } else {
            window.location.href = "pages/login.html";
        }
    }
});
// Base URL jo aapke backend server.js se connect hoga
const AUTH_API_URL = "http://localhost:5000/api/auth";

// ========================
// PROFESSIONAL SIGNUP LOGIC
// ========================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${AUTH_API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.json();
            
            if (response.ok || result.success) {
                alert("Account Created Successfully! Redirecting to login...");
                // Sahi rasta: signup.html se login.html par bhejo
                window.location.href = "../pages/login.html"; 
            } else {
                alert(result.message || "Signup Failed. Try another email.");
            }
        } catch (error) {
            console.error("Signup Connection Error:", error);
            alert("Connection Error! Make sure your backend server is running on port 5000.");
        }
    });
}

// ========================
// PROFESSIONAL LOGIN LOGIC
// ========================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch(`${AUTH_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            
            if (response.ok || result.success) {
                alert("Welcome Back! Login Successful.");
                // Google/Flipkart style secure browser storage
                localStorage.setItem("token", result.token); 
                
                // Sahi rasta: pages/login.html se root folder ke index.html par bhejo
                window.location.href = "../index.html"; 
            } else {
                alert(result.message || "Invalid Email or Password");
            }
        } catch (error) {
            console.error("Login Connection Error:", error);
            alert("Connection Error! Unable to reach backend server.");
        }
    });
}