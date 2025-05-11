import "../styles/techstack.scss";

const Techstack = () => {
    const techstackList = ["HTML", "React JS", "CSS", "SCSS", "JavaScript", "Python", "C++", "Javascript Express", "Python Flask", "Pygame", "MySQL", "SQLite", "Firebird SQL", "Dart", "Flutter", "Figma", "KNIME"];

    return (
        <section className="techstack">
            <h2>Tech Stack</h2>

            {techstackList.map((techstackItem) => {
                const techstackLogo = techstackItem.toLowerCase().replaceAll(" ", "");
                return (
                    <div key={techstackLogo}>
                        <div style={{ background: `url('/images/${techstackLogo}.webp') center/contain no-repeat` }}></div>
                        <p>{techstackItem}</p>
                    </div>
                );
            })}
        </section>
    );
};

export default Techstack;