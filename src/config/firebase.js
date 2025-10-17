import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApdIGnRAU-rrfCgxC4xMRZIxBkuIrYiTQ",
  authDomain: "level-up-store.firebaseapp.com",
  projectId: "level-up-store",
  storageBucket: "level-up-store.firebasestorage.app",
  messagingSenderId: "55057517983",
  appId: "1:55057517983:web:f52e5883e8f7386da081aa",
  measurementId: "G-FY5GDHWZRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);