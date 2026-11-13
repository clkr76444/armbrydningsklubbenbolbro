// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0RNz18qDZU15HTEcUizHFBZq6xjJIX6U",
  authDomain: "armbrydning-news.firebaseapp.com",
  databaseURL:
    "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "armbrydning-news",
  storageBucket: "armbrydning-news.firebasestorage.app",
  messagingSenderId: "75932863597",
  appId: "1:75932863597:web:f19bbd6752a39c329a4364",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
