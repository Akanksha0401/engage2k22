import { initializeApp } from "firebase/app";
import { getDatabase } from '@firebase/database'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyCrq8QEByfFR6hDZ0JbmrLk6iPKN9xzRV4",
    authDomain: "engage2k22.firebaseapp.com",
    projectId: "engage2k22",
    storageBucket: "engage2k22.appspot.com",
    messagingSenderId: "145722244234",
    appId: "1:145722244234:web:7189121831aba68ffc0173",
    measurementId: "G-11XVRRFJ6H"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const analytics = getAnalytics(app);

export { db, auth, provider, analytics }