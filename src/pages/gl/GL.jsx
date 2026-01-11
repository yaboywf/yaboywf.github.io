import Introduction from "../intro/Intro";
import SubIntro1 from "../intro/SubIntro";
import SubIntro from "./Description";
import Deliverables from "./Deliverables";
import DocxViewer from "./Contract";
import LearningLog from "./LearningLog";
import Reflections from "./Reflections";
import Timeline from "./Timeline";
import Video from "./FinalVideo";
import Footer from "../Footer";
import "../../styles/general.scss";
import "../intro/nav.scss";
import { useEffect } from "react";

const Main = () => {
    useEffect(() => {
        document.title = "Dylan Yeo | Guided Learning";
    }, []);

    return (
        <main>
            <Introduction></Introduction>
            <SubIntro1></SubIntro1>
            <SubIntro></SubIntro>
            <Deliverables></Deliverables>
            <Timeline></Timeline>
            <Video></Video>
            <DocxViewer></DocxViewer>
            <LearningLog></LearningLog>
            <Reflections></Reflections>
            <Footer></Footer>
        </main>
    );
};

export default Main;