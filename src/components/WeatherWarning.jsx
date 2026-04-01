import Frame from "./Frame";
import style from "./LargeWeatherCard.module.css";

function WeatherWarning({weatherData, theme}) {
    //TODO: make it warn about soon to be bad weather for the current day
    
    const freezingTemp = 2
    const risks = [];
    const suggestions = [];
    const current = weatherData.current;

    // Check for various weather risks based on current conditions and add to risks and suggestions arrays accordingly
    const snowRisk = current.condition.text.toLowerCase().includes("snow")
    const iceRisk = current.temp_c <= freezingTemp && current.temp_c >= -5 && (current.precip_mm > 0 || snowRisk);
    const windRisk = current.wind_kph >= 40;
    const fogRisk = current.vis_km < 2;
    const rainRisk = current.precip_mm > 0 && !snowRisk;
    const heatRisk = current.temp_c >= 30;
    const coldRisk = current.temp_c <= 0;
    const sunburnRisk = current.uv >= 7;

    //Check each risk and add to risks and suggestions array if true
    if (snowRisk) {
        risks.push("Snow");
        suggestions.push("Drive carefully and wear a coat");
    }
    if (iceRisk) {
        risks.push("Ice");
        suggestions.push("Walk and Drive carefully and dress warmly");
    }
    if (windRisk) {
        risks.push("High Winds");
        suggestions.push("Drive carefully and dress warmly");
    }
    if (fogRisk) {
        risks.push("Fog");
        suggestions.push("Drive carefully and use fog lights");
    }
    if (rainRisk) {
        risks.push("Rain");
        suggestions.push("Wear a jacket");
    }

    if (heatRisk) {
        risks.push("Heat");
        suggestions.push("Stay hydrated");
    };
    if (coldRisk) {
        risks.push("Cold");
        suggestions.push("Dress warmly");
    };
    if (sunburnRisk) {
        risks.push("Sunburn");
        suggestions.push("Apply sunscreen");
    }



    return (
        <Frame theme={theme} >
            <div className={style.Main}>
                <h1>Warnings</h1>
                {/* Only show warnings if there are any, otherwise show clear conditions message */}
                {
                    risks.length === 0 ? <p>Clear Road Conditions</p> : (
                        <div className={style.Warning}>
                            <p>Road Warnings: {risks.join(", ")}</p>
                        </div>
                    )
                }
                {
                    suggestions.length > 0 && (
                        <div className={style.Suggestion}>
                            <p>Suggestions: {suggestions.join(", ")}</p>
                        </div>
                    )  
                }
            </div>
        </Frame>
    );
}

export default WeatherWarning;