// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA385PgUf_U83fe09qdkZd8xDNbC-YZD6U",
  authDomain: "saga-220a0.firebaseapp.com",
  projectId: "saga-220a0",
  storageBucket: "saga-220a0.appspot.com",
  messagingSenderId: "25664447826",
  appId: "1:25664447826:web:b59aaa69274c462226868b",
  measurementId: "G-K9NDB19KPW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export const firebase = a
