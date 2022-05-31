// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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
// const analytics = getAnalytics(app);
export const storage = getStorage(app);

// export const firebase = a
