import { useEffect } from "react";

function Header( { theme, setTheme, units, setUnits }) {
    useEffect(() => {
  document.body.style.background =
    theme === "light" ? "linear-gradient(to bottom, #48cae4, #005989)" : "#0b0b0b";
}, [theme]);
    return (
        <header className={theme === "light" ? "app header light-header" : "app header dark-header"}>
            <h1>Weather App Group 51</h1>
        
            <div className = "header-dropdowns">
                <select value = {theme} onChange = { (e) => setTheme(e.target.value) }>
                    <option value = "light">Light</option>
                    <option value = "dark">Dark</option>
                </select>

                 <select value = {units} onChange = { (e) => setUnits(e.target.value) }>
                    <option value = "celsius">Celsius</option>
                    <option value = "fahrenheit">Fahrenheit</option>
                </select>
            </div>
        </header>
    );
}

export default Header;