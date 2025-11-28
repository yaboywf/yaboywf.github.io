import styles from "./card.module.scss";

const Card = ({ title, children }) => {
    return (
        <div className={styles.card}>
            <h3>{title}</h3>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Card;