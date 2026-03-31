import {useEffect, useRef, useState} from "react";
import { parseTime } from "../utils"; 

function SlidingForecast({ title, data, units, theme }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const cardWidth = container.firstChild ? 
            container.firstChild.offsetWidth + 
            parseInt(getComputedStyle(container.firstChild).marginRight) + 
            parseInt(getComputedStyle(container.firstChild).marginLeft) + 
            parseInt(getComputedStyle(container.firstChild).paddingRight) : 0;
            
            container.scrollBy({left : direction === "left" ? -cardWidth : cardWidth, behaviour: "smooth"});
        }
    };
    
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
        };
    
    handleScroll();
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
    };

    }, [data]); //Run when data changes

    if (!data || data.length === 0) return null;

    return (
        <section className={theme === "light" ? "app sliding-forecast light-forecast" : "app sliding-forecast dark-forecast"}>
            <h2 className={"app h2-color"}>{title}</h2>

            <div className = "scroll-container">
                {data.length > 3 && (<button onClick={() => scroll("left")} className = "scroll-button" disabled={!canScrollLeft}>◀</button>)}
                <div className="card-container" ref = {scrollRef}>
                    {data.map((item, index) => {
                        const isHourly = item.time !== undefined;
                        const temp = isHourly
                            ? (units === "celsius" ? item.temp_c : item.temp_f)
                            : (units === "celsius" ? item.day.avgtemp_c : item.day.avgtemp_f);

                        const label = isHourly
                            ? item.time.split(" ")[1]
                            : parseTime(item.date);

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
            
                {data.length > 3 && (<button onClick={() => scroll("right")} className = "scroll-button" disabled={!canScrollRight}>▶</button>)}
            </div>
        </section>
    );
}

export default SlidingForecast;