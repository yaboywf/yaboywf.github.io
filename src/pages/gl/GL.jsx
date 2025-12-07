import Introduction from "../intro/Intro";
import SubIntro from "./Description";
import DocxViewer from "./Contract";
import "../../styles/general.scss";
import "../intro/nav.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
    useEffect(() => {
        document.title = "Dylan Yeo | Guided Learning";
    }, []);

    return (
        <main>
            <Introduction></Introduction>
            <SubIntro></SubIntro>
            <DocxViewer></DocxViewer>
        </main>
    );
};

export default Main;