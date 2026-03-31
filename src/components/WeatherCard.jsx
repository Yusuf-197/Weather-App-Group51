function WeatherCard({ size, weatherData, units, windSpeedUnit, theme }) {
    if (!weatherData) return null;

    const current = weatherData.current;
    const location = weatherData.location;

    const temperature = units === "celsius" ? current.temp_c : current.temp_f;
    const feelsLike = units === "celsius" ? current.feelslike_c : current.feelslike_f;
    const unitSymbol = units === "celsius" ? "°C" : "°F";
    const windSpeed = windSpeedUnit === "kph" ? current.wind_kph : current.wind_mph;

    return (
        <div className={`card ${size ? "large" : ""} ${theme}-card`}>
            <img src={current.condition.icon} alt={current.condition.text} />

            <h2>{location.name}</h2>
            <p>Temperature: {Math.round(temperature)}{unitSymbol}</p>

            {size && (
                <div className="additional-info">
                    <p>Feels Like: {Math.round(feelsLike)}{unitSymbol}</p>
                    <p>Conditions: {current.condition.text}</p>
                    <p>Wind Speed: {windSpeed} {windSpeedUnit}</p>
                    <p>Humidity: {current.humidity}%</p>
                </div>
            )}
        </div>
    );
}

export default WeatherCard;