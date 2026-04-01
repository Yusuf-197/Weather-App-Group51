import Frame from "./Frame";
import styles from "./LargeWeatherCard.module.css";
import { parseTime } from "../utils"; 

function WeatherCard({weatherData, units, kmMiUnit, theme}) {
    if (!weatherData) return null;

    const current = weatherData.current;
    const location = weatherData.location;

    // numbers and unit depend on unit toggles passed in 
    // based on units, value and symbol changes
    const temperature = units === "celsius" ? current.temp_c : current.temp_f;
    const feelsLike = units === "celsius" ? current.feelslike_c : current.feelslike_f;
    const unitSymbol = units === "celsius" ? "°C" : "°F";
    const windspeedUnit = kmMiUnit === "km" ? "kph" : "mph";
    const windSpeed = kmMiUnit === "km" ? current.wind_kph : current.wind_mph;
    const visibility = kmMiUnit === "km" ? current.vis_km : current.vis_miles;

    // get comment on wind
    const getWindStatus = () => {
    if (current.wind_kph < 20) return "(Good)";
    if (current.wind_kph < 40) return "(Average)";
    if (current.wind_kph < 60) return "(Bad)";
    return "Very Bad";
    };

    // get comment on humidity
    const getHumidityStatus = () => {
    if (current.humidity < 31) return "(Dry)";
    if (current.humidity < 61) return "(Comfy)";
    if (current.humidity < 76) return "(Average)";
    if (current.humidity < 85) return "(Bad)";
    return "(Very Bad)";
    };

    // get comment on visibility
    const getVisibilityStatus = () => {
    if (current.vis_km < 4) return "(Bad)";
    if (current.vis_km < 10) return "(Average)";
    return "(Clear)";
    };

    const windStatus = getWindStatus();
    const humidityStatus = getHumidityStatus();
    const visStatus = getVisibilityStatus();

    //TODO:
    // Subtle gradient for dark theme
    // General colour scheme for light and dark themes - look at App.css light + dark by separating the themes into different classes to-
        //- make it easier to change the colour scheme of the entire app by just changing the CSS for the themes in App.css
    // use svg icons as png icons look blurry on some screens, or use more high res png icons
    // add features specifically targetting couriers such as:
        //- next time it'll rain
        //- frost, ice, snow warnings
        //- heavy wind warnings
    // maybe integrate google maps API to show the weather at the general location? - leave till later as it'll take effort
    return (
        <Frame theme={theme} fitContent={true}>
            <div className={styles.Main}>
                <div className = {styles.Heading}>
                    <h2>{location.name}, {location.country}</h2>
                    <h4>{parseTime(location.localtime)}</h4>
                    <p>{location.localtime.split(" ")[1]}</p>
                </div>
                
                <div className = {styles.Temperature}>
                    <img src={current.condition.icon} alt={current.condition.text}/>
                    <div>
                        <h1>{Math.round(temperature)}{unitSymbol}</h1>
                        <p>
                          Feels Like: {Math.round(feelsLike)}{unitSymbol}
                        </p>
                    </div>
                </div>

                <div className={styles.Sideways}>   
                    <div>
                        <h1>Cloud Coverage</h1>
                        <p>{current.condition.text}</p>
                    </div>
                    <div>
                        <h1>Wind Speed</h1>
                        <p>{windSpeed} {windspeedUnit} {windStatus}</p>
                    </div>
                    <div>
                        <h1>Humidity</h1>
                        <p>{current.humidity}% {humidityStatus}</p>
                    </div>
                    <div>
                        <h1>Visibility</h1>
                        <p>{visibility} {kmMiUnit} {visStatus}</p>
                    </div>
                </div>

                <div>
                    <p>Last Updated: {current.last_updated.split(" ")[1]}</p>
                </div>
            </div>
        </Frame>
    );
}

export default WeatherCard;