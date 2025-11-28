import "../styles/techstack.scss";
import BlurText from "../components/TextEffect";
import Threads from "../components/Threads";
import Typewriter from "../components/TypeWriter";

const Techstack = () => {
    const text = `T#ech Stack Overview
-------------------------------------------------------

[ Web Development ]             [ Backend Development ]
- HTML                          - Node.js (Express)
- CSS / SCSS                    - Django
- JavaScript                    - Python Flask
- React.js

[ Programming Languages ]       [ Databases ]
- Python                        - MySQL
- JavaScript                    - PostgreSQL
- Dart                          - MongoDB
                                - SQLite
                                - Firebird SQL

[ Mobile Development ]          [ Game Development ]
- Flutter                       - Pygame

-------------------------------------------------------
End of file
    `;

    return (
        <section className="techstack">
            <div className="threads-text-container">
                <Threads
                    amplitude={4}
                    distance={0}
                    enableMouseInteraction={false}
                />
                <BlurText
                    text="What I Use"
                    delay={150}
                    animateBy="words"
                    direction="top"
                />
            </div>

            <div className="terminal-container">
                <div className="terminal-header">
                    <div className="circle red"></div>
                    <div className="circle yellow"></div>
                    <div className="circle green"></div>
                    <div className="terminal-title">Terminal</div>
                </div>

                <div className="terminal-body">
                    <p>$ cat techstack.txt</p>
                    <Typewriter text={text} />
                </div>
            </div>
        </section>
    );
};

export default Techstack;