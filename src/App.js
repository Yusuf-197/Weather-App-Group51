import logo from './logo.svg';
import './App.css';
import {APP_NAME} from './constants';

function App() {
  return (
    <div className="App">
      <h1>{APP_NAME}</h1>
      <GetForecastBubble Unit="Fahrenheit" Celsius={25} />
    </div>
  );
}

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

export default App;
