// 1. Sabhi pages ke sabhi words ki ek akeli dictionary (UPDATED WITH MISSING WORDS)
const siteDictionary = {
    en: {
        // Sidebar & Header Links
        nav_dashboard: "Dashboard",
        nav_crops: "Crops",
        nav_farmers: "Farmers",
        nav_reports: "Reports",
        nav_analytics: "Analytics",
        nav_settings: "Settings",
        btn_logout: "Logout",
        

        
        // Settings Page Words
        settings_title: "Profile Settings",
        lang_label: "Select Language",
        theme_label: "Dark Mode",
        
        // Farmers / Labor Page Words
        farmer_title: "Workforce Labor Khata",
        farmer_subtitle: "Track advanced workflows, automated payroll accounting, and premium attendance timelines.",
        widget_active_labor: "Active Labor Force",
        widget_total_advance: "Total Advance Out",
        widget_net_dues: "Net Disbursable Dues",
        form_title: "Add New Workforce",

        // === 🆕 SATELLITE / MISSING WORDS FOR FARMERS PAGE ===
        table_title: "Live Active Payroll Ledger",
        th_worker_profile: "WORKER PROFILE",
        th_category: "CATEGORY",
        th_attendance: "ATTENDANCE LOGGER",
        th_wage: "WAGE RATE",
        th_gross: "GROSS EARNED",
        th_advance: "ADVANCE PAID",
        th_status: "LEDGER STATUS",
        th_controls: "CONTROLS",
        
        // Dynamic Table Values & Buttons
        val_unskilled: "Unskilled",
        val_skilled: "Skilled",
        val_due: "Due",
        val_registered: "Registered",
        btn_mark_haajiri: "🔥 Mark Haajiri",
        btn_history: "📅 History Timeline (1d)",
        btn_control_advance: "💸 Advance",
        btn_control_receipt: "📄 Receipt",
        btn_control_delete: "🗑️ Delete",

        // Form Placeholders & Labels
        lbl_labor_name: "Labor/Worker Full Name",
        lbl_phone: "Phone Number",
        lbl_address: "Residential Address/Village",
        lbl_joining_date: "Joining Date",
        lbl_skill: "Skill Core",

        // === 🆕 CROPS & REPORTS PAGE WORDS ===
        crop_title: "Crop Management",
        crop_subtitle: "Manage all crop records professionally.",
        widget_total_crops: "Total Crops",
        widget_total_farmers: "Total Farmers",
        widget_total_profit: "Total Profit",
        widget_overall_earnings: "Overall business earnings",
        widget_crop_production: "Crop Production",
        crop_form_title: "Add Crop",
        crop_form_subtitle: "Enter crop details carefully.",
        crop_table_title: "Crop Records",
        crop_table_subtitle: "All saved crop data.",
        report_table_title: "Recent Crop Reports",
        report_table_subtitle: "Complete crop history records.",
        
        // Crop Table Headers
        th_crop: "Crop",
        th_farmer: "Farmer",
        th_season: "Season",
        th_area: "Area",
        th_production: "Production",
        th_investment: "Investment",
        th_revenue: "Revenue",
        th_fertilizer: "Fertilizer",
        th_actions: "Actions",
        btn_edit: "Edit"
    },
    hi: {
        // Sidebar & Header Links
        nav_dashboard: "डैशबोर्ड",
        nav_crops: "फसलें",
        nav_farmers: "किसान / मजदूर",
        nav_reports: "रिपोर्ट्स",
        nav_analytics: "एनालिटिक्स",
        nav_settings: "सेटिंग्स",
        btn_logout: "लॉगआउट",
        // Isko apne langEngine.js ke 'hi:' wale block me add karo:
dash_title: "डैशबोर्ड",
dash_subtitle: "क्रॉपमैनेजर के प्रोफेशनल डैशबोर्ड पर आपका स्वागत है।",
        // Settings Page Words
        settings_title: "प्रोफ़ाइल सेटिंग्स",
        lang_label: "भाषा चुनें",
        theme_label: "डार्क मोड",
        
        // Farmers / Labor Page Words
        farmer_title: "वर्कफोर्स लेबर खाता",
        farmer_subtitle: "उन्नत कार्यप्रवाह, स्वचालित पेरोल अकाउंटिंग और हाजिरी समयसीमा को ट्रैक करें।",
        widget_active_labor: "सक्रिय मजदूर बल",
        widget_total_advance: "कुल अग्रिम (एडवांस) भुगतान",
        widget_net_dues: "कुल dey राशि (बाकी दिहाड़ी)",
        form_title: "नया मजदूर जोड़ें",
// Isko English (en) block me daalo:




lbl_labor_name: "Labor/Worker Full Name",
lbl_labor_phone: "Phone Number",
lbl_labor_address: "Residential Address/Village",
lbl_joining_date: "Joining Date",
lbl_skill_core: "Skill Core",
opt_unskilled: "Unskilled (Harvesting/Weeding)",
opt_skilled: "Skilled Specialty (Tractor/Machinery)",
lbl_daily_wage: "Daily Wage Rate (Dihadi ₹)",
lbl_opening_advance: "Opening Advance Balance",
th_worker: "Worker Profile",
th_category: "Category",
th_attendance: "Attendance Logger",
th_wage_rate: "Wage Rate",
th_gross_earned: "Gross Earned",
th_advance_paid: "Advance Paid",
th_status: "Ledger Status",
th_controls: "Controls",
md_mark_attendance: "Mark Attendance",
md_mark_subtitle: "Select date to apply real-time attendance logs.",
lbl_target_date: "Target Log Date",
btn_present: "🟢 Present",
btn_absent: "🔴 Absent",
btn_dismiss: "Dismiss",
md_logs_title: "Attendance Logs",
btn_close_timeline: "Close Timeline",
md_disburse_title: "Disburse Advance",
lbl_advance_amount: "Advance Amount (₹)",
btn_confirm_debit: "Confirm Debit",
btn_cancel: "Cancel",
rc_subtitle: "Workforce Settlement Ledger",
rc_footer: "Please save snapshot for official WhatsApp Records.",
btn_close_receipt: "Close Receipt",



// Isko Hindi (hi) block me daalo:
lbl_labor_name: "मजदूर का पूरा नाम",
lbl_labor_phone: "मोबाइल नंबर",
lbl_labor_address: "रहने का पता / गांव",
lbl_joining_date: "जुड़ने की तारीख",
lbl_skill_core: "काम का प्रकार (स्किल)",
opt_unskilled: "अकुशल (कटाई / निंदाई)",
opt_skilled: "कुशल विशेषज्ञ (ट्रैक्टर / मशीनरी)",
lbl_daily_wage: "दैनिक मजदूरी दर (दिहाड़ी ₹)",
lbl_opening_advance: "पहले का एडवांस बैलेंस (यदि है)",
th_worker: "मजदूर का विवरण",
th_category: "श्रेणी",
th_attendance: "हाजिरी लॉग",
th_wage_rate: "मजदूरी दर",
th_gross_earned: "कुल कमाई",
th_advance_paid: "दिया गया एडवांस",
th_status: "खाता स्थिति",
th_controls: "नियंत्रण (कंट्रोल्स)",
md_mark_attendance: "हाजिरी लगाएं",
md_mark_subtitle: "हाजिरी अपडेट करने के लिए तारीख चुनें।",
lbl_target_date: "हाजिरी की तारीख",
btn_present: "🟢 उपस्थित (Present)",
btn_absent: "🔴 अनुपस्थित (Absent)",
btn_dismiss: "रद्द करें",
md_logs_title: "हाजिरी का रिकॉर्ड",
btn_close_timeline: "टाइमलाइन बंद करें",
md_disburse_title: "एडवांस भुगतान करें",
lbl_advance_amount: "एडवांस राशि (₹)",
btn_confirm_debit: "डेबिट कन्फर्म करें",
btn_cancel: "वापस जाएं",
rc_subtitle: "मजदूर भुगतान रसीद",
rc_footer: "कृपया इस रसीद का स्क्रीनशॉट व्हाट्सएप रिकॉर्ड के लिए सुरक्षित रखें।",
btn_close_receipt: "रसीद बंद करें",
        // === 🆕 SATELLITE / MISSING WORDS FOR FARMERS PAGE ===
        table_title: "लाइव एक्टिव पेरोल लेजर",
        th_worker_profile: "मजदूर प्रोफाइल",
        th_category: "श्रेणी",
        th_attendance: "हाजिरी लॉगर",
        th_wage: "दिहाड़ी दर",
        th_gross: "कुल कमाई",
        th_advance: "अग्रिम भुगतान",
        th_status: "खाता स्थिति",
        th_controls: "नियंत्रण (कंट्रोल्स)",
        
// Isko English (en) block me daalo:
reports_title: "Reports",
reports_subtitle: "Professional crop reports and business insights.",
widget_total_crops: "Total Crops",
widget_total_farmers: "Total Farmers",
widget_total_profit: "Total Profit",
rep_table_title: "Recent Crop Reports",
rep_table_subtitle: "Complete crop history records.",
th_crop: "Crop",
th_farmer_rep: "Farmer",
th_season_rep: "Season",
th_area_rep: "Area",
th_production_rep: "Production",
th_investment_rep: "Investment",
th_revenue_rep: "Revenue",
th_fertilizer_rep: "Fertilizer",
th_actions_rep: "Actions",

// Isko Hindi (hi) block me daalo:
reports_title: "रिपोर्ट्स",
reports_subtitle: "फसलों की रिपोर्ट और व्यापार का पूरा लेखा-जोखा।",
widget_total_crops: "कुल फसलें",
widget_total_farmers: "कुल किसान / मजदूर",
widget_total_profit: "कुल शुद्ध मुनाफा",
rep_table_title: "फसल रिपोर्ट सूची",
rep_table_subtitle: "फसलों के इतिहास का पूरा रिकॉर्ड।",
th_crop: "फसल",
th_farmer_rep: "किसान",
th_season_rep: "सीजन",
th_area_rep: "क्षेत्रफल",
th_production_rep: "उत्पादन",
th_investment_rep: "कुल लागत",
th_revenue_rep: "कुल कमाई",
th_fertilizer_rep: "खाद का उपयोग",
th_actions_rep: "कार्रवाई (Actions)",


// Isko English (en) block me daalo:
analytics_title: "Analytics Dashboard",
analytics_subtitle: "Smart agriculture analytics and production insights.",
chart_title: "Production Analytics",
chart_subtitle: "Crop-wise production data.",



// Isko Hindi (hi) block me daalo:
analytics_title: "एनालिटिक्स डैशबोर्ड",
analytics_subtitle: "स्मार्ट कृषि विश्लेषण और उत्पादन से जुड़ी जानकारियां।",
chart_title: "उत्पादन का विश्लेषण (Graph)",
chart_subtitle: "फसल के अनुसार कुल उत्पादन का आंकड़ा।",


// Isko English (en) block me daalo:
control_panel_title: "⚙️ Control Panel",
control_panel_subtitle: "Manage your profile details, change system themes, and switch languages smoothly.",
role_admin: "Super Admin",
btn_change_photo: "Change Profile Photo",
photo_note: "PNG, JPG (Max 2MB)",
sec_profile_title: "Profile Details",
btn_edit_profile: "Edit Profile",
lbl_name: "Full Name",
lbl_email: "Email Address",
lbl_phone: "Contact Number",
lbl_land: "Base Land Area (Hectare)",
lbl_district: "Primary District",
lbl_address: "Permanent Address",
btn_cancel: "Cancel",
btn_save: "Save Changes",
theme_section_title: "Interface Style",
theme_section_desc: "Choose how your CropManager portal looks.",
theme_light_label: "Light Mode",
theme_dark_label: "Dark Mode",
lang_section_title: "System Language",
lang_section_desc: "Select your preferred language for the dashboard.",
sec_security_title: "Account Security",
lbl_curr_pass: "Current Password",
lbl_new_pass: "New Password",
btn_update_pass: "Update Password",

// Add these within your English object inside langEngine.js
ph_weather_search: "Search City or Village...",
btn_use_gps: "Use Live Location",
w_loading: "Syncing Weather...",
lbl_badge_spray: "Spray Window",
lbl_badge_rain: "Rain Threat",
lbl_badge_irrigation: "Irrigation Need",
lbl_ai_advisory: "AI Crop Advisor Summary",
w_gathering_data: "Analyzing atmospheric data matrices to formulate customized localized field suggestions...",
lbl_weather_disclaimer: "ℹ️ Disclaimer: Assistive calculations based on live models. Inspect actual ground conditions before executing key activities.",
w_clear: "Sunny / Clear Sky",
w_mainly_clear: "Mainly Clear",
w_partly_cloudy: "Partly Cloudy",
w_overcast: "Overcast Sky",
w_fog: "Dense Fog Conditions",
w_drizzle_light: "Light Drizzle",
w_rain_slight: "Slight Rain Fall",
w_rain_mod: "Moderate Rain",
w_rain_heavy: "Heavy Thunder Shower",
w_thunderstorm: "Severe Thunderstorm Risk",



// Isko Hindi (hi) block me daalo:
control_panel_title: "⚙️ कंट्रोल पैनल",
control_panel_subtitle: "अपनी प्रोफ़ाइल विवरण प्रबंधित करें, थीम बदलें, और भाषा आसानी से बदलें।",
role_admin: "मुख्य एडमिन (Super Admin)",
btn_change_photo: "प्रोफ़ाइल फोटो बदलें",
photo_note: "PNG, JPG (अधिकतम 2MB)",
sec_profile_title: "प्रोफ़ाइल विवरण",
btn_edit_profile: "प्रोफ़ाइल बदलें",
lbl_name: "पूरा नाम",
lbl_email: "ईमेल पता",
lbl_phone: "संपर्क नंबर",
lbl_land: "कुल भूमि क्षेत्र (हेक्टेयर)",
lbl_district: "प्राथमिक जिला",
lbl_address: "स्थायी पता",
btn_cancel: "रद्द करें",
btn_save: "बदलाव सुरक्षित करें",
theme_section_title: "इंटरफ़ेस स्टाइल (थीम)",
theme_section_desc: "चुनें कि आपका CropManager पोर्टल कैसा दिखेगा।",
theme_light_label: "लाइट मोड (Light)",
theme_dark_label: "डार्क मोड (Dark)",
lang_section_title: "सिस्टम की भाषा",
lang_section_desc: "डैशबोर्ड के लिए अपनी पसंदीदा भाषा चुनें।",
sec_security_title: "खाता सुरक्षा",
lbl_curr_pass: "वर्तमान पासवर्ड",
lbl_new_pass: "नया पासवर्ड",
btn_update_pass: "पासवर्ड अपडेट करें",

// ... tumhare purane Hindi keys ke baad comma lagakar yeh paste karo:
ph_weather_search: "शहर या गांव खोजें...",
btn_use_gps: "मेरी लाइव लोकेशन",
w_loading: "मौसम सिंक हो रहा है...",
lbl_badge_spray: "छिड़काव का समय",
lbl_badge_rain: "बारिश का खतरा",
lbl_badge_irrigation: "सिंचाई की जरूरत",
lbl_ai_advisory: "एआई फसल सलाहकार सारांश",
w_gathering_data: "कृषि संबंधी सलाह तैयार करने के लिए वायुमंडलीय डेटा का विश्लेषण किया जा रहा है...",
lbl_weather_disclaimer: "ℹ️ अस्वीकरण: लाइव वैज्ञानिक मॉडलों पर आधारित सहायक गणना। कड़े निर्णय लेने से पहले जमीनी स्तर की जांच करें।",
w_clear: "साफ मौसम / धूप",
w_mainly_clear: "मुख्यतः साफ",
w_partly_cloudy: "आंशिक रूप से बादल",
w_overcast: "घने बादल",
w_fog: "घना कोहरा",
w_drizzle_light: "हल्की बूंदाबांदी",
w_rain_slight: "हल्की बारिश",
w_rain_mod: "मध्यम वर्षा",
w_rain_heavy: "भारी मूसलाधार बारिश",
w_thunderstorm: "आकाशीय बिजली / तूफान",


        // Dynamic Table Values & Buttons
        val_unskilled: "अकुशल",
        val_skilled: "कुशल",
        val_due: "बाकी",
        val_registered: "पंजीकृत",
        btn_mark_haajiri: "🔥 हाजिरी भरें",
        btn_history: "📅 इतिहास टाइमline (1d)",
        btn_control_advance: "💸 अग्रिम दें",
        btn_control_receipt: "📄 रसीद",
        btn_control_delete: "🗑️ हटाएं",

        // Form Placeholders & Labels
        lbl_labor_name: "मजदूर का पूरा नाम",
        lbl_phone: "मोबाइल नंबर",
        lbl_address: "स्थायी पता/गांव",
        lbl_joining_date: "जुड़ने की तारीख",
        lbl_skill: "महारत / हुनर",

        // === 🆕 CROPS & REPORTS PAGE WORDS ===
        crop_title: "फसल प्रबंधन",
        crop_subtitle: "सभी फसल रिकॉर्ड प्रबंधित करें।",
        widget_total_crops: "कुल फसलें",
        widget_total_farmers: "कुल किसान",
        widget_total_profit: "कुल मुनाफा",
        widget_overall_earnings: "कुल व्यापार कमाई",
        widget_crop_production: "फसल उत्पादन",
        crop_form_title: "फसल जोड़ें",
        crop_form_subtitle: "फसल की जानकारी ध्यान से भरें।",
        crop_table_title: "फसल रिकॉर्ड",
        crop_table_subtitle: "सभी सुरक्षित किया गया डेटा।",
        report_table_title: "हालिया फसल रिपोर्ट्स",
        report_table_subtitle: "फसल का पूरा इतिहास रिकॉर्ड।",
        
        // Crop Table Headers
        th_crop: "फसल",
        th_farmer: "किसान",
        th_season: "सीजन",
        th_area: "क्षेत्रफल",
        th_production: "उत्पादन",
        th_investment: "लागत (इन्वेस्टमेंट)",
        th_revenue: "कमाई (राजस्व)",
        th_fertilizer: "खाद (फर्टिलाइजर)",
        th_actions: "कार्रवाई",
        btn_edit: "बदलें"

        
        
    }
    
    
};

// 2. Har page par language apply karne ka main function
function applyWebsiteLanguage() {
    // Check karo localStorage me user ne kaun si language set ki hai (Default: English 'en')
    const savedLang = localStorage.getItem("appLang") || "en";
    
    // Website ke un sabhi tags ko dhoondho jinpe data-lang-key laga hai
    document.querySelectorAll("[data-lang-key]").forEach(element => {
        const key = element.getAttribute("data-lang-key");
        
        // Agar dictionary me wo word hai, toh text badal do
        if (siteDictionary[savedLang] && siteDictionary[savedLang][key]) {
            element.innerText = siteDictionary[savedLang][key];
        }
    });
}

// 3. Jaise hi koi bhi HTML page khule, ye language automatic apply ho jaye
document.addEventListener("DOMContentLoaded", applyWebsiteLanguage);
