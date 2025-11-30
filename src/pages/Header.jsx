import { useEffect, useState } from "react";

function Header() {
    const [activeLink, setActiveLink] = useState("/");

    useEffect(() => setActiveLink(window.location.hash), []);

    return (
        <nav>
            <a href="/" target="_top" id="index" className={activeLink === "" ? "active" : ""}>Home</a>
            <a href="/#/experience" target="_top" id="experience" className={activeLink === "#/experience" ? "active" : ""}>Experience</a>
            <a href="/#/contact" target="_top" id="contact" className={activeLink === "#/contact" ? "active" : ""}>Contact Me</a>
        </nav>
    );
}

export default Header;