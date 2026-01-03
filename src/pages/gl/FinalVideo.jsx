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
            <Hls src="/gl/final/output.m3u8"></Hls>
            <div>
                <div className={styles.feedback}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ratione qui perferendis minus itaque labore, libero amet minima similique a illum iure possimus doloremque consequatur iusto. Repellat quas soluta tenetur!</p>
                    <p>David Fong</p>
                    <p>Grade</p>
                </div>
                <hr />
                <div className={styles.feedback}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ratione qui perferendis minus itaque labore, libero amet minima similique a illum iure possimus doloremque consequatur iusto. Repellat quas soluta tenetur!</p>
                    <p>David Fong</p>
                    <p>Grade</p>
                </div>
            </div>
        </div>
    );
}

export default Video