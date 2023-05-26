// Import the functions you need from the SDKs you need
import { initializeApp ,firebase } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_BASE_URL,
    projectId: "solar-school-a6c60",
    storageBucket: "solar-school-a6c60.appspot.com",
    messagingSenderId: "948134517686",
    appId: "1:948134517686:web:0dc821f5444e92ea977f17"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
export {db,storage} ;