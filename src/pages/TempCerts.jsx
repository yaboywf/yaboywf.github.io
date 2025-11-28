import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/general.scss";
import Certs from "./Certs";

const Contact = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ name: false, message: false });
    const [touched, setTouched] = useState({ name: false, message: false });
    const [response, setResponse] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        if (touched.name || touched.message) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: name === '',
                message: message === ''
            }));
        }
    }, [name, message, touched]);

    async function submitForm(e) {
        e.preventDefault();
        if (!errors.name || !errors.message) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: name === ''
            }));

            // Set error for message field
            setErrors((prevErrors) => ({
                ...prevErrors,
                message: message === ''
            }));
        }

        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                service_id: "service_qskfpcj",
                template_id: "template_21t2lau",
                user_id: "x3W7CWcYMOJJ_XUHF",
                template_params: { name, feedback: message }
            })
        });

        setStatus("success")
        setResponse("Your message has been sent!")
    }

    return (
        <main className="contact works">
            <Header></Header>

            <header>
                <h1>Certificates</h1>
            </header>

            <Certs></Certs>

            <Footer></Footer>
        </main>
    )
}

export default Contact