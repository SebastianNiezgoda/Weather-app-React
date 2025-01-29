import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const API_KEY = "9be36664e75a27c37390d54f6b3398f6";

  const fetchForecast = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const dailyForecast = response.data.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = { temp: [], humidity: [], descriptions: [] };
        }
        acc[date].temp.push(item.main.temp);
        acc[date].humidity.push(item.main.humidity);
        acc[date].descriptions.push(item.weather[0].description);
        return acc;
      }, {});

      const summarizedForecast = Object.keys(dailyForecast).map(date => {
        const temps = dailyForecast[date].temp;
        const humidities = dailyForecast[date].humidity;
        const descriptions = dailyForecast[date].descriptions;

        return {
          date,
          temp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
          humidity: (humidities.reduce((a, b) => a + b, 0) / humidities.length).toFixed(1),
          description: descriptions.sort((a, b) =>
            descriptions.filter(v => v === a).length - descriptions.filter(v => v === b).length
          ).pop()
        };
      });

      setForecast(summarizedForecast);
    } catch (error) {
      alert("City not found");
    }
  };

  return (
    <div className="weather-container">
      <h2>Check the Weather Forecast</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchForecast}>Show Forecast</button>

      {forecast && (
        <div>
          <h3>{city}</h3>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {forecast.map((item, index) => (
              <div key={index} className="weather-box">
                <p><strong>{item.date}</strong></p>
                <p>Average Temperature: {item.temp}°C</p>
                <p>Average Humidity: {item.humidity}%</p>
                <p>Most Common Description: {item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;