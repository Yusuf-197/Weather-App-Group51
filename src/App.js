import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import SlidingForecast from './components/SlidingForecasts';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState("light");
  const [units, setUnits] = useState("celsius");

  //added state for weather data, loading and errors
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //read API key fron .env
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  console.log("API KEY:", process.env.REACT_APP_WEATHER_API_KEY);

  //fetch weather from WeatherAPI using city name or latitude/longitude
  const fetchWeather = async (query) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=3&aqi=no&alerts=no`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch weather data");
      }

      setWeatherData(data);
    } catch(err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // On first load, fetch weather using user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      () => {
        //fallback city if location permission is denied
        fetchWeather("London");
      }
    );
  }, []);

  return (
    <div className={theme === "light" ? "app light-theme" : "app dark-theme"}>
      <Header theme={theme} setTheme={setTheme} units={units} setUnits={setUnits} />
      <SearchBar onSearch={fetchWeather} />

      {loading && <p>Loading Weather...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <>
        <WeatherCard size={true} weatherData={weatherData} units={units} theme={theme} />
        <SlidingForecast 
        title="Hourly Forecast"
        data = {weatherData.forecast.forecastday[0].hour}
        units ={units}
        theme = {theme}
        />
        <SlidingForecast
        title="Daily Forecast"
        data = {weatherData.forecast.forecastday}
        units = {units}  
        theme = {theme}
          />
        </>
      )}
    </div>
  );  
}


/*
const toCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5 / 9;
}

const toFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
}

const getDisplayTemperature = ({Unit, Celsius, Fahrenheit }) => {
  if (Unit === "Fahrenheit") {
    // Show Fahrenheit
    return Celsius !== undefined ? toFahrenheit(Celsius) : Fahrenheit;
  } else {
    // Show Celsius
    return Celsius !== undefined ? Celsius : toCelsius(Fahrenheit);
  }
};

const GetForecastBubble = (props) => {
  const value = getDisplayTemperature(props);

  return (
    <div className="ForecastBubble">
      <h2>Forecast: {value}°{props.Unit}</h2>
    </div>
  );
}

*/

export default App;
