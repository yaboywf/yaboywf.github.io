import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/general.scss";
import "../styles/contact.scss";

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
                <h1>Contact Me</h1>
            </header>

            <form onSubmit={(e) => submitForm(e)} noValidate>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} autoComplete="name" onInput={() => setTouched((prev) => ({ ...prev, name: true }))} />
                    <p id="name-error" className={errors.name ? "visible" : ""}>This is a required field</p>
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" cols="30" rows="10" placeholder="Enter your message" required onChange={(e) => setMessage(e.target.value)} onInput={() => setTouched((prev) => ({ ...prev, message: true }))}></textarea>
                    <p id="message-error" className={errors.message ? "visible" : ""}>This is a required field</p>
                </div>
                <button type="submit">Submit</button>
            </form>

            <p className={status ?? ""}>{response}</p>

            <Footer></Footer>
        </main>
    )
}

export default Contact