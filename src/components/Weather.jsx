
// Import necessary modules and styles
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';


// Weather component handles fetching and displaying weather data
const Weather = () => {
  // State for city input
  const [city, setCity] = useState('');
  // State for fetched weather data
  const [weatherData, setWeatherData] = useState(null);
  // State for error messages
  const [error, setError] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };



  // Fetch weather data for a city using the Cloudflare Function
  const fetchWeather = async (selectedCity) => {
    try {
      const response = await axios.get(`/weather?city=${encodeURIComponent(selectedCity)}`);
  setWeatherData(response.data);
  setError(null);
    } catch (err) {
  setError('City not found');
  setWeatherData(null);
    }
  };

  // Handle form submit to fetch weather
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  // Get animated weather icon from Lordicon CDN (or fallback to OpenWeatherMap)
  const getWeatherIcon = (weather) => {
    if (!weather) return '';
    const main = weather.main.toLowerCase();
    // Lordicon animated SVGs (free CDN, modern look)
    const iconMap = {
      thunderstorm: 'https://cdn.lordicon.com/egiwmiit.json',
      drizzle: 'https://cdn.lordicon.com/egiwmiit.json',
      rain: 'https://cdn.lordicon.com/egiwmiit.json',
      snow: 'https://cdn.lordicon.com/rsbokaso.json',
      clear: 'https://cdn.lordicon.com/etqbfrgp.json',
      clouds: 'https://cdn.lordicon.com/abfverha.json',
      mist: 'https://cdn.lordicon.com/abfverha.json',
      smoke: 'https://cdn.lordicon.com/abfverha.json',
      haze: 'https://cdn.lordicon.com/abfverha.json',
      dust: 'https://cdn.lordicon.com/abfverha.json',
      fog: 'https://cdn.lordicon.com/abfverha.json',
      sand: 'https://cdn.lordicon.com/abfverha.json',
      ash: 'https://cdn.lordicon.com/abfverha.json',
      squall: 'https://cdn.lordicon.com/abfverha.json',
      tornado: 'https://cdn.lordicon.com/abfverha.json',
    };
    return iconMap[main] || `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  };

  // Render the weather app UI
  return (
    <div className="weather-container">
      {/* Search form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
  {/* Animated weather background is now handled globally */}
    {/* Error message */}
    {error && <p className="error">{error}</p>}
    {/* Weather info display */}
    {weatherData && (
      <div className="weather-info-modern">
        <div className="weather-header">
          <h2 className="city">{weatherData.name}</h2>
          <span className="desc">{weatherData.weather[0].description}</span>
        </div>
        <div className="weather-main-modern">
          {/* Lordicon animated icon */}
          <lord-icon
            src={getWeatherIcon(weatherData.weather[0])}
            trigger="loop"
            colors="primary:#4e8cff,secondary:#f4d35e"
            style={{ width: '100px', height: '100px' }}
          ></lord-icon>
          <div className="temp-block">
            <span className="temperature-modern">{Math.round(weatherData.main.temp)}°C</span>
          </div>
        </div>
        <div className="weather-details-modern">
          <div>
            <span className="label">Humidity</span>
            <span>{weatherData.main.humidity}%</span>
          </div>
          <div>
            <span className="label">Wind</span>
            <span>{weatherData.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};



export default Weather;
      {/* Weather info display */}
