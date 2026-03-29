import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import SlidingForecast from './components/SlidingForecasts';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState("light");
  const [units, setUnits] = useState("celsius");

  return (
    <div className={theme === "light" ? "app light-theme" : "app dark-theme"}>
      <Header theme={theme} setTheme={setTheme} units={units} setUnits={setUnits} />
      <SearchBar />
      <WeatherCard size={true} />
      <SlidingForecast title="Hourly Forecast" />
      <SlidingForecast title="Daily Forecast" />
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
