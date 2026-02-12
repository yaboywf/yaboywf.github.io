import "./techstack.scss";
import BlurText from "../../components/TextEffect";
import Threads from "../../components/Threads";
import Typewriter from "../../components/TypeWriter";

const Techstack = () => {
    const text = `Tech Stack Overview
-------------------------------------------------------

[ WEB DEVELOPMENT ]             [ DEVOPS ]
- HTML                          - Git/GitHub
- CSS / SCSS                    - Github Actions
- JavaScript/TypeScript         - Jenkins
- React.js                      - Playwright / Cypress
- Next.js                       - Cloud (AWS / GCP) 
- Node.js (Express)             - Docker
- Python (Flask)                - SuperTest
- Django                        - Minikube / Kubernetes

[ PROGRAMMING LANGUAGES ]       [ DATABASES ]
- Python                        - MySQL
- Dart                          - PostgreSQL
- Javascript                    - MongoDB
- TypeScript                    - SQLite
- MicroPython                   - Firebird SQL
                                - Firebase

[ MOBILE DEVELOPMENT ]          [ GAME DEVELOPMENT ]
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