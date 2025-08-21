
// Main App component imports
import React from 'react';
import Weather from './components/Weather';
import './App.css';


// App component renders the Weather component
function App() {
  return (
    <div className="App">
      {/* Weather dashboard */}
      <Weather />
    </div>
  );
}

export default App;
