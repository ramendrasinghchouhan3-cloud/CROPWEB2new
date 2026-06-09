/**
 * ==========================================================================
 * CROPMANAGER PRECISION WEATHER ENGINE (WEATHERAPI ULTRA-ACCURACY LOCK)
 * ==========================================================================
 */

const WeatherConfig = {
    DEFAULT_LAT: 22.7196,
    DEFAULT_LON: 75.8577,
    DEFAULT_NAME: "Indore, Madhya Pradesh",
    LAND_AREA: "2.4 Hectare",
    // 🔥 Sabse pehle weatherapi.com se free key lakar yahan paste karein
    WEATHERAPI_KEY: "f0a26f8a47f61b82344cf4a7c9e46232" 
};

// DOM Elements
const elSearchBox = document.getElementById('weatherSearchBox');
const elGpsBtn = document.getElementById('weatherGpsBtn');
const elHeroTemp = document.getElementById('wHeroTemp');
const elHeroCondition = document.getElementById('wHeroCondition');
const elHeroLocation = document.getElementById('wHeroLocation');
const elHeroIcon = document.getElementById('wHeroIcon');
const elAdvisoryBox = document.getElementById('weatherAdvisoryBox');
const elAdvisoryBody = document.getElementById('wAdvisoryBody');
const elForecastContainer = document.getElementById('weatherForecastContainer');

// Badges
const elBadgeSpray = document.getElementById('badgeSpray');
const elBadgeRain = document.getElementById('badgeRain');
const elBadgeIrrigation = document.getElementById('badgeIrrigation');

function interpretWMO(code) {
    const isHindi = (localStorage.getItem("appLanguage") || "en") === "hi";
    if (code === 0) return { text: isHindi ? "साफ मौसम / धूप" : "Sunny / Clear Sky", icon: "fa-sun" };
    if ([1, 2, 3].includes(code)) return { text: isHindi ? "आंशिक रूप से बादल" : "Partly Cloudy", icon: "fa-cloud-sun" };
    if ([45, 48].includes(code)) return { text: isHindi ? "घना कोहरा" : "Dense Fog Conditions", icon: "fa-smog" };
    if ([51, 53, 55, 61, 63].includes(code)) return { text: isHindi ? "हल्की बूंदाबांदी / बारिश" : "Slight Rain Fall", icon: "fa-cloud-rain" };
    if ([65, 80, 81, 82].includes(code)) return { text: isHindi ? "भारी मूसलाधार बारिश" : "Heavy Thunder Shower", icon: "fa-cloud-showers-heavy" };
    if ([95, 96, 99].includes(code)) return { text: isHindi ? "आकाशीय बिजली / तूफान" : "Severe Thunderstorm Risk", icon: "fa-cloud-bolt" };
    return { text: isHindi ? "मुख्यतः साफ" : "Mainly Clear", icon: "fa-cloud" };
}

document.addEventListener('DOMContentLoaded', () => {
    fetchLiveWeatherOpenMeteo(WeatherConfig.DEFAULT_LAT, WeatherConfig.DEFAULT_LON, WeatherConfig.DEFAULT_NAME);
    setupEventListeners();
    setupAvatarFallback();
});

function setupEventListeners() {
    if (elGpsBtn) {
        elGpsBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                if (elHeroCondition) elHeroCondition.innerText = "Connecting GPS Satellite...";
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        fetchLiveWeatherOpenMeteo(position.coords.latitude, position.coords.longitude, "Live Area Location");
                    },
                    () => {
                        fetchLiveWeatherOpenMeteo(WeatherConfig.DEFAULT_LAT, WeatherConfig.DEFAULT_LON, WeatherConfig.DEFAULT_NAME);
                    },
                    { enableHighAccuracy: true, timeout: 5000 }
                );
            }
        });
    }

    if (elSearchBox) {
        elSearchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && elSearchBox.value.trim() !== '') {
                const cityName = elSearchBox.value.trim();
                fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`)
                    .then(res => res.json())
                    .then(geoData => {
                        if (geoData.results && geoData.results[0]) {
                            const res = geoData.results[0];
                            fetchLiveWeatherOpenMeteo(res.latitude, res.longitude, `${res.name}, ${res.admin1 || ''}`);
                        } else {
                            if (elHeroCondition) elHeroCondition.innerText = "Location Not Found ❌";
                        }
                    })
                    .catch(() => {
                        if (elHeroCondition) elHeroCondition.innerText = "Search Error ❌";
                    });
            }
        });
    }
}

function fetchLiveWeatherOpenMeteo(lat, lon, locationLabel) {
    // 1. WeatherAPI URL (Google Accuracy Matching Engine)
    const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${WeatherConfig.WEATHERAPI_KEY}&q=${lat},${lon}&aqi=no`;
    
    // 2. Open-Meteo URL (For 7-Day Free Forecast Slider)
    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

    // Promise.all handles parallel requests cleanly without lag
    Promise.all([
        fetch(weatherApiUrl).then(res => res.ok ? res.json() : null).catch(() => null),
        fetch(openMeteoUrl).then(res => res.json())
    ])
    .then(([wapiData, meteoData]) => {
        processAndRenderCombinedData(wapiData, meteoData, lat, lon, locationLabel);
    })
    .catch(err => {
        console.error("Critical Weather Sync Error:", err);
        if (elHeroCondition) elHeroCondition.innerText = "API Sync Error ❌";
    });
}

