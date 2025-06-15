// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbH5KX8zI7xfQnRM4ngLHOYbMbIEFk5-s",
  authDomain: "blogproject-84d4b.firebaseapp.com",
  projectId: "blogproject-84d4b",
  storageBucket: "blogproject-84d4b.firebasestorage.app",
  messagingSenderId: "2163596977",
  appId: "1:2163596977:web:911748c90f82ecbdf34c90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
