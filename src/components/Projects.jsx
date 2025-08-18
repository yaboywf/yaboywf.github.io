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
        "image": "bbwebsite.webp"
    },
    "QR Code Generation with Python Turtle module": {
        "description": "Generate QR codes using Python Turtle module. The current QR Code leads to the Wikipedia page of Singapore.",
        "usage": ["Python"],
        "image": "qrcode.webp"
    },
    "Attendance System": {
        "description": "Website that aims to simplify an attendance process. Includes features such as self marking, form submission, etc.",
        "usage": ["React JS", "SCSS", "Express JS", "Python", "Firebird SQL"],
        "image": "attendance.webp"
    },
    "Teach & Tackle": {
        "description": "Frontend design for a website that provides a platform for students mentor each other. Diploma Assignment.",
        "usage": ["HTML", "CSS", "JavaScript", "AWS Cognito", "AWS Lambda", "AWS S3", "AWS DynamoDB", "AWS API Gateway", "AWS SES"],
        "image": "teachtackle.webp"
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
                        <div className="project" style={{ background: `url(images/${value.image}) center/contain no-repeat` }} key={key}>
                            <div>
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