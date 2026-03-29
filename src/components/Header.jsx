function Header( { theme, setTheme, units, setUnits }) {
    return (
        <header className="header">
            <h1>Weather App</h1>
        
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