function WeatherCard( {size}) {
    return (
        <div className= {size ? "card large" : "card"}>
            <img src="./Assets/Icons/Cloud.svg" alt="Cloudy" />
        
            <h2>City Name</h2>
            <p>Temperature: 25°C</p>

            {size && (
                <div className="additional-info">
                    <p>Feels Like: 27°C</p>
                    <p>Cloudy</p>
                    <p>Road Conditions: Moderate</p>
                    <p>Warning: None</p>
                </div>
            )}         

        </div>
    );
}

export default WeatherCard;