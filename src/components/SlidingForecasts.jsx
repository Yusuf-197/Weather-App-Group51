import { useRef } from "react";
import WeatherCard from "./WeatherCard";

function SlidingTemperatures({ title }) {
    const containerRef = useRef();

    /* Scrolls container 200px to the right */
    function scrollLeft() {
        containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
    
    /* Scrolls container 200px to the left */
    function scrollRight() {
        containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }

    return (
        <section className = "sliding-forecast">
            <h2>{title}</h2>

            <div>
                <button onClick={scrollLeft}>Left</button>

                <div className="card-container" ref={containerRef}>
                    <WeatherCard size={false} />
                    <WeatherCard />
                    <WeatherCard />
                    <WeatherCard />
                    <WeatherCard />
                </div>

                <button onClick={scrollRight}>Right</button>

            </div>
        </section>
    );
}

export default SlidingTemperatures;