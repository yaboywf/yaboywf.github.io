import styles from "./learninglog.module.scss";

const Log = ({ index, description, date, location }) => {
    return (
        <div className={styles.log}>
            <div>
                <p>Consultation {index}</p>
                <p>{date}</p>
                <p>{location}</p>
            </div>
            <div>
                <p>Key Points Discussed</p>
                <ul>
                    {description.key_points_discussed.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>Tasks for Next Session</p>
                <ul>
                    {description.tasks_for_next_session.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>Reflection</p>
                <ul>
                    {description.reflection.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


const LearningLog = () => {
    const data = [
        {
            "title": "Consultation 1",
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
            "datetime": "22 OCt 2025 15:30 - 16:30"
        },
        {
            "title": "Consultation 2",
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
            "datetime": "19 Nov 2025 13:00 - 13:15"
        }
    ];

    return (
        <div className={styles.container}>
            <h1>Learning Logs</h1>
            {data.map((log, index) => (
                <Log
                    key={index}
                    index={index + 1}
                    description={log.description}
                    date={log.datetime}
                    location={log.location}
                />
            ))}
        </div>
    );
};

export default LearningLog;
