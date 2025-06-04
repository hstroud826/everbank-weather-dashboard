document.addEventListener('DOMContentLoaded', () => {
    const temperatureSpan = document.getElementById('temperature');
    const windSpeedSpan = document.getElementById('windSpeed');
    const rainRateSpan = document.getElementById('rainRate');
    const lastUpdatedSpan = document.getElementById('lastUpdated');

    // Your provided JSON data
    const weatherDataJson = {
        "time":"2025-06-03 22:23:43",
        "validation_sensor":28177,
        "records":[
            {"value":29.934,"units":"in. Hg","property":"Barometric Pressure","sensor_name":"Barometer","id":28150},
            {"value":"Rising","units":" ","id":28152,"property":"Barometric Pressure Tendency","sensor_name":"Barometer Tendency"},
            {"property":"Wind Speed","sensor_name":"10 Minute Wind Gust","id":28155,"units":"mph","value":14},
            {"value":7,"units":"mph","sensor_name":"Anemometer","property":"Wind Speed","id":28156},
            {"units":"&deg;F","value":71.2,"id":28159,"property":"Temperature","sensor_name":"Dewpoint"},
            {"id":28162,"property":"Temperature","sensor_name":"Heat Index","value":76.2,"units":"&deg;F"},
            {"units":"%","value":90.8,"sensor_name":"Hygrometer","property":"Relative Humidity","id":28165},
            {"units":"in.","value":0.6,"property":"Today's Rainfall","sensor_name":"Rain: Accum last 24 hr","id":28168},
            {"units":"in/hr","value":0,"property":"Rain Rate","sensor_name":"Rain: Instantanous rate","id":28171},
            {"id":28174,"property":"Solar Radiation","sensor_name":"Solar Radiation Sensor","value":0,"units":"W/m^2"},
            {"units":"&deg;F","value":74.1,"sensor_name":"Thermometer","property":"Temperature","id":28177},
            {"property":"Ultra Violet Radiation","sensor_name":"UV Radiation Sensor","id":28180,"value":0,"units":" "},
            {"units":"&deg;F","value":74.1,"sensor_name":"Wind Chill","property":"Temperature","id":28186},
            {"units":"&deg;","value":124,"sensor_name":"Wind Vane","property":"Wind Direction","id":28189},
            {"value":0,"units":"&deg;F","sensor_name":"Field-Level Temperature","property":"Temperature","id":28190},
            {"units":"%","value":0,"property":"Relative Humidity","sensor_name":"Field-Level Humidity","id":28193},
            {"units":"mph","value":2,"id":28196,"property":"Wind Speed","sensor_name":"North Endzone Wind Speed"},
            {"value":146,"units":"&deg;","property":"Wind Direction","sensor_name":"North Endzone Wind Direction","id":28199},
            {"property":"Wind Speed","id":28202,"sensor_name":"North Endzone 10 Minute Wind Gust","value":6,"units":"mph"},
            {"value":3,"units":"mph","property":"Wind Speed","sensor_name":"South Endzone Wind Speed","id":28205},
            {"value":227,"units":"&deg;","sensor_name":"South Endzone Wind Direction","property":"Wind Direction","id":28208},
            {"units":"mph","value":7,"property":"Wind Speed","sensor_name":"South Endzone 10 Minute Wind Gust","id":28211},
            {"property":"Wind Speed","id":28214,"sensor_name":"Daily's Place Wind Speed","units":"mph","value":3},
            {"property":"Wind Direction","id":28215,"sensor_name":"Daily's Place Wind Direction","units":"&deg;","value":5},
            {"value":4,"units":"mph","property":"Wind Speed","sensor_name":"Daily's Place 10 Minute Wind Gust","id":28217},
            {"property":"Soil Moisture","id":28219,"sensor_name":"South Endzone Soil Moisture 10\"","value":0,"units":"cb"},
            {"property":"Temperature","sensor_name":"South Endzone Soil Temperature 10\"","id":28221,"units":"&deg;F","value":0},
            {"value":0,"units":"lwi","property":"Leaf Wetness","id":28224,"sensor_name":"Condensation / Dew"},
            {"units":"&deg;F","value":72.5,"property":"Temperature","id":28183,"sensor_name":"Wet Bulb Globe Temperature"},
            {"property":"Temperature","id":28226,"sensor_name":"Field-Level Wet Bulb Globe Temperature","units":"&deg;F","value":72.4},
            {"units":"in.","value":0.6,"sensor_name":"Rain: Accum since midnight","property":"Rainfall Data","id":0,"ignore_db":1},
            {"value":0.6,"units":"in.","sensor_name":"Rain: Accum this month","property":"Rainfall Data","id":0,"ignore_db":1},
            {"property":"Rainfall Data","sensor_name":"Rain: Accum this year (or since last reset)","id":0,"units":"in.","value":12.86,"ignore_db":1},
            {"ignore_db":1,"value":0.6,"units":"in.","sensor_name":"Rain: Most recent storm","property":"Rainfall Data","id":0},
            {"ignore_db":1,"value":"06/03/25 15:04:00","units":"","sensor_name":"Rain: Most recent storm began","property":"Rainfall Data","id":0},
            {"sensor_name":"Rain: 2nd to most recent storm","property":"Rainfall Data","id":0,"value":0.03,"units":"in.","ignore_db":1},
            {"property":"Rainfall Data","id":0,"sensor_name":"Rain: 2nd to most recent storm began","value":"05/30/25 22:17:00","units":"","ignore_db":1},
            {"ignore_db":1,"value":"06/01/25 01:01:00","units":"","sensor_name":"Rain: 2nd to most recent storm ended","property":"Rainfall Data","id":0}
        ]
    };

    function updateWeatherDisplay(data) {
        let temperature = "N/A";
        let windSpeed = "N/A";
        let rainRate = "N/A";

        // Find the relevant data from the 'records' array
        data.records.forEach(record => {
            if (record.property === "Temperature" && record.sensor_name === "Thermometer") {
                temperature = `${record.value}${record.units}`;
            } else if (record.property === "Wind Speed" && record.sensor_name === "South Endzone Wind Speed") {
                windSpeed = `${record.value}${record.units}`;
            } else if (record.property === "Rain Rate") { // Assuming "Rain: Instantanous rate" is the one you mean
                rainRate = `${record.value}${record.units}`;
            }
        });

        temperatureSpan.textContent = temperature;
        windSpeedSpan.textContent = windSpeed;
        rainRateSpan.textContent = rainRate;
        lastUpdatedSpan.textContent = new Date(data.time).toLocaleString();
    }

    // Function to fetch data (replace with actual API call if available)
    function fetchWeatherData() {
        // In a real application, you would use fetch API to get data from a URL:
        // fetch('YOUR_JSON_FEED_URL_HERE')
        //     .then(response => response.json())
        //     .then(data => updateWeatherDisplay(data))
        //     .catch(error => console.error('Error fetching weather data:', error));

        // For this example, we'll use the provided JSON directly
        updateWeatherDisplay(weatherDataJson);
    }

    // Initial load
    fetchWeatherData();

    // Update every 60 seconds (60000 milliseconds)
    setInterval(fetchWeatherData, 60000);
});
