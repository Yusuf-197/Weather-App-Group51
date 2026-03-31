import styles from "./Frame.module.css";

function Frame({ theme, minSize, maxSize, children }) {
// might add minSize and maxSize later, if not then remove this
    return (
        <div className={`${styles.frame} ${styles[theme]}`}> 
            {children}
        </div>
    );
}

export default Frame;