import styles from "./Frame.module.css";

// did this so you dont have to do className=... every time you want to use the style
function Frame({theme, children }) {
    return (
        <div className={`${styles.frame} ${styles[theme]}`}>
            {children}
        </div>
    );
}

export default Frame;