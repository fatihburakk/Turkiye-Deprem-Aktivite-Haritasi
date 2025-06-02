// Harita div'ine erişim
const mapDiv = document.getElementById("map");

// Backend API URL'i
const API_URL = "http://localhost:5000/api/Earthquake/get-stored-data";

// Deprem verilerini çekme fonksiyonu
async function fetchEarthquakeData() {
  try {
    console.log("Deprem verileri çekiliyor...");
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP hata! durum: ${response.status}`);
    }

    const data = await response.json();
    console.log("Çekilen veriler:", data);
    return data.data || {};
  } catch (error) {
    console.error("Deprem verisi çekilirken hata oluştu:", error);
    return [];
  }
}

// Depremleri haritada göster
async function showEarthquakes() {
  const earthquakeData = await fetchEarthquakeData();

  map.eachLayer((layer) => {
    if (layer instanceof L.Circle) {
      map.removeLayer(layer);
    }
  });

  Object.entries(earthquakeData).forEach(([city, earthquakes]) => {
    earthquakes.forEach((quake) => {
      if (quake.coordinates && quake.coordinates.length >= 2) {
        const magnitude = quake.magnitude;
        let color =
          magnitude >= 6 ? "red" : magnitude >= 4 ? "orange" : "yellow";

        // Koordinatları düzelt
        const lat = parseFloat(quake.coordinates[1]);
        const lng = parseFloat(quake.coordinates[0]);

        if (!isNaN(lat) && !isNaN(lng)) {
          const circle = L.circle([lat, lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: magnitude * 8000, // Radius'u küçülttük
          }).addTo(map);

          circle.bindPopup(`
            <strong>${city}</strong><br>
            Büyüklük: ${magnitude}<br>
            Tarih: ${quake.date}<br>
            Saat: ${quake.time}<br>
            Derinlik: ${quake.depth} km
          `);

          // Büyük depremlerde titreme efekti
          if (magnitude >= 5) {
            triggerMapShake(magnitude);
          }
        }
      }
    });
  });
}

// Geliştirilmiş titreme efekti
function triggerMapShake(magnitude) {
  const intensity = Math.min(magnitude / 2, 3); // Şiddet sınırlaması
  const mapContainer = document.getElementById("map");
  mapContainer.style.animation = `shake ${
    0.5 + intensity * 0.1
  }s cubic-bezier(.36,.07,.19,.97) both`;

  setTimeout(() => {
    mapContainer.style.animation = "";
  }, 500 + intensity * 100);
}

// Filtreleme panelini aç/kapat
function toggleFilter() {
  const filterPanel = document.getElementById("filterPanel");
  filterPanel.classList.toggle("open");
  document.getElementById("map").classList.toggle("panel-open");
}

// Filtreleme işlemi
async function applyFilter() {
  const location = document.getElementById("location").value.toLowerCase();
  const magnitudeRange = document.getElementById("magnitude-range").value;

  const earthquakeData = await fetchEarthquakeData();
  let filteredData = {};

  // Her şehir için filtreleme uygula
  Object.entries(earthquakeData).forEach(([city, earthquakes]) => {
    if (!location || city.toLowerCase().includes(location)) {
      const filteredEarthquakes = earthquakes.filter((quake) => {
        const magnitude = quake.magnitude;
        return (
          magnitudeRange === "all" ||
          (magnitudeRange === "low" && magnitude < 4) ||
          (magnitudeRange === "medium" && magnitude >= 4 && magnitude < 6) ||
          (magnitudeRange === "high" && magnitude >= 6)
        );
      });

      if (filteredEarthquakes.length > 0) {
        filteredData[city] = filteredEarthquakes;
      }
    }
  });

  showFilteredEarthquakes(filteredData);
  toggleFilter();
}

// Filtrelenmiş depremleri göster
function showFilteredEarthquakes(filteredData) {
  // Mevcut işaretçileri temizle
  map.eachLayer((layer) => {
    if (layer instanceof L.Circle) {
      map.removeLayer(layer);
    }
  });

  // Filtrelenmiş verileri göster
  Object.entries(filteredData).forEach(([city, earthquakes]) => {
    earthquakes.forEach((quake) => {
      if (quake.coordinates && quake.coordinates.length >= 2) {
        const magnitude = quake.magnitude;
        let color =
          magnitude >= 6 ? "red" : magnitude >= 4 ? "orange" : "yellow";

        L.circle([quake.coordinates[1], quake.coordinates[0]], {
          color: color,
          fillColor: color,
          fillOpacity: 0.5,
          radius: magnitude * 10000,
        }).addTo(map).bindPopup(`
                    <strong>${city}</strong><br>
                    Büyüklük: ${magnitude}<br>
                    Tarih: ${quake.date}<br>
                    Saat: ${quake.time}<br>
                    Derinlik: ${quake.depth} km
                  `);
      }
    });
  });
}

// Filtreleri sıfırla
function resetFilter() {
  document.getElementById("magnitude-range").value = "all";
  document.getElementById("location").value = "";
  showEarthquakes();
  toggleFilter();
}

// Kullanıcı konumunu göster
function showUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        L.marker([userLat, userLon])
          .addTo(map)
          .bindPopup("Sizin Konumunuz")
          .openPopup();

        map.setView([userLat, userLon], 10);
      },
      (error) => {
        console.error("Konum alınamadı:", error);
      }
    );
  } else {
    console.error("Tarayıcınız konum servislerini desteklemiyor.");
  }
}

// Haritayı başlat
const map = L.map("map").setView([39.9334, 32.8597], 6); // Türkiye koordinatları

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Fay hatlarını yükle
async function loadFaultLines() {
  try {
    const response = await fetch('jskodlari/vktrrrr.geojson');
    const faultData = await response.json();
    
    L.geoJSON(faultData, {
      style: {
        color: '#006400',
        weight: 2,
        opacity: 0.8
      },
      onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }
    }).addTo(map);
  } catch (error) {
    console.error('Fay hatları yüklenirken hata oluştu:', error);
  }
}

// MongoDB butonu kaldırıldı, doğrudan verileri gösteriyoruz
async function initialize() {
  await loadFaultLines(); // Fay hatlarını yükle
  await showEarthquakes();
  showUserLocation();
}

document.addEventListener("DOMContentLoaded", initialize);
