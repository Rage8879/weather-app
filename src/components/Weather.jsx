
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeatherIcon = (weather) => {
    if (!weather) return '';
    const main = weather.main.toLowerCase();
    const iconMap = {
      thunderstorm: 'https://cdn.lordicon.com/egiwmiit.json',
      drizzle: 'https://cdn.lordicon.com/xjovhxra.json',
      rain: 'https://cdn.lordicon.com/xjovhxra.json',
      snow: 'https://cdn.lordicon.com/zpxybbhl.json',
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
    return iconMap[main];
  };

  const fetchWeather = async (selectedCity) => {
    setLoading(true);
    try {
      const response = await axios.get(`/weather?city=${encodeURIComponent(selectedCity)}`);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div className="weather-app">
      <div className="search-container">
        <h1 className="app-title">Weather</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-wrapper">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              className="search-input"
              autoComplete="off"
            />
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="error-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {error}
        </div>
      )}

      {weatherData && (
        <div className="weather-card">
          <div className="weather-header">
            <h2 className="city-name">{weatherData.name}</h2>
            <p className="weather-desc">{weatherData.weather[0].description}</p>
          </div>
          
          <div className="weather-main">
            <lord-icon
              src={getWeatherIcon(weatherData.weather[0])}
              trigger="loop"
              delay="1000"
              colors="primary:#6366f1,secondary:#f59e0b"
              style={{ width: '120px', height: '120px' }}
            ></lord-icon>
            <div className="temperature">{Math.round(weatherData.main.temp)}°</div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <div className="detail-label">Feels like</div>
              <div className="detail-value">{Math.round(weatherData.main.feels_like)}°</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Humidity</div>
              <div className="detail-value">{weatherData.main.humidity}%</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Wind</div>
              <div className="detail-value">{weatherData.wind.speed} m/s</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Pressure</div>
              <div className="detail-value">{weatherData.main.pressure} hPa</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default Weather;
