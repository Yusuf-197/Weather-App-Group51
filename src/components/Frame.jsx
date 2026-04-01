import styles from "./Frame.module.css";

function Frame({ theme, fitContent, children }) {
// might add minSize and maxSize later, if not then remove this
    return (
        <div className={`${styles.frame} ${styles[theme]}`} style ={{width : fitContent ? "fit-content" : undefined}}>
            {children}
        </div>
    );
}

export default Frame;