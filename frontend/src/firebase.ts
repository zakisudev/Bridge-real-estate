// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7HaAcD6dGJxJbFizCzKYRqSmQdaEzKcE",
  authDomain: "bridge-f4e18.firebaseapp.com",
  projectId: "bridge-f4e18",
  storageBucket: "bridge-f4e18.appspot.com",
  messagingSenderId: "215270651518",
  appId: "1:215270651518:web:82894eccf0f2284ebf0a2f",
  measurementId: "G-5JD64Y8CPK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