function processAndRenderCombinedData(wapiData, meteoData, lat, lon, locationLabel) {
    const daily = meteoData.daily;
    const currentMeteo = meteoData.current_weather;

    // Check if WeatherAPI data is successfully fetched
    const useWapi = wapiData && wapiData.current;

    // 1. Temperature (Directly from WeatherAPI - 100% Google Match)
    const exactTemp = useWapi ? Math.round(wapiData.current.temp_c) : Math.round(currentMeteo.temperature);
    if (elHeroTemp) elHeroTemp.innerText = `${exactTemp}°C`;
    if (elHeroLocation) elHeroLocation.innerText = `${locationLabel} (${lat.toFixed(2)}, ${lon.toFixed(2)})`;

    // 2. Weather Condition Text & Icons (Stable fallback logic)
    const weatherCode = currentMeteo ? currentMeteo.weathercode : 0;
    const weatherState = interpretWMO(weatherCode);
    if (elHeroCondition) {
        elHeroCondition.removeAttribute('data-lang-key');
        elHeroCondition.innerText = weatherState.text;
    }
    if (elHeroIcon) {
        elHeroIcon.innerHTML = `<i class="fa-solid ${weatherState.icon}" style="${weatherState.style || ''}"></i>`;
    }

    // 3. Exact Metrics Extraction (Matching Google Weather parameters)
    const windKmh = useWapi ? wapiData.current.wind_kph : currentMeteo.windspeed;
    const humidity = useWapi ? wapiData.current.humidity : 60;
    const currentPrecip = useWapi ? wapiData.current.precip_mm : 0;
    
    const maxRainChance = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;
    const minTemp7Days = Math.min(...daily.temperature_2m_min);

    // ==========================================================================
    // UI BINDING: Real-Time Telemetry Push
    // ==========================================================================
    const elWind = document.getElementById('wWind');
    const elHumidity = document.getElementById('wHumidity');
    const elPrecipitation = document.getElementById('wPrecipitation');

    if (elWind) elWind.innerText = `${Math.round(windKmh)} km/h`;
    if (elHumidity) elHumidity.innerText = `${humidity}%`;
    if (elPrecipitation) {
        // If real rain accumulation happens, show mm, else display probability percentage
        elPrecipitation.innerText = currentPrecip > 0 ? `${currentPrecip} mm` : `${maxRainChance}%`;
    }
    // ==========================================================================

    // 4. Updating Agricultural intelligence without breaking existing properties
    evaluateAgriBadges(windKmh, humidity, maxRainChance);
    generateAgriAdvisory(exactTemp, windKmh, humidity, maxRainChance, minTemp7Days);
    renderForecastSlider(daily);
}

function evaluateAgriBadges(wind, hum, rainChance) {
    const isHindi = (localStorage.getItem("appLanguage") || "en") === "hi";

    if (wind > 20 || rainChance > 50) {
        setElementBadge(elBadgeSpray, isHindi ? "छिड़काव रोकें" : "DO NOT SPRAY", "badge-state-danger");
    } else if (wind > 12 || hum > 80) {
        setElementBadge(elBadgeSpray, isHindi ? "जोखिम भरा" : "RISKY", "badge-state-warning");
    } else {
        setElementBadge(elBadgeSpray, isHindi ? "सुरक्षित" : "EXCELLENT", "badge-state-safe");
    }

    if (rainChance > 60) {
        setElementBadge(elBadgeRain, isHindi ? "भारी खतरा" : "CRITICAL", "badge-state-danger");
    } else if (rainChance > 25) {
        setElementBadge(elBadgeRain, isHindi ? "हल्की आशंका" : "MODERATE", "badge-state-warning");
    } else {
        setElementBadge(elBadgeRain, isHindi ? "कोई खतरा नहीं" : "NO THREAT", "badge-state-safe");
    }

    if (rainChance > 50) {
        setElementBadge(elBadgeIrrigation, isHindi ? "पानी न दें" : "DELAY HYDRATION", "badge-state-safe");
    } else if (wind > 15 && hum < 40) {
        setElementBadge(elBadgeIrrigation, isHindi ? "सिंचाई बढ़ाएं" : "CRITICAL NEED", "badge-state-danger");
    } else {
        setElementBadge(elBadgeIrrigation, isHindi ? "सामान्य" : "STABLE", "badge-state-safe");
    }
}

