import HlsPlayer from "./HLS";
import styles from "./timeline.module.scss";
import { Fragment, useEffect, useRef, useState } from "react";

const POINTS = [0.05, 0.15, 0.25, 0.35, 0.5, 0.7, 0.9];
const data = [
    {
        title: "Week 5",
        video: "/combined/output.m3u8",
        description: "Practised switching between chords smoothly while maintaining a steady tempo. The focus was on improving finger placement, reducing pauses between chord changes, and keeping consistent timing throughout the piece.\nThe demo showcases me playing Walleman, demonstrating my progress in chord transitions and overall rhythmic control.",
    },
    {
        title: "Week 6",
        video: "/intro/output.m3u8",
        description: "Practised the intro of ‘Someone You Loved’ using both hands, focusing on coordinating the right-hand melody with left-hand chords while maintaining steady timing.",
    }
]

const MorphingCard = ({ expanded, onFullyClose, registerClose }) => {
    const { rect, data } = expanded;
    const ref = useRef(null);
    const [, setClosing] = useState(false);

    useEffect(() => {
        registerClose(handleClose);

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "8px";

        requestAnimationFrame(() => {
            ref.current.classList.add(styles.open);
        });

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "0px";
        };
    }, []);

    const handleClose = () => {
        setClosing(true);

        ref.current.classList.remove(styles.open);
        ref.current.classList.add("closing");
        ref.current.addEventListener("transitionend", () => onFullyClose(), { once: true });
    };

    return (
        <div
            ref={ref}
            className={styles['morphing-card']}
            style={{
                top: rect.top + "px",
                left: rect.left + "px",
                width: rect.width + "px",
                height: rect.height + "px"
            }}
            onClick={handleClose}
        >
            <div>
                <h1>{data.title}</h1>
                {data.description.split("\n").map((line, index) => (
                    <Fragment key={index}>
                        <p>{line}</p>
                        <br />
                    </Fragment>
                ))}
            </div>
            <div>
                <HlsPlayer src={`/gl/${data.video}`} autoPlay />
            </div>
        </div>
    );
};

const Timeline = () => {
    const pathRef = useRef(null);
    const wrapperRef = useRef(null);
    const [dots, setDots] = useState([]);
    const [shownLabels, setShownLabels] = useState({});
    const [expanded, setExpanded] = useState(null);
    const [originalRef, setOriginalRef] = useState(null);
    const closeRef = useRef(null);

    useEffect(() => {
        const path = pathRef.current;
        const wrapper = wrapperRef.current;
        if (!path || !wrapper) return;

        const length = path.getTotalLength();

        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        const calculatedDots = POINTS.map((p, i) => {
            const point = path.getPointAtLength(length * p);
            return {
                x: point.x,
                y: point.y,
                direction: p < 0.5 ? -1 : (p < 0.6 ? 0 : 1),
                label: `Week ${i + 2}`
            };
        });

        setDots(calculatedDots);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    path.style.transition = "stroke-dashoffset 2.5s ease-out";
                    path.style.strokeDashoffset = "0";
                    wrapper.classList.add(styles.animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(wrapper);

        return () => observer.disconnect();
    }, []);

    const showLabel = (i) => {
        setShownLabels(prev => ({ ...prev, [i]: true }));
    };

    const registerClose = (fn) => {
        closeRef.current = fn;
    };

    const handleExpand = (ref, data) => {
        const rect = ref.target.getBoundingClientRect();
        ref.target.classList.add(styles.hidden);
        setOriginalRef(ref);
        setExpanded({ rect, data });
    };

    const onClose = () => {
        originalRef.target.classList.remove(styles.hidden);
        setExpanded(null);
    };

    return (
        <div ref={wrapperRef} className={styles.timeline}>
            <div className={styles.content}>
                <p>The Journey</p>
                <svg width="1000" height="1100" viewBox="0 0 800 300">
                    <path
                        ref={pathRef}
                        d="M 5 0 H 600 A 30 30 0 0 1 630 30 V 300 A 30 30 0 0 1 600 330 H 5"
                        fill="none"
                        stroke="rgba(29, 20, 60, 1)"
                        strokeWidth="6"
                        strokeLinecap="round"
                    />

                    {dots.map((dot, i) => {
                        const stemLength = 60;

                        return (
                            <g key={i}>
                                <rect
                                    key={i}
                                    x={dot.x - 6}
                                    y={dot.y - 6}
                                    width="8"
                                    height="8"
                                    rx="4"
                                    className={`${styles.dot} ${dot.direction === -1 ? styles.up : (dot.direction === 0 ? styles.right : styles.down)}`}
                                    style={{ animationDelay: `${i * 0.5}s` }}
                                    onAnimationEnd={() => showLabel(i)}
                                />

                                {shownLabels[i] && (
                                    <foreignObject
                                        x={dot.direction === 0 ? dot.x + stemLength + 8 : dot.x - 49}
                                        y={dot.direction === -1 ? dot.y - stemLength - 130 : dot.direction === 1 ? dot.y + stemLength + 8 : dot.y - 64}
                                        width="90"
                                        height="120"
                                    >
                                        <div className={styles.label} onClick={e => handleExpand(e, data[i])}>{dot.label}</div>
                                    </foreignObject>
                                )}
                            </g>
                        );
                    })}


                </svg>
            </div>
            <div className={styles.overlay} onClick={() => closeRef.current?.()} style={{ opacity: expanded ? "1" : "0", pointerEvents: expanded ? "all" : "none" }}></div>

            {expanded && <MorphingCard expanded={expanded} onFullyClose={onClose} registerClose={registerClose} />}
        </div>
    );
};

export default Timeline;
