import { useEffect, useState } from "react";
import "../styles/nav.scss";

function Header() {
    const [activeLink, setActiveLink] = useState("/");

    useEffect(() => setActiveLink(window.location.hash), []);

    return (
        <nav>
            <a href="/" target="_top" id="index" className={activeLink === "" ? "active" : ""}>Home</a>
            <a href="/#/experience" target="_top" id="experience" className={activeLink === "#/experience" ? "active" : ""}>Experience</a>
        </nav>
    );
}

export default Header;