// ==========================================================================
// PROFESSIONAL WORKFORCE ACCOUNTING & ENGINE TRACKER
// ==========================================================================

// Global Cache Core Selection
const laborForm = document.getElementById("laborForm");
const laborTableBody = document.getElementById("laborTableBody");
const widgetTotalLabor = document.getElementById("widgetTotalLabor");
const widgetTotalAdvance = document.getElementById("widgetTotalAdvance");
const widgetPendingPayouts = document.getElementById("widgetPendingPayouts");

// Modals Hub Bindings
const advanceModal = document.getElementById("advanceModal");
const targetLaborId = document.getElementById("targetLaborId");
const modalAmount = document.getElementById("modalAmount");
const receiptModal = document.getElementById("receiptModal");
const receiptContent = document.getElementById("receiptContent");

// Advanced Tracker Elements
const attendanceMarkModal = document.getElementById("attendanceMarkModal");
const attTargetLaborId = document.getElementById("attTargetLaborId");
const attSelectedDate = document.getElementById("attSelectedDate");
const attMarkTitle = document.getElementById("attMarkTitle");
const attendanceHistoryModal = document.getElementById("attendanceHistoryModal");
const historyModalTitle = document.getElementById("historyModalTitle");
const historyModalSubtitle = document.getElementById("historyModalSubtitle");
const attendanceTimelineContainer = document.getElementById("attendanceTimelineContainer");

let currentUsersEmail = localStorage.getItem("currentUserEmail") || localStorage.getItem("email") || "admin@gmail.com";
const STORAGE_KEY = `labor_${currentUsersEmail}`;
let laborList = [];

// App Core Mount Engine
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("joiningDate")) {
        document.getElementById("joiningDate").value = new Date().toISOString().split('T')[0];
    }
    loadLaborData();
});

function loadLaborData() {
    const rawData = localStorage.getItem(STORAGE_KEY);
    laborList = rawData ? JSON.parse(rawData) : [];
    renderLaborTable();
    updateSummaryWidgets();
}

function saveLaborData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(laborList));
    updateSummaryWidgets();
}

// ==========================================================================
// 📅 ADVANCED LIVE ATTENDANCE LOGIC ENGINE (PRO TRACKER)
// ==========================================================================
function openAttendanceMarkModal(id) {
    const labor = laborList.find(item => item.id === id);
    if (!labor) return;
    
    attTargetLaborId.value = id;
    attMarkTitle.innerText = `${labor.name} - Haajiri Portal`;
    attSelectedDate.value = new Date().toISOString().split('T')[0];
    attendanceMarkModal.style.display = "flex";
}

function closeAttendanceMarkModal() {
    attendanceMarkModal.style.display = "none";
}

function saveCustomAttendance(status) {
    const id = attTargetLaborId.value;
    const dateValue = attSelectedDate.value;
    
    if (!dateValue) {
        alert("Kripya tareekh chunie!");
        return;
    }
    
    const labor = laborList.find(item => item.id === id);
    if (!labor) return;
    
    // Modern Date Format Map (e.g., "05 Jun 2026")
    const formattedDate = new Date(dateValue).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    
    if (!labor.attendanceLog) labor.attendanceLog = [];
    
    // Check duplication logs
    const existingIndex = labor.attendanceLog.findIndex(log => log.date === formattedDate);
    
    if (existingIndex !== -1) {
        const oldStatus = labor.attendanceLog[existingIndex].status;
        if (oldStatus === "Present" && status === "Absent") {
            labor.totalDaysPresent = Math.max(0, labor.totalDaysPresent - 1);
        } else if (oldStatus === "Absent" && status === "Present") {
            labor.totalDaysPresent += 1;
        }
        labor.attendanceLog[existingIndex].status = status;
    } else {
        labor.attendanceLog.push({ date: formattedDate, status: status });
        if (status === "Present") {
            labor.totalDaysPresent += 1;
        }
    }
    
    saveLaborData();
    renderLaborTable();
    closeAttendanceMarkModal();
}

