import styles from './finalvideo.module.scss';
import Hls from './HLS';
import { useEffect, useRef } from 'react';

const Video = () => {
    const wrapper = useRef(null);

    useEffect(() => {
        if (!wrapper.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    wrapper.current.classList.add(styles.animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.8 }
        );

        observer.observe(wrapper.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.finalvideo} ref={wrapper}>
            <h2>Final Video</h2>
            <Hls src="/gl/final/output.m3u8" forceMSE></Hls>
            <div>
                <div className={styles.feedback}>
                    <p>For a first-time learner, this was a strong and impressive performance with good technique, finger control, and hand–eye coordination. The overall melody and harmony were well captured, and memorising the entire piece is especially commendable for a beginner. While most notes were accurate, some rests and pauses were not fully observed, affecting the flow slightly. Focusing more on timing and practising with the score will help improve this further.</p>
                    <p>David Fong</p>
                    <p>Grade 6 Distinction</p>
                </div>
            </div>
        </div>
    );
}

export default Video