async function fetchEarthquakeData() {
    try {
        const response = await fetch('http://localhost:5000/api/Earthquake/get-stored-data');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        return {};
    }
}

function createMagnitudeChart(data) {
    const magnitudes = Object.values(data).flat().map(quake => quake.magnitude);
    const ctx = document.getElementById('magnitudeChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0-2', '2-4', '4-6', '6+'],
            datasets: [{
                label: 'Deprem Büyüklük Dağılımı',
                data: [
                    magnitudes.filter(m => m >= 0 && m < 2).length,
                    magnitudes.filter(m => m >= 2 && m < 4).length,
                    magnitudes.filter(m => m >= 4 && m < 6).length,
                    magnitudes.filter(m => m >= 6).length
                ],
                backgroundColor: ['#ffeb3b', '#ffd700', '#ffa500', '#ff4444']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createPieChart(data) {
    const magnitudes = Object.values(data).flat().map(quake => quake.magnitude);
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Düşük (0-4)', 'Orta (4-6)', 'Yüksek (6+)'],
            datasets: [{
                data: [
                    magnitudes.filter(m => m < 4).length,
                    magnitudes.filter(m => m >= 4 && m < 6).length,
                    magnitudes.filter(m => m >= 6).length
                ],
                backgroundColor: ['#ffeb3b', '#ffa500', '#ff4444']
            }]
        },
        options: {
            responsive: true
        }
    });
}

function displayEarthquakes(data) {
    const container = document.getElementById('earthquakeData');
    container.innerHTML = '';

    Object.entries(data).forEach(([city, earthquakes]) => {
        earthquakes.forEach(quake => {
            const div = document.createElement('div');
            div.className = 'earthquake-item';
            
            const magnitudeClass = quake.magnitude >= 6 ? 'magnitude-high' : 
                                 quake.magnitude >= 4 ? 'magnitude-medium' : 
                                 'magnitude-low';
            
            div.innerHTML = `
                <div class="magnitude-indicator ${magnitudeClass}"></div>
                <div>
                    <strong>${city}</strong> - Büyüklük: ${quake.magnitude}
                    <br>
                    Tarih: ${quake.date} ${quake.time} - Derinlik: ${quake.depth} km
                </div>
            `;
            
            container.appendChild(div);
        });
    });
}

async function initializePage() {
    const data = await fetchEarthquakeData();
    createMagnitudeChart(data);
    createPieChart(data);
    displayEarthquakes(data);
}

document.addEventListener('DOMContentLoaded', initializePage); 