// ==========================================================================
// 🔄 PREMIUM FLIPKART STYLE TIMELINE ENGINE
// ==========================================================================
function viewAttendanceHistory(id) {
    const labor = laborList.find(item => item.id === id);
    if (!labor) return;

    historyModalTitle.innerText = labor.name;
    historyModalSubtitle.innerText = `Total Present: ${labor.totalDaysPresent} Days | Dihadi: ₹${labor.dailyWage}`;
    attendanceTimelineContainer.innerHTML = "";

    if (!labor.attendanceLog || labor.attendanceLog.length === 0) {
        attendanceTimelineContainer.innerHTML = `
            <div style="text-align:center; padding:40px 20px; color:#64748b; font-size:14px;">
                📭 Is worker ki koi history nahi mili.<br><strong style="color:#3b82f6;">Mark Attendance</strong> par click karke shuru karein.
            </div>
        `;
    } else {
        // Sort chronologically (Newest first)
        const sortedLogs = [...labor.attendanceLog].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedLogs.forEach(log => {
            const isPresent = log.status === "Present";
            const badgeBg = isPresent ? "#dcfce7" : "#fee2e2";
            const badgeColor = isPresent ? "#16a34a" : "#ef4444";
            const borderIndicator = isPresent ? "4px solid #10b981" : "4px solid #ef4444";

            attendanceTimelineContainer.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 16px; background:#f8fafc; border-left:${borderIndicator}; border-radius:8px; margin-bottom:10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                    <div style="display:flex; flex-direction:column;">
                        <span style="font-weight:600; color:#1e293b; font-size:14px;">📅 ${log.date}</span>
                        <small style="color:#94a3b8; font-size:11px; margin-top:2px;">Logged Successfully</small>
                    </div>
                    <span style="padding:6px 14px; border-radius:30px; font-size:12px; font-weight:700; background:${badgeBg}; color:${badgeColor}; text-transform:uppercase; letter-spacing:0.5px;">
                        ${log.status === 'Present' ? '🟢 Present' : '🔴 Absent'}
                    </span>
                </div>
            `;
        });
    }

    attendanceHistoryModal.style.display = "flex";
}

function closeHistoryModal() {
    attendanceHistoryModal.style.display = "none";
}

// ==========================================================================
// LEDGER CORE CONTROLLERS
// ==========================================================================
laborForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("laborName").value.trim();
    const phone = document.getElementById("laborPhone").value.trim();
    const address = document.getElementById("laborAddress").value.trim();
    const joiningDate = document.getElementById("joiningDate").value;
    const skill = document.getElementById("laborSkill").value;
    const dailyWage = Number(document.getElementById("dailyWage").value);
    const openingAdvance = Number(document.getElementById("openingAdvance").value) || 0;

    const formattedJoinDate = new Date(joiningDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const newLabor = {
        id: "LAB-" + Date.now().toString().slice(-6),
        name: name,
        phone: phone,
        address: address,
        joiningDate: formattedJoinDate,
        skill: skill,
        dailyWage: dailyWage,
        totalDaysPresent: 0, 
        advancePaid: openingAdvance,
        status: "Active",
        attendanceLog: []
    };

    laborList.push(newLabor);
    saveLaborData();
    renderLaborTable();
    laborForm.reset();
    document.getElementById("joiningDate").value = new Date().toISOString().split('T')[0];
});

function renderLaborTable() {
    laborTableBody.innerHTML = "";

    if (laborList.length === 0) {
        laborTableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #64748b;">
                    📭 No active workforce profiles detected. Use the control form to register workers.
                </td>
            </tr>
        `;
        return;
    }

    laborList.forEach(labor => {
        const totalEarned = labor.dailyWage * labor.totalDaysPresent;
        const pendingBalance = totalEarned - labor.advancePaid;

        let statusHtml = "";
        if (pendingBalance > 0) {
            statusHtml = `<span class="status-badge" style="background:#fef3c7; color:#d97706;">₹${pendingBalance.toLocaleString('en-IN')} Due</span>`;
        } else if (pendingBalance === 0) {
            statusHtml = `<span class="status-badge" style="background:#dcfce7; color:#15803d;">✓ Settled</span>`;
        } else {
            statusHtml = `<span class="status-badge" style="background:#fee2e2; color:#b91c1c;">₹${Math.abs(pendingBalance).toLocaleString('en-IN')} Adv Heavy</span>`;
        }

        laborTableBody.innerHTML += `
            <tr style="height:70px;">
                <td>
                    <strong style="color:#0f172a; font-size:14px;">${labor.name}</strong><br>
                    <small style="color:#64748b; font-size:12px;">📱 ${labor.phone} | 📍 ${labor.address}</small>
                </td>
                <td><span style="font-size:12px; font-weight:600; color:#3b82f6;">${labor.skill}</span></td>
                <td style="text-align: center;">
                    <button class="submit-btn" style="padding: 6px 12px; font-size:12px; width:auto; background:var(--primary); margin-bottom:4px;" onclick="openAttendanceMarkModal('${labor.id}')">✍️ Mark Haajiri</button><br>
                    <button class="action-link-btn" style="font-size:11px; margin:0;" onclick="viewAttendanceHistory('${labor.id}')">📅 History Timeline (${labor.totalDaysPresent}d)</button>
                </td>
                <td style="font-weight:500;">₹${labor.dailyWage.toLocaleString('en-IN')}</td>
                <td style="font-weight:700; color:var(--success);">₹${totalEarned.toLocaleString('en-IN')}</td>
                <td style="font-weight:500; color:#475569;">₹${labor.advancePaid.toLocaleString('en-IN')}</td>
                <td>${statusHtml}</td>
                <td style="text-align: center;">
                    <button class="action-link-btn" onclick="openAdvanceModal('${labor.id}')">💸 Advance</button>
                    <button class="action-link-btn settle" onclick="generateReceipt('${labor.id}')">📄 Receipt</button>
                    <button class="action-link-btn delete" onclick="deleteLabor('${labor.id}')">🗑️ Delete</button>
                </td>
            </tr>
        `;
    });
}

function updateSummaryWidgets() {
    let activeCount = laborList.length;
    let totalAdvance = laborList.reduce((sum, item) => sum + Number(item.advancePaid), 0);
    let totalPending = laborList.reduce((sum, item) => {
        let earned = item.dailyWage * item.totalDaysPresent;
        let diff = earned - item.advancePaid;
        return diff > 0 ? sum + diff : sum;
    }, 0);

    if (widgetTotalLabor) widgetTotalLabor.innerText = `${activeCount} Registered`;
    if (widgetTotalAdvance) widgetTotalAdvance.innerText = `₹${totalAdvance.toLocaleString('en-IN')}`;
    if (widgetPendingPayouts) widgetPendingPayouts.innerText = `₹${totalPending.toLocaleString('en-IN')}`;
}

function openAdvanceModal(id) {
    const labor = laborList.find(item => item.id === id);
    if (!labor) return;
    targetLaborId.value = id;
    modalTitle.innerText = `Debit Advance - ${labor.name}`;
    modalSubtitle.innerText = `Current Earnings: ₹${labor.dailyWage * labor.totalDaysPresent} | Existing Advance Debit: ₹${labor.advancePaid}`;
    advanceModal.style.display = "flex";
}

function closeModal() {
    advanceModal.style.display = "none";
    modalAmount.value = "";
}

function processAdvanceSubmit() {
    const id = targetLaborId.value;
    const amount = Number(modalAmount.value);
    if (!amount || amount <= 0) return;
    
    const labor = laborList.find(item => item.id === id);
    if (labor) {
        labor.advancePaid += amount;
        saveLaborData();
        renderLaborTable();
        closeModal();
    }
}

function generateReceipt(id) {
    const labor = laborList.find(item => item.id === id);
    if (!labor) return;
    const totalEarned = labor.dailyWage * labor.totalDaysPresent;
    const pendingBalance = totalEarned - labor.advancePaid;
    
    receiptContent.innerHTML = `
        <strong>Timestamp :</strong> ${new Date().toLocaleString('en-IN')}<br>
        <strong>Worker ID :</strong> ${labor.id}<br>
        <strong>Full Name :</strong> ${labor.name}<br>
        -----------------------------------<br>
        <strong>Attendance:</strong> ${labor.totalDaysPresent} Days Present<br>
        <strong>Dihadi Rate:</strong> ₹${labor.dailyWage} / Day<br>
        <strong>Gross Wage :</strong> ₹${totalEarned.toLocaleString('en-IN')}<br>
        <strong>Advance (-) :</strong> ₹${labor.advancePaid.toLocaleString('en-IN')}<br>
        -----------------------------------<br>
        <h3 style="color:#ef4444; margin:10px 0;">NET PAYABLE: ₹${(pendingBalance > 0 ? pendingBalance : 0).toLocaleString('en-IN')}</h3>
        -----------------------------------<br>
        <button class="submit-btn" style="background:var(--success); font-weight:700;" onclick="settleLaborDues('${labor.id}')">✅ Instant Full Payout Settle</button>
    `;
    receiptModal.style.display = "flex";
}

function closeReceiptModal() { receiptModal.style.display = "none"; }

function settleLaborDues(id) {
    const labor = laborList.find(item => item.id === id);
    if (labor && confirm(`Kya aap ${labor.name} ka poora hisab barabar karke attendance logs reset karna chahte hain?`)) {
        labor.totalDaysPresent = 0;
        labor.advancePaid = 0;
        labor.attendanceLog = [];
        saveLaborData();
        renderLaborTable();
        closeReceiptModal();
    }
}

function deleteLabor(id) {
    if (confirm("Are you absolutely sure you want to delete this profile permanently from ledger records?")) {
        laborList = laborList.filter(item => item.id !== id);
        saveLaborData();
        renderLaborTable();
    }
}