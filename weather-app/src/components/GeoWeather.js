import React, { useState, useEffect } from "react";
import "./GeoWeather.css";

const API_KEY = "9be36664e75a27c37390d54f6b3398f6";

const GeoWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const getWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          setLocationError("Nie można uzyskać dostępu do lokalizacji.");
        }
      );
    } else {
      setLocationError("Twoja przeglądarka nie obsługuje geolokalizacji.");
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=pl`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Błąd podczas pobierania danych pogodowych:", error);
    }
  };

  useEffect(() => {
    getWeatherByLocation();
  }, []);

  return (
    <div className="geo-weather-container">
      <h2>Weather based on your location</h2>
      {locationError && <p className="geo-weather-error">{locationError}</p>}
      {weatherData ? (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      ) : (
        !locationError && <p>Ładowanie danych pogodowych...</p>
      )}
    </div>
  );
};

export default GeoWeather;
