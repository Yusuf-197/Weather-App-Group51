import Frame from "./Frame";
import style from "./LargeWeatherCard.module.css";

function WeatherWarning({weatherData, theme}) {
    //TODO: make it warn about soon to be bad weather for the current day
    
    const risks = [];
    const suggestionsSet = new Set();
    const current = weatherData.current;
    const freezingTemp = 2;
    const snowRisk = current.condition.text.toLowerCase().includes("snow")
    const iceRisk = current.temp_c <= freezingTemp && current.temp_c >= -5 && (current.precip_mm > 0 || snowRisk);
    const windRisk = current.wind_kph >= 40;
    const fogRisk = current.vis_km < 2;
    const rainRisk = current.precip_mm > 0 && !snowRisk;
    /*const heatRisk = current.temp_c >= 30;
    const coldRisk = current.temp_c <= 0;
    const sunburnRisk = current.uv >= 7;*/

    // did this as repeated if statements looks weird and takes too long
    const riskChecks = [{
        condition: snowRisk,
        id: "Snow",
        suggestions: ["Drive carefully", "Wear a coat"]
    },
    {
        condition: iceRisk,
        id: "Ice",
        suggestions: ["Drive carefully", "Walk carefully", "Dress warmly"]
    },
    {
        condition: windRisk,
        id: "High Winds",
        suggestions: ["Drive carefully", "Dress warmly"]
    },
    {
        condition: fogRisk,
        id: "Fog",
        suggestions: ["Drive carefully", "Use fog lights"]
    },
    {
        condition: rainRisk,
        id: "Rain",
        suggestions: ["Wear a jacket"]
    },/*
    {
        condition: heatRisk,
        id: "Heat",
        suggestions: ["Stay hydrated"]
    },
    {
        condition: coldRisk,
        id: "Cold",
        suggestions: ["Dress warmly"]
    },
    {
        condition: sunburnRisk,
        id: "Sunburn",
        suggestions: ["Apply sunscreen"]
    }*/];
    
    riskChecks.forEach(risk => {
    if (risk.condition) {
        risks.push(risk.id);
        risk.suggestions.forEach(s => suggestionsSet.add(s));
    }
    });
    
    /* debug all weather conditions
    riskChecks.forEach(risk => {
    if (true) {
        risks.push(risk.id);
        risk.suggestions.forEach(s => suggestionsSet.add(s));
    }
    });
    */
    const suggestions = Array.from(suggestionsSet);

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