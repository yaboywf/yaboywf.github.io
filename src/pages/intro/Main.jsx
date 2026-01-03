import Introduction from "./Intro";
import SubIntro from "./SubIntro";
import Techstack from "./Techstack";
import Certs from "./Certs";
import Footer from "../Footer";
import "../../styles/general.scss";
import "./nav.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Dylan Yeo | Home";
    }, []);

    return (
        <main>
            <Introduction></Introduction>
            <SubIntro></SubIntro>
            <Techstack></Techstack>
            <Certs></Certs>

            <h2 className="redirect-header">Want to know more?</h2>
            <div className="redirect-container">
                <div className='redirect' style={{ '--icon': '"\\f135"' }}>
                    <p>Explore My Experience</p>
                    <p>Discover my professional journey and projects</p>
                    <a onClick={() => navigate("/experience")}>View Experience</a>
                </div>

                <div className='redirect' style={{ '--icon': '"\\f82d"' }}>
                    <p>Get In Touch</p>
                    <p>Feel free to reach out for collaborations or opportunities</p>
                    <a onClick={() => navigate("/contact")}>Contact Me</a>
                </div>
            </div>

            <Footer></Footer>
        </main>
    );
};

export default Main;