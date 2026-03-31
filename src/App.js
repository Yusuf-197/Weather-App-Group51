import './App.css';
import Header from './components/Header';
import LargeWeatherCard from './components/LargeWeatherCard';
import SearchBar from './components/SearchBar';
import SlidingForecast from './components/SlidingForecasts';

import { useState, useEffect, useCallback } from 'react';

function App() {
  // added states for toggle buttons
  const [theme, setTheme] = useState("light");
  const [units, setUnits] = useState("celsius");
  const [kmMiUnit, setKmMiUnit] = useState("km");

  //added state for weather data, loading, errors and upcoming hours
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [upcomingHours, setUpcomingHours] = useState([]);

  //read API key fron .env
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  //fetch weather from WeatherAPI using city name or latitude/longitude
  //useCallback to remember the function and prevent unnecessary re-renders
  const fetchWeather = useCallback(async (query) => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching process")
      console.log(process.env); // Log the entire process.env object to check if the API key is present
      console.log("APIKEY IS:", API_KEY); // Log the API key to verify it's being read correctly
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=3&aqi=no&alerts=no`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch weather data");
      }

      setWeatherData(data);

      // Filter hourly data to only include current and future hours
      // Get current time in locations timezone and compare forecast hour to current and filter out past hours
      const currentTime = new Date(data.location.localtime);
      const upcomingHours = data.forecast.forecastday[0].hour.filter(hour => {
        const forecastHourTime = new Date(hour.time);
        return forecastHourTime >= currentTime;
      });
      // if we are in the last 6 hours of the day, we will need more hours, so we grab 12 from tomorrow
      let finalHours = [...upcomingHours];
      if (upcomingHours.length < 6 && data.forecast.forecastday[1]) {
        // Will need more hours from tomorrow if it exists
        const tomorrowHours = data.forecast.forecastday[1].hour.slice(0, 12);
        finalHours = [...upcomingHours, ...tomorrowHours];
      }
      setUpcomingHours(finalHours);
      console.log(data);
            
    } catch(err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
 }, [API_KEY]); // Depends on API_KEY, if it changes the function updates 

  // When loading, this gets users location and fetches weather, or default London
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      () => {
        // Fallback city if location permission is denied
        fetchWeather("London");
      }
    );
  }, [fetchWeather]); // Depends on fetchWeather, runs once on mount and if fetchWeather changes
  


  return (
    <div className={"main"}>
      <div className={theme === "light" ? "app light-theme" : "app dark-theme"}>
        <Header theme={theme} setTheme={setTheme} units={units} setUnits={setUnits} kmMiUnit={kmMiUnit} setKmMiUnit={setKmMiUnit} />
        <SearchBar theme={theme} onSearch={fetchWeather} />

        {loading && <p>Loading Weather...</p>}
        {error && <p>{error}</p>}

        {weatherData && (
          <>
            {/*Current Weather */}  
            <LargeWeatherCard 
              weatherData={weatherData} 
              units={units} 
              kmMiUnit={kmMiUnit}
              theme={theme} 
            />

            {/* Hourly Forecast */} 
            <SlidingForecast 
              title="Hourly Forecast"
              data = {upcomingHours}
              units ={units}
              theme = {theme}
            />

            {/* Daily Forecast */} 
            <SlidingForecast
              title="Daily Forecast"
              data = {weatherData.forecast.forecastday}
              units = {units}  
              theme = {theme}
            />

          </>
        )}
      </div>
    </div>
  );  
}


export default App;