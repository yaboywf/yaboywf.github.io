import { useRef, useState, useEffect, Fragment } from "react";
import styles from "./learninglog.module.scss";

const LearningLog = () => {
    const svgRef = useRef(null);
    const pathRef = useRef(null);
    const [points, setPoints] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [viewport, setViewport] = useState(0);

    useEffect(() => {
        if (!pathRef.current || !svgRef.current) return;

        const path = pathRef.current;
        const svg = svgRef.current;

        const svgRect = svg.getBoundingClientRect();
        const containerRect = svg.parentElement.getBoundingClientRect();

        const viewBoxWidth = 1000;
        const viewBoxHeight = 200;

        const scaleX = svgRect.width / viewBoxWidth;
        const scaleY = svgRect.height / viewBoxHeight;

        const length = path.getTotalLength();
        const N = 4;

        const newPoints = Array.from({ length: N }, (_, i) => {
            const l = ((i + 1) / (N + 1)) * length;

            const p = path.getPointAtLength(l);
            const pAhead = path.getPointAtLength(
                Math.min(l + 1, length)
            );

            // Tangent direction
            const dx = (pAhead.x - p.x) * scaleX;
            const dy = (pAhead.y - p.y) * scaleY;

            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            return {
                x:
                    svgRect.left -
                    containerRect.left +
                    p.x * scaleX,
                y:
                    svgRect.top -
                    containerRect.top +
                    p.y * scaleY,
                angle,
            };
        });

        setPoints(newPoints);

        const onResize = () => {
            // whatever code you want to re-run
        };
    }, [viewport]);

    useEffect(() => {
        const onResize = () => setViewport(v => v + 1);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const data = [
        {
            "title": "Plan",
            "description": {
                "key_points_discussed": [
                    "My vision for the journey",
                    "What I aim to gain out of this journey",
                    "Whether the vision is feasible"
                ],
                "tasks_for_next_session": [
                    "App that I am going to use",
                    "Song that I’m going to play",
                    "A website/blog that I will use to store progress"
                ],
                "reflection": [
                    "I have started to clarify my vision and understand the direction I want to take",
                    "I am more confident about what I want to achieve and how I might go about it",
                    "Some aspects of my vision still feel broad, and I need to narrow my focus to make it more realistic",
                    "Finalise the specific tools and platforms I will use"
                ]
            },
            "location": "Sprouts Blk 1A",
            "date": "22 Oct 2025",
            "time": "15:30 - 16:30"
        },
        {
            "title": "Perform",
            "description": {
                "key_points_discussed": [
                    "Reviewed progress and deliverables",
                    "Discussed refinements needed in project",
                    "Identified areas requiring additional focus",
                    "Shared personal learning updates (piano practice) and how it affects time planning"
                ],
                "tasks_for_next_session": [
                    "Finalise the website that I will be posting on and start on it"
                ],
                "reflection": [
                    "My right-hand piano exercises are improving steadily",
                    "Consistent practice helped me understand rhythm and basic coordination",
                    "Learning Contract Schedule is as planned",
                    "My left hand is still struggling with coordination and independent movement",
                    "Adjust practice timetable to focus more on left-hand strengthening",
                    "Adapt schedule based on right-hand vs left-hand progress"
                ]
            },
            "location": "MS Teams",
            "date": "19 Nov 2025",
            "time": "13:00 - 13:15"
        },
        {
            "title": "Monitor",
            "date": "12 Dec 2025",
            "time": "13:00 - 13:15",
            "location": "MS Teams",
            "description": {
                "key_points_discussed": [
                    "Reviewed my current e-Portfolio structure and initial content",
                    "LF provided feedback on areas that need improvement",
                    "Discussed how to better align my e-Portfolio content with the module",
                    "Identified missing sections and areas that require more detailed explanations and evidence."
                ],
                "tasks_for_next_session": [
                    "Refine and improve the existing e-Portfolio content based on the LF feedback.",
                    "Update and reorganise sections to improve clarity and flow.",
                    "Add reflections and supporting evidence (e.g. screenshots, descriptions) to strengthen my e-Portfolio."
                ],
                "reflection": [
                    "I have started building my e-Portfolio early and have a basic structure in place.",
                    "Some sections lack depth and are not clearly linked to the learning outcomes.",
                    "I need to be more detailed in my explanations, improve organisation, and ensure my reflections clearly show my learning progress"
                ]
            },
        },
        {
            "title": "Reflect",
            "date": "",
            "time": "",
            "location": "",
            "description": {
                "key_points_discussed": [],
                "tasks_for_next_session": [],
                "reflection": []
            },
        }
    ];

    return (
        <div className={styles.container}>
            <h1>Learning Logs</h1>
            <div className={styles.curve_container}>
                <svg ref={svgRef} className={styles.curve} viewBox="0 0 1000 200" preserveAspectRatio="none">
                    <path ref={pathRef} d="M 0 180 A 600 180 0 0 1 1000 180" fill="none" stroke="black" strokeWidth="2" />
                </svg>
                {points.map((p, i) => {
                    return (
                        <Fragment key={i}>
                            <div
                                className={styles.point}
                                style={{ left: p.x, top: p.y - 5 }}
                            />
                            <div data-color={i % 4} className={`${styles.consultation} ${currentIndex === i ? styles.active : ""}`} style={{ left: p.x - 75, top: p.y - 270, transform: `rotate(${p.angle}deg) ${currentIndex === i ? "scale(1.1)" : ""}` }} onClick={() => setCurrentIndex(i)}>
                                <p>Consultation {i + 1}</p>
                                <p>{data[i]?.title}</p>
                                <p>{data[i]?.date}<br />{data[i]?.time}</p>
                                <p>{data[i]?.location}</p>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
            <div className={styles.log} data-index={currentIndex} key={currentIndex}>
                {currentIndex > -1 && <>
                    <div className={styles.active}>
                        <p>Key Points Discussed</p>
                        <ul>
                            {data[currentIndex]?.description.key_points_discussed.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.active}>
                        <p>Tasks for Next Session</p>
                        <ul>
                            {data[currentIndex]?.description.tasks_for_next_session.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.active}>
                        <p>Reflection</p>
                        <ul>
                            {data[currentIndex]?.description.reflection.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </>}
            </div>
        </div>
    );
};

export default LearningLog;
