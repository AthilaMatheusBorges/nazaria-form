// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFiY6zkrZ5gRfAisHPUxXP4Qig7BcVjtY",
  authDomain: "form-nazaria.firebaseapp.com",
  projectId: "form-nazaria",
  storageBucket: "form-nazaria.appspot.com",
  messagingSenderId: "646113296435",
  appId: "1:646113296435:web:7f88ee88c02df3ab242346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;