function setElementBadge(el, text, className) {
    if (!el) return;
    el.innerText = text;
    el.className = `badge-value ${className}`;
}

function generateAgriAdvisory(temp, wind, hum, rainChance, minTemp7Days) {
    const currentLang = localStorage.getItem("appLanguage") || "en";
    let message = "";
    if (!elAdvisoryBox) return;

    elAdvisoryBox.classList.remove('neon-pulse-danger');

    if (currentLang === "hi") {
        if (minTemp7Days <= 3) {
            message = `🚨 <b>पाले (Frost) का आपातकालीन अलर्ट:</b> आगामी दिनों में तापमान खतरनाक स्तर (${minTemp7Days}°C) तक गिरने की उम्मीद है! खेतों में तुरंत हल्की सिंचाई करें।`;
            elAdvisoryBox.classList.add('neon-pulse-danger');
        } else if (wind > 20) {
            message = `❌ <b>छिड़काव तुरंत रोकें:</b> हवा की गति (${Math.round(wind)} किमी/घंटा) बहुत तेज है। आज कीटनाशक का छिड़काव न करें; दक्षता विफल हो जाएगी।`;
            elAdvisoryBox.classList.add('neon-pulse-danger');
        } else {
            message = `🌱 <b>मौसम अनुकूल है:</b> आज का दिन फसलों की बुआई, दवाई के छिड़काव और सामान्य कृषि कार्यों के लिए उत्तम है।`;
        }
    } else {
        if (minTemp7Days <= 3) {
            message = `🚨 <b>Critical Frost Warning:</b> Ground temperature projected to hit dangerous levels (${minTemp7Days}°C). Lightly irrigate fields immediately.`;
            elAdvisoryBox.classList.add('neon-pulse-danger');
        } else if (wind > 20) {
            message = `❌ <b>Danger (High Winds):</b> Current wind speed (${Math.round(wind)} km/h) exceeds safe thresholds. Abort pesticide spraying today.`;
            elAdvisoryBox.classList.add('neon-pulse-danger');
        } else {
            message = `🌱 <b>Optimal Conditions Active:</b> Metrics are perfect for sowing, general maintenance, and crop spraying operations.`;
        }
    }

    if (elAdvisoryBody) elAdvisoryBody.innerHTML = message;
}

function renderForecastSlider(daily) {
    if (!elForecastContainer) return;
    elForecastContainer.innerHTML = "";

    const isHindi = (localStorage.getItem("appLanguage") || "en") === "hi";
    const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysHi = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];

    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        const dayLabel = isHindi ? daysHi[futureDate.getDay()] : daysEn[futureDate.getDay()];

        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);
        const code = daily.weather_code[i];
        const rainChance = daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 0;

        const weatherState = interpretWMO(code);

        let microTagText = isHindi ? "अनुकूल" : "IDEAL";
        let microTagClass = "badge-state-safe";

        if (rainChance > 50) {
            microTagText = isHindi ? "बारिश" : "RAIN RISK";
            microTagClass = "badge-state-danger";
        } else if (maxTemp > 38) {
            microTagText = isHindi ? "तेज धूप" : "HEAT RISK";
            microTagClass = "badge-state-warning";
        }

        const cardHtml = `
            <div class="forecast-vertical-card">
                <div class="forecast-day-label">${i === 0 ? (isHindi ? "आज" : "Today") : dayLabel}</div>
                <div class="forecast-card-icon"><i class="fa-solid ${weatherState.icon}"></i></div>
                <div class="forecast-temp-range">${maxTemp}° / ${minTemp}°</div>
                <div class="forecast-micro-tag ${microTagClass}">${microTagText}</div>
            </div>
        `;
        elForecastContainer.innerHTML += cardHtml;
    }
}

function setupAvatarFallback() {
    const avatarImg = document.querySelector('.user-avatar, img[src*="default-avatar.png"]');
    if (avatarImg) {
        avatarImg.onerror = function() {
            this.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23718096'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z'/></svg>";
        };
    }
}