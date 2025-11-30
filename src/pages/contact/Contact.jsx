import { useState, useEffect } from "react";
import Stepper, { Step } from '../../components/Form';
import Particles from "../../components/Particles";
import "../../styles/general.scss";
import styles from "./contact.module.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, OAuthProvider } from "@firebase/auth";
import axios from "redaxios";

const Contact = () => {
    const [user, setUser] = useState();
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setStep(2);
            } else setStep(1);
        });

        document.title = "Dylan Yeo Portfolio | Contact Me";
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error during sign-in: ", error);
            showMessage("An error occurred during sign-in. Please try again.");
        }
    };

    const signInWithMicrosoft = async () => {
        const provider = new OAuthProvider('microsoft.com');
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error during sign-in: ", error);
            showMessage("An error occurred during sign-in. Please try again.");
        }
    }

    const signInWithGitHub = async () => {
        const provider = new OAuthProvider('github.com');
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error during sign-in: ", error);
            showMessage("An error occurred during sign-in. Please try again.");
        }
    }

    const checkRequirements = async (currentStep) => {
        try {
            if (currentStep === 2) {
                if (message.trim() === '') return false;

                const token = await user.getIdToken();
                const resp = await axios.post('https://portfolio.dylanyeowf.workers.dev', { message }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                return resp.data.success === true
            }

            return true;
        } catch (error) {
            console.error(error);
            showMessage(error.data.error || 'An error occurred while sending your message.');
            return false;
        }
    }

    const showMessage = (message, type = 'error') => {
        const newError = document.createElement('div');
        newError.classList.add(styles.error);
        if (type === 'success') newError.classList.add('success');
        newError.textContent = message;
        const container = document.querySelector('.' + styles['error-container']);
        if (container) container.appendChild(newError);

        setTimeout(() => newError.remove(), 5000);
    }

    return (
        <main className={styles.contact}>
            <div className={styles["error-container"]}></div>
            <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.5}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={true}
                disableRotation={false}
            />

            <Stepper
                className={styles.stepper}
                currentStep={step}
                checkRequirements={checkRequirements}
                onStepChange={setStep}
            >
                <Step>
                    <h2>Please Login to continue</h2>
                    <p>Login is required to prevent spam</p>
                    <div className={styles.loginButtons}>
                        <button onClick={signInWithGoogle}>Google</button>
                        <button onClick={signInWithMicrosoft}>Microsoft</button>
                        <button onClick={signInWithGitHub}>GitHub</button>
                    </div>
                    <button className={styles.returnButton} onClick={() => navigate("/")}>Return to Home</button>
                </Step>
                <Step>
                    <h2>Message</h2>
                    <textarea name="message" id="message" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </Step>
                <Step>
                    <div className={styles.completed}>
                        <i class="fas fa-party-horn"></i>
                        <h2>Horray!</h2>
                        <p>Thank you for your message</p>
                    </div>
                </Step>
            </Stepper>
        </main>
    )
}

export default Contact