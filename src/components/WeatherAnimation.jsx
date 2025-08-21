import React from 'react';
import './Weather.css';

function WeatherAnimation({ condition }) {
  switch (condition) {
    case 'Thunderstorm':
      return (
        <div className="weather-animation-bg thunderstorm-bg">
          <div className="rain"></div>
          <div className="lightning"></div>
        </div>
      );
    case 'Rain':
    case 'Drizzle':
      return (
        <div className="weather-animation-bg rain-bg">
          <div className="rain"></div>
        </div>
      );
    case 'Snow':
      return (
        <div className="weather-animation-bg snow-bg">
          <div className="snow"></div>
        </div>
      );
    case 'Clear':
      return (
        <div className="weather-animation-bg clear-bg">
          <div className="sun"></div>
        </div>
      );
    case 'Clouds':
      return (
        <div className="weather-animation-bg clouds-bg">
          <div className="clouds"></div>
        </div>
      );
    case 'Mist':
    case 'Haze':
    case 'Fog':
    case 'Smoke':
    case 'Dust':
    case 'Sand':
    case 'Ash':
      return (
        <div className="weather-animation-bg foggy-bg">
          <div className="fog"></div>
        </div>
      );
    default:
      return null;
  }
}

export default WeatherAnimation;
