// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAcOHgu5q-wKMa9z0ngyKe_PBBSLbYRRyo",
  authDomain: "nasa-space-apps-8cb18.firebaseapp.com",
  projectId: "nasa-space-apps-8cb18",
  storageBucket: "nasa-space-apps-8cb18.firebasestorage.app",
  messagingSenderId: "999080727769",
  appId: "1:999080727769:web:2f3400e827bdbb7bb91ac8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, firebaseConfig };
