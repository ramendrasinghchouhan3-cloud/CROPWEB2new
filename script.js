const API_URL = "http://localhost:5000/api/crops";

/* =========================
   SELECT ELEMENTS
========================= */
const cropForm = document.getElementById("cropForm");

/* SAFE ELEMENT CHECKS */
const safeElement = (id) => {
    return document.getElementById(id);
};

const cropTableBody = safeElement("cropTableBody");
const totalCrops = safeElement("totalCrops");
const totalFarmers = safeElement("totalFarmers");
const totalProduction = safeElement("totalProduction");
const totalProfit = safeElement("totalProfit");
const productionChartCanvas = safeElement("productionChart");
const searchInput = safeElement("searchInput");
const loadingSpinner = safeElement("loadingSpinner");
const emptyState = safeElement("emptyState");

let editCropId = null;
let productionChart = null;

/* =========================
   NOTIFICATION FUNCTION
========================= */
function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    if (!notification) return;

    notification.textContent = message;
    notification.className = "";
    notification.classList.add("show");

    if (type === "error") {
        notification.classList.add("error");
    }

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

/* =========================
   SECURE LOAD CROPS FUNCTION
========================= */
async function loadCrops() {
    const token = localStorage.getItem("token"); // Browser memory se token nikalo
    
    if (loadingSpinner) {
        loadingSpinner.style.display = "block";
    }

    try {
        const response = await fetch(`${API_URL}/getCrops`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // 🌟 Security guard ko Token dikhao
                "Authorization": `Bearer ${token}` 
            }
        });

        const result = await response.json();

        if (response.ok && result.success && result.data) {
            console.log("Data mil gaya:", result.data);
            
            // --- 1. DATA CALCULATIONS (PROFIT, PRODUCTION, FARMERS) ---
            let overallProfit = 0;
            let cropProductionMap = {};
            let uniqueFarmers = new Set();

            result.data.forEach(crop => {
                // Profit calculate karo (Revenue - Investment)
                const investment = Number(crop.investment || 0);
                const revenue = Number(crop.revenue || 0);
                overallProfit += (revenue - investment);

                // Production ka map banao chart ke liye
                if (crop.cropName) {
                    cropProductionMap[crop.cropName] = (cropProductionMap[crop.cropName] || 0) + Number(crop.production || 0);
                }

                // Unique farmers count karne ke liye
                if (crop.farmerName) {
                    uniqueFarmers.add(crop.farmerName);
                }
            });

            // Top Counters update karo
            if (totalCrops) totalCrops.textContent = result.data.length;
            if (totalFarmers) totalFarmers.textContent = uniqueFarmers.size;
            
            /* TOTAL PROFIT DISPLAY */
            if (totalProfit) {
                totalProfit.textContent = `₹ ${overallProfit.toLocaleString("en-IN")}`;
            }

            /* TOTAL PRODUCTION DISPLAY */
            if (totalProduction) {
                totalProduction.innerHTML = "";
                for (const cropName in cropProductionMap) {
                    totalProduction.innerHTML += `
                        <div class="production-item">
                            <span>${cropName}</span>
                            <strong>${cropProductionMap[cropName]} Quintal</strong>
                        </div>
                    `;
                }
            }

            /* CHART RENDERING */
            if (productionChartCanvas) {
                renderProductionChart(cropProductionMap);
            }

            if (loadingSpinner) {
                loadingSpinner.style.display = "none";
            }

            // --- 2. SEARCH & FILTER LOGIC ---
            const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
            let filteredData = result.data.filter((crop) => {
                return (
                    (crop.cropName && crop.cropName.toLowerCase().includes(searchValue)) ||
                    (crop.farmerName && crop.farmerName.toLowerCase().includes(searchValue)) ||
                    (crop.season && crop.season.toLowerCase().includes(searchValue))
                );
            });

            // Empty state manage karo
            if (filteredData.length === 0) {
                if (emptyState) emptyState.style.display = "block";
            } else {
                if (emptyState) emptyState.style.display = "none";
            }

            // --- 3. TABLE BODY RENDERING ---
            if (cropTableBody) {
                cropTableBody.innerHTML = ""; // Purana data saaf karo
                
                filteredData.forEach((crop) => {
                    const row = `
                        <tr>
                            <td>${crop.cropName || ""}</td>
                            <td>${crop.farmerName || ""}</td>
                            <td>${crop.season || ""}</td>
                            <td>${crop.landArea || 0}</td>
                            <td>${crop.production || 0}</td>
                            <td>₹ ${Number(crop.investment || 0).toLocaleString("en-IN")}</td>
                            <td>₹ ${Number(crop.revenue || 0).toLocaleString("en-IN")}</td>
                            <td>${crop.fertilizerUsed || ""}</td>
                            <td class="action-buttons">
                                <button class="edit-btn" onclick="editCrop('${crop._id}')">Edit</button>
                                <button class="delete-btn" onclick="deleteCrop('${crop._id}')">Delete</button>
                            </td>
                        </tr>
                    `;
                    cropTableBody.innerHTML += row;
                });
            }

        } else {
            console.error("Backend Error:", result.message);
            if (loadingSpinner) loadingSpinner.style.display = "none";
            alert("Session expired! Please login again.");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error loading crops:", error);
        if (loadingSpinner) loadingSpinner.style.display = "none";
    }
}

