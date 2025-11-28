import Introduction from "./Intro";
import SubIntro from "./SubIntro";
import Techstack from "./Techstack";
import SpotlightCard from "../components/SpotLightCard";
import "../styles/general.scss";
import "../styles/nav.scss";
import { useEffect } from "react";

const Main = () => {
    useEffect(() => {
        document.title = "Dylan Yeo Portfolio | Home";

        if (localStorage.getItem("warn") !== true) {
            alert("This website is current ly undergoing a major revamp. Some sections may be incomplete or missing. Thank you for your understanding!");
            localStorage.setItem("warn", true);
        }
    }, []);

    return (
        <main>
            <Introduction></Introduction>
            <SubIntro></SubIntro>
            <Techstack></Techstack>

            <div className="redirect-container">
                <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.25)">
                    <p>Let Me Prove my Skills</p>
                    <p>View certficates achieved over the years</p>
                    <a href="#/certifications">View Certifications</a>
                </SpotlightCard>

                <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.25)">
                    <p>Explore My Experience</p>
                    <p>Discover my professional journey and projects</p>
                    <a href="#/experience">View Experience</a>
                </SpotlightCard>
                
                <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.25)">
                    <p>Get In Touch</p>
                    <p>Feel free to reach out for collaborations or opportunities</p>
                    <a href="#/contact">Contact Me</a>
                </SpotlightCard>
            </div>
        </main>
    );
};

export default Main;