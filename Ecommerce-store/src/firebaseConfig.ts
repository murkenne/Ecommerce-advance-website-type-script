
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "ecommerce-store-74aaa.firebaseapp.com",
  projectId: "ecommerce-store-74aaa",
  storageBucket: "ecommerce-store-74aaa.appspot.com",
  messagingSenderId: "679902149617",
  appId: "1:679902149617:web:bddcda6d7e5ae706e7a250"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);
export { db, storage };
