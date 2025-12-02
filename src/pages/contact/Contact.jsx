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
                setStep(1);
            } else setStep(1);
        });

        document.title = "Dylan Yeo | Contact Me";
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
                    <h2>Please Login to verify your identity</h2>
                    <div className={styles.loginButtons}>
                        <button onClick={signInWithGoogle}>
                            <svg viewBox="0 0 24 24" class="w-5 h-5">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                            </svg>
                            Google
                        </button>
                        <button onClick={signInWithMicrosoft}>
                            <svg width="16" height="16" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="9" height="9" fill="#F25022"></rect>
                                <rect x="12" y="1" width="9" height="9" fill="#7FBA00"></rect>
                                <rect x="1" y="12" width="9" height="9" fill="#00A4EF"></rect>
                                <rect x="12" y="12" width="9" height="9" fill="#FFB900"></rect>
                            </svg>
                            Microsoft
                        </button>
                        <button onClick={signInWithGitHub}>
                            <i className="fab fa-github"></i>
                            GitHub
                        </button>
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