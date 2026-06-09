document.addEventListener("DOMContentLoaded", () => {
    // Live date and clock initialization
    updateLiveTime();
    setInterval(updateLiveTime, 60000);

    // Core functionality loaders
    loadDashboardData();
    syncLaborKhataCounters(); 

    // 🔥 STEP 2 FIXED: Naye HTML IDs ke sath LocalStorage se photo uthakar chamkane ka logic
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
        const navAvatar = document.getElementById("navUserPhoto");
        const navInitials = document.getElementById("navUserInitials");

        // Agar user ki profile photo ka link database me hai aur elements mil gaye hain
        if (currentUser.profileImage && navAvatar && navInitials) {
            navAvatar.src = currentUser.profileImage;
            navAvatar.style.display = "block";   // 📸 Photo ko dikhao
            navInitials.style.display = "none";  // ❌ 'AD' text ko chhupa do
            console.log("📸 Dashboard topbar me photo makkhan tarike se set ho gayi!");
        } else if (navAvatar && navInitials) {
            // Agar photo nahi hai toh safe rehne ke liye initials dikhao aur photo chhupao
            navAvatar.style.display = "none";
            navInitials.style.display = "block";
        }
    }
});

// Live clock display engine
function updateLiveTime() {
    const timeEl = document.getElementById("dateTime");
    if(timeEl) {
        const now = new Date();
        timeEl.innerText = now.toLocaleDateString('en-IN', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// ==========================================================================
// 🌾 CROPS BACKEND FETCH ENGINE (100% PERFECT WORKING)
// ==========================================================================
async function loadDashboardData() {
    const token = localStorage.getItem("token"); 

    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/crops/getCrops", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });

        const result = await response.json();

        if (response.ok && result.success) {
            const totalCropsEl = document.getElementById("totalCrops");
            if(totalCropsEl) totalCropsEl.innerText = result.data.length;

            const totalProfitEl = document.getElementById("totalProfit");
            if(totalProfitEl) {
                const totalProfit = result.data.reduce((sum, crop) => {
                    let profitValue = Number(crop.profit);
                    if (isNaN(profitValue) || profitValue === 0) {
                        profitValue = (Number(crop.revenue) || 0) - (Number(crop.investmentCost) || 0);
                    }
                    return sum + profitValue;
                }, 0);
                
                totalProfitEl.innerText = `₹ ${totalProfit.toLocaleString('en-IN')}`;
            }

            displayCrops(result.data); 
        }
    } catch (error) {
        console.error("Crops Connection Error:", error);
    }
}

function displayCrops(crops) {
    const container = document.getElementById("totalProduction"); 
    if (!container) return; 
    if (crops.length === 0) {
        container.innerHTML = "<p style='font-size: 14px; color: #7f8c8d;'>No production data available.</p>";
        return;
    }
    container.innerHTML = crops.map(crop => `
        <div class="crop-info-row" style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
            <span style="text-transform: capitalize; font-weight: 500; color: #2c3e50;">${crop.cropName || 'N/A'}</span>
            <strong style="color: #00a8ff;">${crop.landArea || 0} Hectare</strong>
        </div>
    `).join("");
}

// ==========================================================================
// 🧑‍🌾 LABOR KHATA SMART SYNC ENGINE (SMART FALLBACKS)
// ==========================================================================
function syncLaborKhataCounters() {
    let dashboardLaborList = [];
    
    let currentUser = localStorage.getItem("currentUserEmail") || localStorage.getItem("email") || "admin@gmail.com";
    let key1 = `labor_${currentUser}`;
    let key2 = "labor_default_user";

    let rawData = localStorage.getItem(key1) || localStorage.getItem(key2);
    
    if (rawData) {
        try {
            dashboardLaborList = JSON.parse(rawData);
        } catch (e) {
            console.error("Parsing Error:", e);
        }
    }

    const liveLaborCount = dashboardLaborList.length;

    // Target the 'Total Farmers' wrapper safely
    const directIdElement = document.getElementById("totalFarmers");
    if (directIdElement) {
        directIdElement.innerText = `${liveLaborCount} Active`;
    }

    // Dynamic Central Alert Banner Integration
    const alertContainer = document.getElementById("laborDashboardAlert");
    const notifBadge = document.getElementById("notifBadge");
    
    if (alertContainer && dashboardLaborList.length > 0) {
        const totalPendingPayout = dashboardLaborList.reduce((sum, item) => {
            const earned = (Number(item.dailyWage) || 0) * (Number(item.totalDaysPresent) || 0);
            const diff = earned - (Number(item.advancePaid) || 0);
            return diff > 0 ? sum + diff : sum;
        }, 0);

        alertContainer.style.display = "block"; // Turn on dynamic layout banner

        if (totalPendingPayout > 0) {
            alertContainer.style.background = "#fff5f5";
            alertContainer.style.color = "#e74c3c";
            alertContainer.style.borderLeftColor = "#e74c3c";
            alertContainer.innerHTML = `⚠️ <strong>Notification:</strong> Mazdooron ka kul <strong>₹${totalPendingPayout.toLocaleString('en-IN')}</strong> baki hisab dena baki hai!`;
            
            if(notifBadge) {
                notifBadge.innerText = "1";
                notifBadge.style.display = "inline-block";
            }
        } else {
            alertContainer.style.background = "#f4fbf7";
            alertContainer.style.color = "#2ecc71";
            alertContainer.style.borderLeftColor = "#2ecc71";
            alertContainer.innerHTML = `✅ <strong>Notification:</strong> Sabhi mazdooron ka hisab barabar (settled) chal raha hai.`;
            if(notifBadge) notifBadge.style.display = "none";
        }
    }
}