import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBWp8TxGwJ1_McJYKyPlRRgcMZtjKa-s3U",
    authDomain: "up-prod-300e3.firebaseapp.com",
    projectId: "up-prod-300e3",
    storageBucket: "up-prod-300e3.appspot.com",
    messagingSenderId: "794752176945",
    appId: "1:794752176945:web:3d5e650c0f65fe8f639610",
    measurementId: "G-1X8Q1HTDCH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