/* =========================
   SECURE ADD / UPDATE CROP
========================= */
if (cropForm) {
    cropForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token"); // Token uthao

        const cropData = {
            cropName: document.getElementById("cropName").value,
            farmerName: document.getElementById("farmerName").value,
            season: document.getElementById("season").value,
            landArea: document.getElementById("landArea").value,
            production: document.getElementById("production").value,
            fertilizerUsed: document.getElementById("fertilizerUsed").value,
            investment: document.getElementById("investment").value,
            revenue: document.getElementById("revenue").value
        };

        try {
            const url = editCropId ? `${API_URL}/updateCrop/${editCropId}` : `${API_URL}/addCrop`;
            const method = editCropId ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    // 🌟 Secure token header joda gaya
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(cropData)
            });

            const result = await response.json();

            if (result.success) {
                showNotification(
                    editCropId ? "Crop Updated Successfully" : "Crop Added Successfully",
                    "success"
                );
                cropForm.reset();
                editCropId = null;
                cropForm.querySelector("button").textContent = "Add Crop";
                loadCrops(); // Naya data refresh karo
            } else {
                showNotification(result.message || "Something went wrong", "error");
            }

        } catch (error) {
            console.error("Error saving crop:", error);
            showNotification("Failed to save crop data", "error");
        }
    });
}

/* =========================
   SECURE EDIT CROP
========================= */
async function editCrop(id) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_URL}/getCrops`, {
            method: "GET",
            headers: {
                // 🌟 Secure token header joda gaya
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();
        const crop = result.data.find((item) => item._id === id);

        if (!crop) return;

        document.getElementById("cropName").value = crop.cropName;
        document.getElementById("farmerName").value = crop.farmerName;
        document.getElementById("season").value = crop.season;
        document.getElementById("landArea").value = crop.landArea;
        document.getElementById("production").value = crop.production;
        document.getElementById("fertilizerUsed").value = crop.fertilizerUsed || "";
        document.getElementById("investment").value = crop.investment || "";
        document.getElementById("revenue").value = crop.revenue || "";

        editCropId = id;
        const submitButton = cropForm.querySelector("button");
        submitButton.textContent = "Update Crop";

        showNotification("Edit mode enabled", "success");

    } catch (error) {
        console.error("Edit Error:", error);
        showNotification("Failed to load crop data", "error");
    }
}

/* =========================
   SECURE DELETE CROP
========================= */
async function deleteCrop(id) {
    const confirmDelete = confirm("Are you sure you want to delete this crop?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_URL}/deleteCrop/${id}`, {
            method: "DELETE",
            headers: {
                // 🌟 Secure token header joda gaya
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (result.success) {
            showNotification("Crop deleted successfully", "success");
            loadCrops(); // Refresh table
        } else {
            showNotification(result.message || "Failed to delete crop", "error");
        }

    } catch (error) {
        console.error("Delete Error:", error);
        showNotification("Failed to delete crop", "error");
    }
}

/* =========================
   INITIAL LOAD & LISTENERS
========================= */
loadCrops();

if (searchInput) {
    searchInput.addEventListener("input", loadCrops);
}

/* =========================
   PRODUCTION CHART FUNCTION
========================= */
function renderProductionChart(cropMap) {
    const labels = Object.keys(cropMap);
    const values = Object.values(cropMap);
    const canvas = document.getElementById("productionChart");

    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (productionChart) {
        productionChart.destroy();
    }

    productionChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Production (Quintal)",
                data: values,
                backgroundColor: "#4CAF50",
                borderWidth: 2,
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
/* =========================
   PROFESSIONAL LOGOUT FUNCTION
========================= */
function logoutUser() {
    // 1. Browser ki memory se Token ko permanently delete karo
    localStorage.removeItem("token");
    
    // (Optional) Agar tumne koi aur user info save ki ho, toh use bhi clear kar sakte ho
    // localStorage.removeItem("userEmail");

    // 2. User ko ek professional feedback notification dikhao
    if (typeof showNotification === "function") {
        showNotification("Logged out successfully! Redirecting...", "success");
    }

    // 3. User ko safe tarike se login page par bhej do
    // 500 milliseconds ka chota sa wait karenge taaki user notification dekh sake
    setTimeout(() => {
        // 🌟 PATH CHECK: Agar aapka login.html file 'pages' folder ke andar hi hai toh "login.html" likhein.
        // Agar login.html main/root folder me hai, toh "../login.html" likhein.
        window.location.href = "login.html"; 
    }, 500);
}