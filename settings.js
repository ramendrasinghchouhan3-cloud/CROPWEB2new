document.addEventListener("DOMContentLoaded", () => {
    console.log("System Notice: Settings module initialized successfully.");

    // ==========================================================================
    // 1. DOM ELEMENTS (Purane + Naye Saare Elements - SAFE)
    // ==========================================================================
    const editProfileBtn = document.getElementById("editProfileBtn");
    const formActions = document.getElementById("formActions");
    const cancelEditBtn = document.getElementById("cancelEditBtn");
    const profileFieldsForm = document.getElementById("profileFieldsForm");
    const passwordChangeForm = document.getElementById("passwordChangeForm");
    
    // Profile Inputs
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileContact = document.getElementById("profileContact");
    const profileLand = document.getElementById("profileLand");
    const profileDistrict = document.getElementById("profileDistrict");
    const profileAddress = document.getElementById("profileAddress");
    const displayAdminName = document.getElementById("displayAdminName");
    const currentPasswordInput = document.getElementById("currentPassword");
    const newPasswordInput = document.getElementById("newPassword");

    // Photo Elements
    const profileImageInput = document.getElementById("photoUpload"); 
    const profileAvatarImg = document.getElementById("avatarPreview"); 
    const togglePasswordIcons = document.querySelectorAll(".toggle-password");

    // Theme & Language Controls
    const lightThemeCard = document.getElementById("lightThemeCard");
    const darkThemeCard = document.getElementById("darkThemeCard");
    const langEnBtn = document.getElementById("langEnBtn");
    const langHiBtn = document.getElementById("langHiBtn");

    let currentUser = JSON.parse(localStorage.getItem("user"));

    // ==========================================================================
    // 2. TRANSLATION DICTIONARY
    // ==========================================================================
    const dictionary = {
        en: {
            control_panel_title: "⚙️ Control Panel",
            control_panel_subtitle: "Manage your profile details, change system themes, and switch languages smoothly.",
            theme_section_title: "🎨 Interface Style",
            theme_section_desc: "Choose how your CropManager portal looks.",
            theme_light_label: "Light Mode",
            theme_dark_label: "Dark Mode",
            lang_section_title: "🌐 System Language",
            lang_section_desc: "Select your preferred language for the dashboard.",
            
            not_logged_in: "You are not logged in. Please log in first.",
            profile_success: "Awesome! Your profile and photo have been updated.",
            profile_fail: "Hold on! ",
            server_error: "Oops! Something went wrong on our side.",
            password_match_error: "Security Tip: New password cannot be the same as your old password.",
            password_success: "Great! Password updated successfully."
        },
        hi: {
            control_panel_title: "⚙️ कंट्रोल पैनल",
            control_panel_subtitle: "अपनी प्रोफाइल की जानकारी बदलें, सिस्टम थीम चुनें और आसानी से भाषा बदलें।",
            theme_section_title: "🎨 इंटरफ़ेस स्टाइल",
            theme_section_desc: "चुनें कि आपका CropManager पोर्टल कैसा दिखेगा।",
            theme_light_label: "लाइट मोड (सफेद)",
            theme_dark_label: "डार्क मोड (काला)",
            lang_section_title: "🌐 सिस्टम की भाषा",
            lang_section_desc: "डैशबोर्ड के लिए अपनी पसंदीदा भाषा चुनें।",
            
            not_logged_in: "आप लॉग इन नहीं हैं। कृपया पहले लॉग इन करें।",
            profile_success: "बधाई हो! आपकी प्रोफाइल और फोटो अपडेट हो गई है।",
            profile_fail: "एक मिनट रुकिए! ",
            server_error: "ओह! हमारी तरफ से कुछ गड़बड़ हो गई है।",
            password_match_error: "सुरक्षा सुझाव: नया密码 आपके पुराने पासवर्ड जैसा नहीं हो सकता।",
            password_success: "बहुत बढ़िया! आपका पासवर्ड सफलतापूर्वक बदल गया है।"
        }
    };

    // ==========================================================================
    // 3. 🛠️ FIXED ENGINE FUNCTIONS (Step 4 Connection Complete)
    // ==========================================================================
    
    // Function: Language Switch Apply Karna (Makkhan connection with langEngine)
    function applyLanguage(lang) {
        // 1. Browser ki memory update karo taaki baaki saare pages ko pata chal sake
        localStorage.setItem("appLang", lang);
        
        // 2. Is settings page par text badlo
        document.querySelectorAll("[data-lang-key]").forEach(element => {
            const key = element.getAttribute("data-lang-key");
            if (dictionary[lang] && dictionary[lang][key]) {
                element.innerText = dictionary[lang][key];
            }
        });

        // 3. Language Buttons ki UI State change karo
        if (lang === "hi") {
            if (langHiBtn) langHiBtn.classList.add("active");
            if (langEnBtn) langEnBtn.classList.remove("active");
        } else {
            if (langEnBtn) langEnBtn.classList.add("active");
            if (langHiBtn) langHiBtn.classList.remove("active");
        }
    }

    // Function: Theme Apply Karna
    function applyTheme(theme) {
        localStorage.setItem("appTheme", theme);
        document.documentElement.setAttribute("data-theme", theme);

        if (theme === "dark") {
            if (darkThemeCard) darkThemeCard.classList.add("active");
            if (lightThemeCard) lightThemeCard.classList.remove("active");
        } else {
            if (lightThemeCard) lightThemeCard.classList.add("active");
            if (darkThemeCard) darkThemeCard.classList.remove("active");
        }
    }

    // ==========================================================================
    // 4. DATA AUTO-FILL & PREFERENCES LOADER (On Page Load)
    // ==========================================================================
    function loadUserData() {
        currentUser = JSON.parse(localStorage.getItem("user"));
        const currentLang = localStorage.getItem("appLang") || "en";

        if (!currentUser) {
            alert(dictionary[currentLang].not_logged_in);
            window.location.href = "login.html";
            return;
        }

        profileName.value = currentUser.name || "Naya User";
        profileEmail.value = currentUser.email || "";
        profileContact.value = currentUser.contactNo || "";
        profileLand.value = currentUser.totalLand !== undefined ? currentUser.totalLand : 2.4;
        profileDistrict.value = currentUser.district || "Ujjain";
        profileAddress.value = currentUser.address || "";
        if (displayAdminName) displayAdminName.innerText = currentUser.name || "Naya User";

        if (profileAvatarImg) {
            profileAvatarImg.src = currentUser.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"; 
        }

        const savedTheme = localStorage.getItem("appTheme") || "light";
        applyTheme(savedTheme);
        applyLanguage(currentLang);
    }

    loadUserData();

    // ==========================================================================
    // 5. 🛠️ FIXED EVENT LISTENERS FOR CLICKS (Reload added for seamless syncing)
    // ==========================================================================
    
    // Theme Click Logic
    if (lightThemeCard && darkThemeCard) {
        lightThemeCard.addEventListener("click", () => applyTheme("light"));
        darkThemeCard.addEventListener("click", () => applyTheme("dark"));
    }

    // Language Click Logic (Ab click hote hi automatic baaki pages synchronise honge)
    if (langEnBtn && langHiBtn) {
        langEnBtn.addEventListener("click", () => {
            applyLanguage("en");
            window.location.reload(); // Instant Page Refresh for global syncing
        });
        
        langHiBtn.addEventListener("click", () => {
            applyLanguage("hi");
            window.location.reload(); // Instant Page Refresh for global syncing
        });
    }

    // ==========================================================================
    // 6. EXISTING RE-ACTIVATED FEATURES (Profile Update & Password - SAFE ZONE)
    // ==========================================================================
    
    // Real-Time Image Preview
    if (profileImageInput) {
        profileImageInput.addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                console.log("Photo selected successfully!");
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (profileAvatarImg) profileAvatarImg.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Profile Fields Lock/Unlock
    if (editProfileBtn && cancelEditBtn && formActions) {
        editProfileBtn.addEventListener("click", () => {
            profileName.disabled = false;
            profileContact.disabled = false;
            profileLand.disabled = false;
            profileDistrict.disabled = false;
            profileAddress.disabled = false;
            editProfileBtn.style.display = "none";
            formActions.style.display = "flex";
            profileName.focus();
        });

        cancelEditBtn.addEventListener("click", () => {
            loadUserData();
            profileName.disabled = true;
            profileContact.disabled = true;
            profileLand.disabled = true;
            profileDistrict.disabled = true;
            profileAddress.disabled = true;
            editProfileBtn.style.display = "block";
            formActions.style.display = "none";
        });
    }

    // Profile Submit with Image
    if (profileFieldsForm) {
        profileFieldsForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const currentLang = localStorage.getItem("appLang") || "en";
            currentUser = JSON.parse(localStorage.getItem("user"));
            const formData = new FormData();
            formData.append("userId", currentUser.id || currentUser._id);
            formData.append("name", profileName.value.trim());
            formData.append("contactNo", profileContact.value.trim());
            formData.append("address", profileAddress.value.trim());
            formData.append("totalLand", parseFloat(profileLand.value) || 2.4);
            formData.append("district", profileDistrict.value.trim());

            if (profileImageInput && profileImageInput.files[0]) {
                formData.append("profileImage", profileImageInput.files[0]);
            }

            try {
                const response = await fetch("http://localhost:5000/api/auth/update-profile", {
                    method: "PUT",
                    body: formData 
                });
                const result = await response.json();
                
                if (result.success) {
                    alert(dictionary[currentLang].profile_success);
                    const completeUserObject = {
                        ...result.user,
                        id: result.user.id || result.user._id,
                        _id: result.user._id || result.user.id
                    };
                    localStorage.setItem("user", JSON.stringify(completeUserObject)); 
                    loadUserData(); 
                    if (cancelEditBtn) cancelEditBtn.click(); 
                } else {
                    alert(dictionary[currentLang].profile_fail + result.message);
                }
            } catch (error) {
                alert(dictionary[currentLang].server_error);
            }
        });
    }

    // Instant Password Checker
    if (currentPasswordInput) {
        currentPasswordInput.addEventListener("blur", async () => {
            const currentPassword = currentPasswordInput.value.trim();
            if (!currentPassword) return;

            try {
                const response = await fetch("http://localhost:5000/api/auth/verify-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: currentUser.id || currentUser._id,
                        currentPassword: currentPassword
                    })
                });
                const result = await response.json();
                if (!result.success) {
                    alert(result.message); 
                    currentPasswordInput.style.borderColor = "#ef4444"; 
                    currentPasswordInput.value = ""; 
                    currentPasswordInput.focus(); 
                } else {
                    currentPasswordInput.style.borderColor = "#10b981"; 
                }
            } catch (error) {}
        });
    }

    // Change Password Final Submit
    if (passwordChangeForm) {
        passwordChangeForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const currentLang = localStorage.getItem("appLang") || "en";
            const currentPassword = currentPasswordInput.value;
            const newPassword = newPasswordInput.value;

            if (currentPassword === newPassword) {
                alert(dictionary[currentLang].password_match_error);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/auth/change-password", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: currentUser.id || currentUser._id,
                        currentPassword: currentPassword,
                        newPassword: newPassword
                    })
                });
                const result = await response.json();
                if (result.success) {
                    alert(dictionary[currentLang].password_success);
                    passwordChangeForm.reset();
                    currentPasswordInput.style.borderColor = ""; 
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert(dictionary[currentLang].server_error);
            }
        });
    }

    // Password View Eye Toggle
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const targetId = icon.getAttribute("data-target");
            const passwordInput = document.getElementById(targetId);
            if (passwordInput && passwordInput.type === "password") {
                passwordInput.type = "text";
                icon.classList.replace("fa-eye", "fa-eye-slash");
            } else if (passwordInput) {
                passwordInput.type = "password";
                icon.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    });
});