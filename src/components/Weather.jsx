
// Import necessary modules and styles
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';


// Weather component handles fetching and displaying weather data
const Weather = ({ onWeatherChange }) => {
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
      if (onWeatherChange && response.data && response.data.weather && response.data.weather[0]) {
        onWeatherChange(response.data.weather[0].main);
      }
    } catch (err) {
  setError('City not found');
  setWeatherData(null);
  if (onWeatherChange) onWeatherChange(null);
    }
  };

  // Handle form submit to fetch weather
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  // Get weather icon URL from OpenWeatherMap
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
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
            src={getWeatherIcon(weatherData.weather[0].icon)}
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
