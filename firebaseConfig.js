// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5F_FJlh3dVctHjYaAwluac6EjjfE5ZoU",
  authDomain: "skytrace-2d80b.firebaseapp.com",
  projectId: "skytrace-2d80b",
  storageBucket: "skytrace-2d80b.firebasestorage.app",
  messagingSenderId: "187507627137",
  appId: "1:187507627137:web:90705c02aaa5a5dbe96980",
  measurementId: "G-G1EQSH9R7Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, firebaseConfig };
