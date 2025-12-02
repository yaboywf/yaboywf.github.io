import Stack from "../../components/Stack";
import Projects from "./Projects";
import Particles from "../../components/Particles";
import BlurText from "../../components/TextEffect";
import "../../styles/general.scss";
import styles from './experience.module.scss'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Main = () => {
    const navigate = useNavigate();
    const workExperience = [
        { id: 1, img: '/images/experience/singapore.webp', title: "Temporary Warehouse Assistant", subtitle: "Part-time | 1 Month" },
        { id: 2, img: '/images/experience/mercantile.webp', title: "Temporary Phone Handler", subtitle: "Part-time | 2 Months" },
        { id: 3, img: '/images/experience/outdoor.webp', title: "Sports Atrium Assistant/Packer", subtitle: "Part-time | 9 Days" },
    ]

    const volunteerExperience = [
        { id: 1, img: '/images/experience/people.webp', title: "People's Association", subtitle: "4 Events" },
        { id: 2, img: '/images/experience/scs.webp', title: "Singapore Computer Society", subtitle: "5 Events" },
        { id: 3, img: '/images/experience/bb.webp', title: "The Boys' Brigade 21st Singapore Company", subtitle: "Feb 2025 to Present" },
    ]

    useEffect(() => {
        document.title = "Dylan Yeo | Experience";
    }, []);

    return (
        <main className={styles.experience}>
            <div className={styles.header}>
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.5}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    disableRotation={false}>
                </Particles>

                <div>
                    <BlurText
                        text="My Experience"
                        delay={150}
                        animateBy="words"
                        direction="top">
                    </BlurText>
                    <button onClick={() => navigate("/")}>Return to Home</button>
                </div>
            </div>

            <div className={styles.work}>
                <h2 style={{ gridArea: "header1" }}>Work Experience</h2>
                <Stack style={{ gridArea: "content1" }} cardsData={workExperience} />
                <h2 style={{ gridArea: "header2" }}>Volunteer Experience</h2>
                <Stack style={{ gridArea: "content2" }} cardsData={volunteerExperience} ></Stack>
            </div>

            <Projects></Projects>
        </main>
    );
};

export default Main;