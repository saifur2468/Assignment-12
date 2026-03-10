// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDkRLLgXpDxXbeDgILPTNBJd8Q5DT4VhU",
  authDomain: "building-e4f32.firebaseapp.com",
  projectId: "building-e4f32",
  storageBucket: "building-e4f32.firebasestorage.app",
  messagingSenderId: "145450861938",
  appId: "1:145450861938:web:d2ec2324a080f7686d49eb",
  measurementId: "G-8CJZ0X90E2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();