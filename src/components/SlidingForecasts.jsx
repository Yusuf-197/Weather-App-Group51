function SlidingForecast({ title, data, units, theme }) {
    if (!data || data.length === 0) return null;

    return (
        <section className={theme === "light" ? "app sliding-forecast light-forecast" : "app sliding-forecast dark-forecast"}>
            <h2>{title}</h2>

            <div className="card-container">
                {data.map((item, index) => {
                    const isHourly = item.time !== undefined;
                    const temp = isHourly
                        ? (units === "celsius" ? item.temp_c : item.temp_f)
                        : (units === "celsius" ? item.day.avgtemp_c : item.day.avgtemp_f);

                    const label = isHourly
                        ? item.time.split(" ")[1]
                        : item.date;

                    const icon = isHourly
                        ? item.condition.icon
                        : item.day.condition.icon;

                    const conditionText = isHourly
                        ? item.condition.text
                        : item.day.condition.text;

                    return (
                        <div key={index} className={theme === "light" ? "app card light-card" : "app card dark-card"}>
                            <img src={icon} alt={conditionText} />
                            <h3>{label}</h3>
                            <p>{Math.round(temp)}°{units === "celsius" ? "C" : "F"}</p>
                            <p>{conditionText}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default SlidingForecast;