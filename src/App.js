import './App.css';
import Header from './components/Header';
import LargeWeatherCard from './components/LargeWeatherCard';
import SearchBar from './components/SearchBar';
import SlidingForecast from './components/SlidingForecasts';
import WeatherWarning from './components/WeatherWarning';

import { useState, useEffect, useCallback } from 'react';

function App() {
  // added states for toggle buttons light/dark, celsius/fahrenheit and km/mi
  const [theme, setTheme] = useState("light");
  const [units, setUnits] = useState("celsius");
  const [kmMiUnit, setKmMiUnit] = useState("km");

  //added state for weather data, loading true at the start, errors and upcoming hours
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
      // Start loading and clear previous errors
      setLoading(true);
      setError("");
      // Fetch weather data from API
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=3&aqi=no&alerts=no`
      );

      // Set data to the response.json for weather data
      const data = await response.json();

      // Check if response is ok, if not throw error with message from API or default message
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch weather data");
      }

      // Update state with fetched weather data
      setWeatherData(data);

      // Filter hourly data to only include current and future hours
      // Get current time in locations timezone and compare forecast hour to current and filter out past hours
      const currentTime = new Date(data.location.localtime);
      const upcomingHours = data.forecast.forecastday[0].hour.filter(hour => {
        const forecastHourTime = new Date(hour.time);
        return forecastHourTime >= currentTime;
      });

      // If we have less than 24 hours of data, we fetch hours from tomorrow for hourly forecast
      // So we get 24 - length of upcoming hours from tomorrow to fill the 24 hours forecast
      let finalHours = [...upcomingHours];
      // Check if we have less than 24 hours left, and if we have forecast data for tomorrrow
      if (upcomingHours.length < 24 && data.forecast.forecastday[1]) {
        // Slice the hours from tomorrow to ensure we only get the hours needed to have 24 hours total
        const tomorrowHours = data.forecast.forecastday[1].hour.slice(0, 24 - upcomingHours.length);
        // Combine today's upcoming hours with tomorrow's hours to have a full 24 hour forecast
        finalHours = [...upcomingHours, ...tomorrowHours];
      }
      setUpcomingHours(finalHours);

            
    }
    // If any error occurs during fetch or processing, catch it and set error message and clear weather data 
    catch(err) {
      setError(err.message);
      setWeatherData(null);
    } 
    finally {
      // Always set loading to false at the end of the fetch process, whether it succeeded or failed
      setLoading(false);
    }
 }, [API_KEY]); // Depends on API_KEY, if it changes the function updates 

  // When loading, this gets users location and fetches weather, or default London
  useEffect(() => {
    // Check if geolocation is available in the browser
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      // If user denies location access or if there is an error fallback to London weather
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
            {/* Section for current weather and weather warning to be side by side */}
            <section className="Sideways">

              <LargeWeatherCard
                weatherData={weatherData} 
                units={units} 
                kmMiUnit={kmMiUnit}
                theme={theme} 
              />

              <WeatherWarning theme={theme} weatherData={weatherData} />
            </section>

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