import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '9bbfb8b931ad44d7be653039252006';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

const fetchWeather = async () => {
  if (!city) return;
  setLoading(true);
  setWeatherData([]);

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4&aqi=no&alerts=no`
    );
    setTimeout(() => {
      setWeatherData(response.data.forecast.forecastday);
      setLoading(false);
    }, 800);
  } catch (error) {
    alert('Failed to fetch weather data');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {loading && <p>Loading data...</p>}

      {weatherData.length > 0 && (
        <div class="weather-cards">
          {weatherData.map((day, index) => (
            <div class="weather-card" key={index}>
              <h3>{day.date}</h3>
              <p>Temp: {day.day.avgtemp_c}°C</p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default App;
