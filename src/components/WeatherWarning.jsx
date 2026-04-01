import Frame from "./Frame";
import style from "./LargeWeatherCard.module.css";
import { parseTime } from "../utils"; 

function WeatherWarning({weatherData, theme}) {
    //TODO: make it warn about soon to be bad weather for the current day
    
    // maybe remove current.temp_c >= -5
    // put that there as it is likely to snow instead
    const freezingTemp = 2
    const risks = [];
    const current = weatherData.current;

    const snowRisk = current.condition.text.toLowerCase().includes("snow")
    const iceRisk = current.temp_c <= freezingTemp && current.temp_c >= -5 && (current.precip_mm > 0 || snowRisk);
    const windRisk = current.wind_kph >= 40;
    const fogRisk = current.vis_km < 2;
    const rainRisk = current.precip_mm > 0 && !snowRisk;

    if (snowRisk) risks.push("Snow");
    if (iceRisk) risks.push("Ice");
    if (windRisk) risks.push("High Winds");
    if (fogRisk) risks.push("Fog");
    if (rainRisk) risks.push("Rain");

    return (
        <Frame theme={theme} >
            <div className={style.Main}>
                <h1> Road Warnings</h1>
                {
                    risks.length === 0 ? <p>Clear Road Conditions</p> : (
                        <div className={style.Warning}>
                            <p>Warning: {risks.join(", ")}</p>
                        </div>
                    )

                }
            </div>
        </Frame>
    );
}

export default WeatherWarning;