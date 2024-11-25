import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlcswW6IaKb6mvsj5S1O2pLvInq8e5Vnc",
    authDomain: "task-manager-52ff7.firebaseapp.com",
    projectId: "task-manager-52ff7",
    storageBucket: "task-manager-52ff7.firebasestorage.app",
    messagingSenderId: "245265953966",
    appId: "1:245265953966:web:a77f8914b731224784293f",
    measurementId: "G-DLPLGPH6SZ"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
