
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
  // State for city suggestions
  const [suggestions, setSuggestions] = useState([]);

  // OpenWeatherMap API key from environment variable
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Handle input change and fetch city suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCity(value);

    // Fetch suggestions if input length > 2
    if (value.length > 2) {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=5&appid=${apiKey}`
        );
        setSuggestions(response.data.list);
      } catch (err) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click and fetch weather for selected city
  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    setSuggestions([]);
    fetchWeather(suggestion.name);
  };

  // Fetch weather data for a city using the Cloudflare Function
  const fetchWeather = async (selectedCity) => {
    try {
      const response = await axios.get(`/api/weather?city=${encodeURIComponent(selectedCity)}`);
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

  // Get weather icon URL from OpenWeatherMap
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
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
      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}, {suggestion.sys.country}
            </li>
          ))}
        </ul>
      )}
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
