// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqMoODwaHrOSi_5yUerOqrISwjHQWv3CE",
    authDomain: "portfoliopanel.firebaseapp.com",
    projectId: "portfoliopanel",
    storageBucket: "portfoliopanel.firebasestorage.app",
    messagingSenderId: "569676092942",
    appId: "1:569676092942:web:c5bf6210c8e95c3c048e5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore( app )
export const auth = getAuth( app )