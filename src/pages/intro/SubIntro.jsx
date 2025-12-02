import "./intro.scss";
import Card from "../../components/Card.jsx";
import { useState, useEffect } from "react";
import axios from "redaxios";

const SubIntro = () => {
    const [images, setImages] = useState({ github: null, linkedin: null, instagram: null });

    useEffect(() => {
        const getImages = async () => {
            try {
                const github = await axios.get("https://api.microlink.io/?url=https://github.com/yaboywf")
                const linkedin = await axios.get("https://api.microlink.io/?url=https://linkedin.com")
                const instagram = await axios.get("https://api.microlink.io/?url=https://instagram.com")
                console.log(github)
                setImages({ github: github.data.data.image.url, linkedin: linkedin.data.data.image.url, instagram: instagram.data.data.image.url });
            } catch (error) {
                console.error(error);
            }
        }

        getImages();
    }, []);

    return (
        <div className="subintro-container">
            {Object.keys(images).map((key) => {
                return (
                    <div className="image-container" key={key}>
                        <img src={images[key]} alt={key} />
                    </div>
                );
            })}
            <Card title={"Education"}>
                <div className="education-container">
                    <img src="/images/tp.webp" alt="Temasek Polytechnic Logo" />
                    <p>Temasek Polytechnic <br /><span>2024 - 2027</span></p>
                    <p>Diploma in Information Technology</p>
                </div>

                <div className="education-container">
                    <img src="/images/gm.webp" alt="Geylang Methodist School Logo" />
                    <p>Geylang Methodist School (Secondary) <br /><span>2022 - 2024</span></p>
                    <p>GCE Ordinary Level | 7 Credits</p>
                </div>
            </Card>

            <Card title={"About Me"}>
                <p>
                    I’m a Year 2 IT student at Temasek Polytechnic with a strong interest in building practical digital solutions.
                    <br /><br />
                    I’m always learning new technologies, taking on projects, and improving my skills through hands-on experience.
                </p>
                <button>
                    <a href="/portfolio.pdf" download="portfolio.pdf">Download Resume</a>
                </button>
            </Card>

            <Card title={"Socials"}>
                <div className="socials-container">
                    <a href="https://www.instagram.com/yaboywf/" target="_blank" rel="noopener noreferrer" aria-label="instagram">
                        <i className="fab fa-instagram"></i>
                        <p>Instagram</p>
                        <p>@yaboywf</p>
                    </a>
                    <a href="https://www.linkedin.com/in/dylan-fong-9273b8234/" target="_blank" rel="noopener noreferrer" aria-label="linkedin">
                        <i className="fab fa-linkedin-in"></i>
                        <p>LinkedIn</p>
                        <p>dylanyeowenfeng</p>
                    </a>
                    <a href="https://github.com/yaboywf" target="_blank" rel="noopener noreferrer" aria-label="github">
                        <i className="fab fa-github"></i>
                        <p>GitHub</p>
                        <p>yaboywf</p>
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default SubIntro;