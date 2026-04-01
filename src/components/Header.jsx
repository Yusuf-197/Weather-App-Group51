import { useEffect } from "react";
// Header component with toggle buttons for theme, temperature units and speed units
function Header( { theme, setTheme, units, setUnits, kmMiUnit, setKmMiUnit } ) {
    // Change background gradient based on theme
    useEffect(() => {
  document.body.style.background =
    theme === "light" ? "linear-gradient(to bottom, #48cae4, #005989)" : "linear-gradient(to bottom, #000000, #332f2f)";
}, [theme]);
    // toggle buttons for units and theme
    return (
        
        <header className={theme === "light" ? "app header light-header" : "app header dark-header"}>
            <h1>Weather App Group 51</h1>
            {/* Unit toggle buttons for theme, temperature and speed, changes text based on current setting */}
            <div className = "unit-buttons">
                <button className={theme === "light" ? "unit-toggle light" : "unit-toggle dark"} onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}>
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
                
                <button className={theme === "light" ? "unit-toggle light" : "unit-toggle dark"}  onClick={() => setUnits(prev => prev === "celsius" ? "fahrenheit" : "celsius")}>
                    {units === "celsius" ? "Fahrenheit (°F)" : "Celsius (°C)"}
                </button>
                <button className={theme === "light" ? "unit-toggle light" : "unit-toggle dark"}  onClick={() => setKmMiUnit(prev => prev === "km" ? "mi" : "km")}>
                    {kmMiUnit === "km" ? "Miles per Hour (mph)" : "Kilometers per Hour (kmh)"}
                </button>
            </div>
        </header>
    );
}

export default Header;