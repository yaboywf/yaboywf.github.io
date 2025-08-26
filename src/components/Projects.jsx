import "../styles/projects.scss";

const projects = {
    "The ATC Game": {
        "description": "Users play the role of an air traffic controller, instructing aircrafts to their target altitude speed and waypoint.",
        "usage": ["Pygame"],
        "image": "atc.webp"
    },
    "Ping Pong": {
        "description": "Users play the role of two ping-pong players. The game ends when one of the players scores 10 points.",
        "usage": ["Pygame"],
        "image": "pingpong.webp"
    },
    "The Great Garbage Cleanup": {
        "description": "Users are on a ship and tasked to pick up garbage from the sea. Remember to avoid the fishes.",
        "usage": ["Pygame"],
        "image": "garbage.webp"
    },
    "The Boys' Brigade 21st Company Website": {
        "description": "Website for the company that showcases what it does as well as include several administrative features.",
        "usage": ["React JS", "SCSS", "Vercel Serverless Functions"],
        "image": "bbwebsite.webp",
        "link": "https://bb-21-5a1d0159cf81.herokuapp.com"
    },
    "Multiplayer Rock Paper Scissors with Socket.io": {
        "description": "Multiplayer game that allows users to play against each other. Uses Socket.io for real-time communication.",
        "usage": ["React JS", "SCSS", "NodeJS (Socket.io)"],
        "image": "rps.webp",
        "link": "https://github.com/yaboywf/multiplayer-rock-paper-scissors"
    },
    "Attendance System": {
        "description": "Website that aims to simplify an attendance process. Includes features such as self marking, form submission, etc.",
        "usage": ["React JS", "SCSS", "Express JS", "Python", "Firebird SQL"],
        "image": "attendance.webp",
        "link": "https://github.com/yaboywf/attendance-system"
    },
    "Teach & Tackle": {
        "description": "Frontend design for a website that provides a platform for students mentor each other. Diploma Assignment.",
        "usage": ["HTML", "CSS", "JavaScript", "AWS Cognito", "AWS Lambda", "AWS S3", "AWS DynamoDB", "AWS API Gateway", "AWS SES"],
        "image": "teachtackle.webp",
        "link": "https://github.com/yaboywf/teach-and-tackle-v2"
    },
    "TP VendPoint": {
        "description": "Website that allows administrators to manage vending machines. Diploma Assignment.",
        "usage": ["HTML", "CSS", "JavaScript", "Express JS", "MySQL"],
        "image": "vendpoint.webp"
    }
}

const Projects = () => {
    return (
        <section className="projects">
            <h2>Projects</h2>
            <div>
                {Object.entries(projects).map(([key, value]) => {
                    return (
                        <div className="project" style={{ background: `url(images/${value.image}) center/contain no-repeat` }} key={key} onClick={() => window.open(value.link || "")}>
                            <div onClick={() => window.open(value.link || "")}>
                                <h3>{key}</h3>
                                <p>{value.usage.join(" | ")}</p>

                                <p>{value.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;