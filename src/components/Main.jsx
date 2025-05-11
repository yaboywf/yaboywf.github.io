import Header from "./Header";
import Education from "./Education";
import Testimony from "./Testimony";
import Footer from "./Footer";
import Introduction from "./Introduction";
import Techstack from "./Techstack";
import "../styles/general.scss";

const Main = () => {
    return (
        <div>
            <Header></Header>

            <Introduction></Introduction>
            <Techstack></Techstack>
            <Education></Education>
            <Testimony></Testimony>

            <Footer></Footer>
        </div>
    );
};

export default Main;