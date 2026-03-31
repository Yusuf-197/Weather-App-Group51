import Frame from "./Frame";
import styles from "./LargeWeatherCard.module.css";

function parseTime(time) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(time);
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

function WeatherCard({weatherData, units, windSpeedUnit, theme}) {
    if (!weatherData) return null;

    const current = weatherData.current;
    const location = weatherData.location;

    const temperature = units === "celsius" ? current.temp_c : current.temp_f;
    const feelsLike = units === "celsius" ? current.feelslike_c : current.feelslike_f;
    const unitSymbol = units === "celsius" ? "°C" : "°F";
    const windSpeed = windSpeedUnit === "kph" ? current.wind_kph : current.wind_mph;

    //TODO:
    // Turn theme and unit boxes into toggle buttons instead of dropdowns - make them look nicer and more intuitive
    // Subtle gradient for dark theme
    // General colour scheme for light and dark themes - look at App.css light + dark by separating the themes into different classes to-
        //- make it easier to change the colour scheme of the entire app by just changing the CSS for the themes in App.css
    // add imperial units for speed (mph)
    // use svg icons as png icons look blurry on some screens, or use more high res png icons
    // add features specifically targetting couriers such as:
        //- next time it'll rain
        //- frost, ice, snow warnings
        //- heavy wind warnings
    // maybe integrate google maps API to show the weather at the general location? - leave till later as it'll take effort
    return (
        <Frame theme={theme}>
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
                        <p>{windSpeed} {windSpeedUnit}</p>
                    </div>
                    <div>
                        <h1>Humidity</h1>
                        <p>{current.humidity}%</p>
                    </div>
                    <div>
                        <h1>Visibility</h1>
                        <p>{current.vis_km} km</p>
                    </div>
                </div>
            </div>
        </Frame>
    );
}

export default WeatherCard;