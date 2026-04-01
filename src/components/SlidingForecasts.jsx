import {useEffect, useRef, useState} from "react";
import { parseTime } from "../utils"; 
import Frame from "./Frame";

function SlidingForecast({ title, data, units, theme, onClick, selectedDay}) {
    // scrollref for the conatiner of cards that are scrolling
    const scrollRef = useRef(null);
    // State to track if we can scroll left or right, initially we can scroll right but not left
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    // Function to handle scrolling left or right
    const scroll = (direction) => {
        if (scrollRef.current) {
        
            const container = scrollRef.current;
            // Calculate the width of one card including margin and padding to know how much to scroll by 
            // If there are no cards set it to 0 to avoid errors, and to ensure we don't scroll if there are no cards
            const cardWidth = container.firstChild ? 
            container.firstChild.offsetWidth + 
            parseInt(getComputedStyle(container.firstChild).marginRight) + 
            parseInt(getComputedStyle(container.firstChild).marginLeft) + 
            parseInt(getComputedStyle(container.firstChild).paddingRight) : 0;
            
            container.scrollBy({left : direction === "left" ? -cardWidth : cardWidth, behavior: "smooth"});
        }
    };
    
    useEffect(() => {
        // Function to check if we can scroll left or right 
        // Check if the scrollLeft is greater than 0 to know if we can scroll left
        // Check if scroll left + client width is less than scroll width to know if we can scroll right
        
        const container = scrollRef.current;
        // If there is no container return to avoid errors
        if (!container) return;

        const handleScroll = () => {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
        };
    
    handleScroll();
    // Event listeners for scrolling and resizing
    // We need to check on resize as well because the number of cards that fit in the container can change
    // Number of cards in the container affects whether we can scroll or not
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
    };

    }, [data]); //Run when data changes

    if (!data || data.length === 0) return null;

    return (
        <Frame theme={theme}>
            <section className={"app sliding-forecast"}>
                <h2 className={"app h2-color"}>{title}</h2>

                <div className = "scroll-container">
                    {/* Only show scroll button if there are more than 3 cards */}
                    {data.length > 3 && (<button className={theme === "light" ? "unit-toggle light" : "unit-toggle dark"} onClick={() => scroll("left")} disabled={!canScrollLeft}>◀</button>)}
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
                                <div key={index} className={`${theme === "light" ? "app card light-card" : "app card dark-card"} ${selectedDay === index ? "selected" : ""}`} onClick={() => onClick && onClick(index)}>
                                    <img src={icon} alt={conditionText} />
                                    <h3>{label}</h3>
                                    <p>{Math.round(temp)}°{units === "celsius" ? "C" : "F"}</p>
                                    <p>{conditionText}</p>
                                </div>
                            );
                        })}
                    </div>
                
                    {data.length > 3 && (<button className={theme === "light" ? "unit-toggle light" : "unit-toggle dark"} onClick={() => scroll("right")} disabled={!canScrollRight}>▶</button>)}
                </div>
            </section>
        </Frame>
    );
}

export default SlidingForecast;