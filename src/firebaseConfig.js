// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6CVaQB7NotFfzJ_zd5CbpvY8-bgx-_50",
    authDomain: "photofolio-sb.firebaseapp.com",
    projectId: "photofolio-sb",
    storageBucket: "photofolio-sb.appspot.com",
    messagingSenderId: "76140009695",
    appId: "1:76140009695:web:fb0e076d07ba893dce316a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
