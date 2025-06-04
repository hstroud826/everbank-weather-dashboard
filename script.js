document.addEventListener('DOMContentLoaded', () => {
    const temperatureSpan = document.getElementById('temperature');
    const windSpeedSpan = document.getElementById('windSpeed');
    const rainRateSpan = document.getElementById('rainRate');
    const lastUpdatedSpan = document.getElementById('lastUpdated');

    // *** IMPORTANT: Replace this with the actual URL of your JSON feed ***
    const JSON_FEED_URL = 'https://cdn.weatherstem.com/dashboard/data/dynamic/model/duval/tiaabankfield/latest.json'; // <-- Change this!

    function updateWeatherDisplay(data) {
        let temperature = "N/A";
        let windSpeed = "N/A";
        let rainRate = "N/A";

        // Find the relevant data from the 'records' array
        data.records.forEach(record => {
            if (record.property === "Temperature" && record.sensor_name === "Thermometer") {
                temperature = `<span class="math-inline">\{record\.value\}</span>{record.units}`;
            } else if (record.property === "Wind Speed" && record.sensor_name === "South Endzone Wind Speed") {
                windSpeed = `<span class="math-inline">\{record\.value\}</span>{record.units}`;
            } else if (record.property === "Rain Rate") { // Assuming "Rain: Instantanous rate" is the one you mean
                rainRate = `<span class="math-inline">\{record\.value\}</span>{record.units}`;
            }
        });

        temperatureSpan.textContent = temperature;
        windSpeedSpan.textContent = temperature === "N/A" ? "N/A" : windSpeed; // Only display if temperature is available
        rainRateSpan.textContent = rainRate;
        lastUpdatedSpan.textContent = new Date(data.time).toLocaleString();
    }

    // Function to fetch data from the actual API URL
    async function fetchWeatherData() {
        try {
            const response = await fetch(JSON_FEED_URL); // Use the defined URL
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            updateWeatherDisplay(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Optionally display an error message on the page
            temperatureSpan.textContent = "Error loading";
            windSpeedSpan.textContent = "Error loading";
            rainRateSpan.textContent = "Error loading";
            lastUpdatedSpan.textContent = "Failed to load";
        }
    }

    // Initial load
    fetchWeatherData();

    // Update every 60 seconds (60000 milliseconds)
    setInterval(fetchWeatherData, 60000);
});
