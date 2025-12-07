import { useState, useRef, useEffect } from "react";
import styles from "./projects.module.scss";

const projects = [
    { title: "Ping Pong", description: "Users play the role of two ping-pong players. The game ends when one of the players scores 10 points.", usage: ["Pygame"], image: "pingpong.webp" },
    { title: "QR Code with Python", description: "A simple QR code generator using Python Turtle Module.", usage: ["Python"], image: "qrcode.webp" },
    { title: "The Boys' Brigade 21st Company Website", description: "Website for the company that showcases what it does as well as include several administrative features.", usage: ["React JS", "SCSS", "Firebase Authentication", "Firebase Firestore"], image: "bbwebsite.webp", link: "https://github.com/The-Boys-Brigade-21st-Company/BB-21st-Portal" },
    { title: "Teach & Tackle", description: "Cloud-based website that provides a platform for students mentor each other. Diploma Assignment.", usage: ["HTML", "CSS", "JavaScript", "AWS Cognito", "AWS Lambda", "AWS S3", "AWS DynamoDB", "AWS API Gateway", "AWS SES"], image: "teachtackle.webp", link: "https://github.com/yaboywf/CADV-Project" },
    { title: "Attendance System", description: "Website that aims to simplify an attendance process. Includes features such as self marking, form submission, etc. This website also includes user and shared based encryption, where only either the administrator or the user can decrypt the data.", usage: ["React JS", "SCSS", "Express JS", "Python", "Firebird SQL"], image: "attendance.webp", link: "https://github.com/yaboywf/attendance-system"},
    { title: "Multiplayer Rock Paper Scissors", description: "Multiplayer game that allows users to play against each other. Uses Socket.io for real-time communication.", usage: ["React JS", "SCSS", "NodeJS (Socket.io)"], image: "rps.webp", link: "https://github.com/yaboywf/multiplayer-rock-paper-scissors"},
    { title: "Chess Club Ranking System", description: "Simple CRUD website for administrators to manage chess club students. The focus point of this project was about real-world DEVOPS practices inclusive of team collaboration, testing and CI/CD. Diploma Assignment.", usage: ["HTML", "CSS", "JS", "Express JS"], image: "chess.png", link: "https://github.com/yaboywf/DEVOPS-Project"},
    { title: "TP VendPoint", description: "Website that allows administrators to manage vending machines. It includes multiple full sets of CRUD operations. Diploma Assignment.", usage: ["HTML", "CSS", "JavaScript", "Express JS", "MySQL"], image: "vendpoint.webp", link: "https://github.com/yaboywf/DBAV-Project"},
    { title: "ReFresh Deals", description: "ReFresh Deals is a mobile app that allows shop owners to post and manage food within their store. Expiring food can be posted to buyers at a discouted price, encouraging them to buy and thereby reducing food waste. Diploma Assignment", usage: ["Flutter", "Dart"], image: "refreshdeals.png", link: "https://github.com/yaboywf/MBAP-Project"},
    { title: "Portolio Website", description: "Hi! If you are seeing this, congrats! This website has gone through many iterations, transitioning from a simple UI design to what it is now today.", usage: ["React JS", "SCSS", "Firebase Authentication", "Cloudflare Workers"], image: "portfolio.png", link: "https://github.com/yaboywf/yaboywf.github.io" },
    { title: "Social Link Profile", description: "A card design that encompasses a profile picture, name, and social media links. Frontend Mentor challenge.", usage: ["HTML", "CSS"], image: "social.png", link: "https://github.com/yaboywf/social-links-profile" },
    { title: "Result Summary Component", description: "A card design that shows a summary of test results. Frontend Mentor challenge.", usage: ["HTML", "CSS"], image: "results.png", link: "https://github.com/yaboywf/results-summary-component" }
]

const ProjectGrid = ({ gridColumn, gridRow, data = {}, onExpand }) => {
    const ref = useRef(null);

    return (
        <div style={{ gridColumn, gridRow }} ref={ref} className={styles["project-grid"]} onClick={() => onExpand(ref, data)}>
            <p>{data.title}</p>
        </div>
    )
}

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
            className={`${styles['project-grid']} ${styles['morphing-card']}`}
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
                <span>{data.usage.join(" | ")}</span>
                <p>{data.description}</p>
                {data.link && <a href={data.link} target="_blank" rel="noopener noreferrer">View Project</a>}
            </div>
            <div>
                <img src={data.image ? `images/projects/${data.image}`: null} alt="" />
            </div>
        </div>
    );
};

const Projects = () => {
    const [expanded, setExpanded] = useState(null);
    const [originalRef, setOriginalRef] = useState(null);
    const closeRef = useRef(null);

    const registerClose = (fn) => {
        closeRef.current = fn;
    };

    const handleExpand = (ref, data) => {
        const rect = ref.current.getBoundingClientRect();
        ref.current.classList.add(styles.hidden);
        setOriginalRef(ref);
        setExpanded({ rect, data });
    };

    const onClose = () => {
        originalRef.current.classList.remove(styles.hidden);
        setExpanded(null);
    };

    return (
        <section className={styles.projects}>
            <h2>Projects</h2>

            <div className={styles.grid}>
                <ProjectGrid data={projects[0]} onExpand={handleExpand} />
                <ProjectGrid data={projects[1]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" gridRow="span 2" data={projects[2]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" data={projects[3]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" gridRow="span 2" data={projects[4]} onExpand={handleExpand} />
                <ProjectGrid data={projects[5]} onExpand={handleExpand} />
                <ProjectGrid data={projects[6]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" data={projects[7]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" gridRow="span 2" data={projects[8]} onExpand={handleExpand} />
                <ProjectGrid gridColumn="span 2" data={projects[9]} onExpand={handleExpand} />
                <ProjectGrid data={projects[10]} onExpand={handleExpand} />
                <ProjectGrid data={projects[11]} onExpand={handleExpand} />
            </div>

            <div className={styles.overlay} onClick={() => closeRef.current?.()} style={{ opacity: expanded ? "1" : "0", pointerEvents: expanded ? "all" : "none" }}></div>

            {expanded && <MorphingCard expanded={expanded} onFullyClose={onClose} registerClose={registerClose} />}
        </section>
    );
};

export default Projects;