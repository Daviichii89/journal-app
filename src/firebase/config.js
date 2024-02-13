// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPnL-fDifGby_gZ47mAMucOS9fVjcLCBY",
  authDomain: "react-cursos-9cf19.firebaseapp.com",
  projectId: "react-cursos-9cf19",
  storageBucket: "react-cursos-9cf19.appspot.com",
  messagingSenderId: "101707159309",
  appId: "1:101707159309:web:4acbb8ee6f4e5320434244"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)