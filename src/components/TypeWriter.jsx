import { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 10 }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(prev => prev + text.charAt(i));
            i++;

            if (i >= text.length) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    // Step 1: Replace markers with unique placeholders so they don't conflict
    const placeholder = displayedText
        .replace(/br/g, "@@DOUBLE@@")
        .replace(/\n/g, "@@SINGLE@@");

    // Step 2: Split by placeholders and render correct breaks
    const renderText = placeholder.split(/(@@DOUBLE@@|@@SINGLE@@)/).map((part, index) => {
        if (part === "@@DOUBLE@@") {
            return (
                <span key={index}>
                    <br />
                    <br />
                </span>
            );
        }
        if (part === "@@SINGLE@@") {
            return <br key={index} />;
        }
        return <span key={index}>{part}</span>;
    });

    return <pre>{renderText}</pre>;
}
