// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2R53qYmJI-KNuWtxw4jtgqd9-6z_okZ8",
  authDomain: "peggy-workspace.firebaseapp.com",
  projectId: "peggy-workspace",
  storageBucket: "peggy-workspace.firebasestorage.app",
  messagingSenderId: "356777225661",
  appId: "1:356777225661:web:59cfd0102d6df3294d36d4",
  measurementId: "G-ZGF5D6748M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);