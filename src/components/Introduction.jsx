import React from "react";
import "../styles/intro.scss";

const Introduction = () => {
    return (
        <section className="intro">
            <div>
                <div id="pfp" style={{ background: `url('/images/pfp.webp') center/cover no-repeat` }}></div>
                <div id="intro">
                    <h3>Hello, I'm</h3>
                    <h1>Dylan Yeo</h1>
                    <p>Second-year student pursuing a full-time Diploma in Information Technology at Temasek Polytechnic. <br /><br />Strong passion for coding and aspire to build a career in the IT field.</p>
                </div>
            </div>

            <a href="CV.pdf" download="Resume.pdf">
                <button>Download Resume</button>
            </a>
        </section>
    );
};

export default Introduction;