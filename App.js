// App.jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherByCity = async (city) => {
    console.log("Fetching weather for city:", city);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59eb96ab38c83143062aac2d5ec6e538&units=metric`
      );
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Weather data received:", data);
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Failed to fetch weather data. Please check the city name and try again.");
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchWeatherByCity(searchTerm);
    }
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h1>Weather App</h1>
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city..."
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
        {weather ? (
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <div className="weather-info">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <div className="temp-details">
                <p className="temperature">{Math.round(weather.main.temp)}°C</p>
                <p className="description">{weather.weather[0].description}</p>
              </div>
            </div>
            <div className="extra-info">
              <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
          </div>
        ) : (
          !error && <p>No weather data available</p>
        )}
      </div>
    </div>
  );
}

export default App;