import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNxuiV1RUiFLjYkATnnha2xO940oSzAC4",
    authDomain: "portfolio-870ce.firebaseapp.com",
    projectId: "portfolio-870ce",
    storageBucket: "portfolio-870ce.firebasestorage.app",
    messagingSenderId: "273107039366",
    appId: "1:273107039366:web:61edca46bb11ced2a7cd07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);