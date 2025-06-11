import Header from "./Header";
import Education from "./Education";
import Testimony from "./Testimony";
import Footer from "./Footer";
import Introduction from "./Introduction";
import Techstack from "./Techstack";
import Certs from "./Certs";
import "../styles/general.scss";

const Main = () => {
    return (
        <main>
            <Header></Header>

            <Introduction></Introduction>
            <Techstack></Techstack>
            <Education></Education>
            <Certs></Certs>
            <Testimony></Testimony>

            <Footer></Footer>
        </main>
    );
};

export default Main;