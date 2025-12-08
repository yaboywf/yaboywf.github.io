import Introduction from "../intro/Intro";
import SubIntro from "./Description";
import Deliverables from "./Deliverables";
import DocxViewer from "./Contract";
import LearningLog from "./LearningLog";
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
            <SubIntro></SubIntro>
            <Deliverables></Deliverables>
            <DocxViewer></DocxViewer>
            <LearningLog></LearningLog>
        </main>
    );
};

export default Main;