import { useState, useEffect, useRef } from "react";
import * as mammoth from "mammoth";
import styles from "./contract.module.scss";
import "../intro/techstack.scss"

export default function DocxViewer() {
    const [html, setHtml] = useState("");
    const [html1, setHtml1] = useState("");
    const [collapse, setCollapse] = useState(true);
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState();
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [selectedEl, setSelectedEl] = useState(null);
    const contractRef = useRef(null);
    const proposalRef = useRef(null);
    const contractContentRef = useRef(null);
    const proposalContentRef = useRef(null);
    const pageRef = useRef(null);

    useEffect(() => {
        const loadDocx = async () => {
            const response = await fetch("/Learning Contract.docx"); // fixed file
            const arrayBuffer = await response.arrayBuffer();

            const { value } = await mammoth.convertToHtml({ arrayBuffer });
            const parser = new DOMParser();
            const doc = parser.parseFromString(value, "text/html");

            doc.querySelectorAll("input").forEach(i => i.disabled = true);
            setHtml(doc.body.innerHTML);
        };

        const loadDocx1 = async () => {
            const response = await fetch("/SI Proposal.docx"); // fixed file
            const arrayBuffer = await response.arrayBuffer();

            const { value } = await mammoth.convertToHtml({ arrayBuffer });
            const parser = new DOMParser();
            const doc = parser.parseFromString(value, "text/html");

            doc.querySelectorAll("input").forEach(i => i.disabled = true);
            setHtml1(doc.body.innerHTML);
        };

        loadDocx();
        loadDocx1();
        if (proposalRef.current) setSelectedEl(proposalRef.current);
        if (pageRef.current) {
            setContainerWidth(pageRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        const updatePos = () => {
            if (selectedEl) {
                const rect = selectedEl.getBoundingClientRect();
                setPos({ x: rect.left, y: rect.top });
                const container = selectedEl.textContent !== "Initial Proposal" ? contractContentRef : proposalContentRef;
                setContainerHeight(container.current.offsetHeight + 80);
            }

            if (pageRef.current) {
                setContainerWidth(pageRef.current.offsetWidth - 40);
            }
        };

        window.addEventListener("resize", updatePos);
        updatePos();

        return () => window.removeEventListener("resize", updatePos);
    }, [selectedEl]);

    return (
        <div className={`${styles.container} ${styles['terminal-container']}`}>
            <div className={styles["terminal-header"]}>
                <div style={{ left: `${pos.x - 310 / 2}px` }} className={styles["terminal-selector"]}></div>
                <p ref={proposalRef} onClick={e => setSelectedEl(e.target)}>Initial Proposal</p>
                <p ref={contractRef} onClick={e => setSelectedEl(e.target)}>Learning Contract</p>
                <i onClick={() => setCollapse(!collapse)} className={collapse ? "fas fa-compress" : "fas fa-expand"}></i>
            </div>

            <div ref={pageRef} data-collapse={collapse} style={{ height: `${collapse ? 300 : (containerHeight === 80 ? 1097 + 80 : containerHeight)}px` }} className={styles["terminal-body"]}>
                <a href={selectedEl?.textContent === "Initial Proposal" ? "/SI Proposal.docx" : "/Learning Contract.docx"} download>Download as DOCX</a>
                <div
                    className={styles.slider}
                    style={{
                        transform:
                            selectedEl?.textContent === "Initial Proposal"
                                ? "translateX(0)"
                                : "translateX(calc(-50% - 10px))"   // show second page
                    }}
                >
                    <div style={{ width: `${containerWidth}px` }} ref={proposalContentRef} dangerouslySetInnerHTML={{ __html: html1 }} />
                    <div style={{ width: `${containerWidth}px` }} ref={contractContentRef} data-contract dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </div>
        </div>
    );
}
