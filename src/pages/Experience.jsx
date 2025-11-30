import Header from "./Header";
import Work from "./Work";
import Volunteer from "./Volunteer";
import Projects from "./Projects";
import "../styles/general.scss";
import "../styles/work.scss";

const Main = () => {
    return (
        <main className="works">
            <Header></Header>
            <header>
                <h1>My Experience</h1>
            </header>

            <Work></Work>
            <Volunteer></Volunteer>
            <Projects></Projects>
        </main>
    );
};

export default Main;