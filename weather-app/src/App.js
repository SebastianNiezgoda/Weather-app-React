import React from "react";
import Weather from "./components/Weather";
import GeoWeather from "./components/GeoWeather";
import "./App.css";
import "./components/Weather.css";


function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Weather App</h1>
      <div className="weather-sections">
        <Weather />
        <GeoWeather />
      </div>
    </div>
  );
}

export default App;