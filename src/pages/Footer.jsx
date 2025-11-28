import "../styles/footer.scss";

const Footer = () => {
    return (
        <footer>
            <a href="https://www.instagram.com/yaboywf/" target="_blank" rel="noopener noreferrer" aria-label="instagram">
                <div><i className="fab fa-instagram"></i></div>
            </a>
            <a href="https://www.facebook.com/dylan.yeo.3705" target="_blank" rel="noopener noreferrer" aria-label="facebook">
                <div><i className="fab fa-facebook"></i></div>
            </a>
            <a href="https://www.linkedin.com/in/dylan-yeo-858b79303/" target="_blank" rel="noopener noreferrer" aria-label="linkedin">
                <div><i className="fab fa-linkedin-in"></i></div>
            </a>
            <a href="https://github.com/yaboywf" target="_blank" rel="noopener noreferrer" aria-label="github">
                <div><i className="fab fa-github"></i></div>
            </a>
        </footer>
    );
};

export default Footer;