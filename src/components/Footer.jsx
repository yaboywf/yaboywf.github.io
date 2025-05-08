import React from "react";
import "../styles/footer.scss";

const Footer = () => {
    return (
        <footer>
            <a href="https://www.instagram.com/yaboywf/" target="_blank" rel="noopener noreferrer">
                <div><i className="fab fa-instagram"></i></div>
            </a>
            <a href="https://www.facebook.com/dylan.yeo.3705" target="_blank" rel="noopener noreferrer">
                <div><i className="fab fa-facebook"></i></div>
            </a>
            <a href="https://www.linkedin.com/in/dylan-yeo-858b79303/" target="_blank" rel="noopener noreferrer">
                <div><i className="fab fa-linkedin-in"></i></div>
            </a>
            <a href="https://github.com/yaboywf" target="_blank" rel="noopener noreferrer">
                <div><i className="fab fa-github"></i></div>
            </a>
        </footer>
    );
};

export default Footer;