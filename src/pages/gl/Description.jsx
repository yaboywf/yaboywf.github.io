import "../intro/intro.scss";
import Card from "../../components/Card.jsx";

const SubIntro = () => {
    return (
        <div className="subintro-container">
            <Card title={"Introduction to Guided Learning Subject"}>
                <p>
                    Guided Learning teaches students how to be independent learners by planning and carrying out a personal learning project.
                    <br /><br />
                    Students research, track their progress and reflect on their learning journey. We will showcase what they have learned outside their usual curriculum through a e-portfolio.
                </p>
            </Card>

            <Card title={"Introduction to Guided Learning Project"}>
                <p>
                    This project is about me learning how to play the keyboard/piano.
                    <br /><br />
                    I will start from the basics, learning proper finger placement, reading sheet music, and playing simple songs. Over time, I aim to gradually tackle more advanced pieces and improve my ability to play music fluently.
                </p>
            </Card>
        </div>
    );
};

export default SubIntro;