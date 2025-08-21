
// Main App component imports
import React, { useState } from 'react';
import Weather from './components/Weather';
import WeatherAnimation from './components/WeatherAnimation';
import './App.css';


// App component renders the Weather component
function App() {
  const [weatherType, setWeatherType] = useState(null);
  // Weather component will call this when weather changes
  const handleWeatherChange = (type) => setWeatherType(type);
  return (
    <>
      <WeatherAnimation condition={weatherType} />
      <div className="App">
        <Weather onWeatherChange={handleWeatherChange} />
      </div>
    </>
  );
}

export default App;
