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
            const response = await fetch(`${AUTH_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: username, email, password })
            });

            const result = await response.json();
            
            if (response.ok || result.success) {
                localStorage.setItem("isNewUser", "true");
                alert("Account Created Successfully! Redirecting to login...");
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
                console.log("📥 Backend se aaya hua user data:", result.user);
                
                // 🔄 Purani cheezein hatao par dhyan se saaf karo
                const isNewUserCheck = localStorage.getItem("isNewUser");
                
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("currentUserEmail");

                // 🔄 Naya fresh data bithaao
                localStorage.setItem("token", result.token); 
                localStorage.setItem("currentUserEmail", email);
                localStorage.setItem("user", JSON.stringify(result.user)); 

                // Debug log check karne ke liye ki save hua ya nahi
                console.log("💾 LocalStorage me saved photo:", result.user.profileImage);

                if (isNewUserCheck === "true") {
                    alert(`Welcome to CropManager! Your account is ready.`);
                    localStorage.removeItem("isNewUser"); // Kaam hone ke baad hata do
                } else {
                    alert(`Welcome Back! Login Successful.`);
                }
                
                window.location.href = "dashboard.html"; 
                
            } else {
                alert(result.message || "Invalid Email or Password");
            }
        } catch (error) {
            console.error("Login Connection Error:", error);
            alert("Connection Error! Unable to reach backend server.");
        }
    });
}