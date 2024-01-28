// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBvHDviY26XeVyWFtwaEZk1SZ0H_OmOzeA",
  authDomain: "app-blog-293c1.firebaseapp.com",
  projectId: "app-blog-293c1",
  storageBucket: "app-blog-293c1.appspot.com",
  messagingSenderId: "967787329100",
  appId: "1:967787329100:web:04b1eaf72732df331c26e9",
  measurementId: "G-48395SBYE5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
