import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAEITf9h_6Wbqzplvab05lg6qPcdeTeFQg",
  authDomain: "sentinal-vision.firebaseapp.com",
  databaseURL: "https://sentinal-vision-default-rtdb.firebaseio.com",
  projectId: "sentinal-vision",
  storageBucket: "sentinal-vision.firebasestorage.app",
  messagingSenderId: "586643120613",
  appId: "1:586643120613:web:d455e7a19c69dfa9b9cf0c",
  measurementId: "G-Y5ZBVBX530"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
