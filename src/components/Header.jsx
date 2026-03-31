import { useEffect } from "react";

function Header( { theme, setTheme, units, setUnits }) {
    useEffect(() => {
  document.body.style.background =
    theme === "light" ? "linear-gradient(to bottom, #48cae4, #005989)" : "linear-gradient(to bottom, #000000, #838383)";
}, [theme]);
    return (
        <header className={theme === "light" ? "app header light-header" : "app header dark-header"}>
            <h1>Weather App Group 51</h1>
        
            <div className = "unit-buttons">
                <button className={theme === "light" ? "unit-toggle light" : "unit-toggle dark"} onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}>
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
                
                <button className={theme === "light" ? "unit-toggle light" : "unit-toggle dark"}  onClick={() => setUnits(prev => prev === "celsius" ? "fahrenheit" : "celsius")}>
                    {units === "celsius" ? "Fahrenheit (°F)" : "Celsius (°C)"}
                </button>
            </div>
        </header>
    );
}

export default Header;