
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

  // Get animated weather icon from Flaticon (or fallback to OpenWeatherMap)
  const getWeatherIcon = (weather) => {
    if (!weather) return '';
    const main = weather.main.toLowerCase();
    // Example Flaticon animated icons (replace with your preferred animated icon URLs)
    const iconMap = {
      thunderstorm: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-thunderstorm.svg',
      drizzle: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-sprinkle.svg',
      rain: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-rain.svg',
      snow: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-snow.svg',
      clear: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-day-sunny.svg',
      clouds: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-cloudy.svg',
      mist: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-fog.svg',
      smoke: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-smoke.svg',
      haze: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-day-haze.svg',
      dust: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-dust.svg',
      fog: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-fog.svg',
      sand: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-sandstorm.svg',
      ash: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-volcano.svg',
      squall: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-strong-wind.svg',
      tornado: 'https://cdn.jsdelivr.net/gh/manifestinteractive/weather-underground-icons/svg/wi-tornado.svg',
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
      <div className="weather-info">
        <h2>{weatherData.name}</h2>
        <div className="weather-main">
          <img
            src={getWeatherIcon(weatherData.weather[0])}
            alt={weatherData.weather[0].description}
          />
          <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
        </div>
        <p>{weatherData.weather[0].description}</p>
        <div className="weather-details">
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      </div>
    )}
  </div>
  );
};



export default Weather;
      {/* Weather info display */}
