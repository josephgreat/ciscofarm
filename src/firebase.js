// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChlb_3uEsBnTOVSp7VroLg8N-lLwVmhHk",
  authDomain: "cisco-farm.firebaseapp.com",
  projectId: "cisco-farm",
  storageBucket: "cisco-farm.appspot.com",
  messagingSenderId: "171346262910",
  appId: "1:171346262910:web:1191e0cc0bac0d2b5f912f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;