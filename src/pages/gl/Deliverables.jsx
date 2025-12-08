import styles from "./deliverables.module.scss"
import { useRef } from "react";

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(62, 36, 154, 0.7)' }) => {
    const divRef = useRef(null);

    const handleMouseMove = e => {
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
        divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    };

    return (
        <div ref={divRef} onMouseMove={handleMouseMove} className={`${styles['card-spotlight']} ${className}`}>
            {children}
        </div>
    );
};

const Deliverables = () => {
    return (
        <div className={styles.container}>
            <h2>What I Aim to Achieve</h2>
            <SpotlightCard>
                <i className="fas fa-music"></i>
                <p>To learn to read basic sheet music well enough to identify notes and play simple melodies independently.</p>
            </SpotlightCard>
            <SpotlightCard>
                <i className="fas fa-hand"></i>
                <p>To develop hand coordination and <a href="https://www.youtube.com/watch?v=zABLecsR5UE">Someone You Loved</a> using both hands.</p>
            </SpotlightCard>
            <SpotlightCard>
                <i className="fas fa-clock"></i>
                <p>To build consistent practice habits by practicing at least 10–15 minutes twice a week and tracking each session in a simple practice log</p>
            </SpotlightCard>
        </div>
    )
}

export default Deliverables