// // firebase.js
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // For React Native persistence:
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

// // TODO: replace with your Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyAcOHgu5q-wKMa9z0ngyKe_PBBSLbYRRyo",
//   authDomain: "nasa-space-apps-8cb18.firebaseapp.com",
//   projectId: "nasa-space-apps-8cb18",
//   storageBucket: "nasa-space-apps-8cb18.firebasestorage.app",
//   messagingSenderId: "999080727769",
//   appId: "1:999080727769:web:2f3400e827bdbb7bb91ac8"
// };

// const app = initializeApp(firebaseConfig);

// // Try to initialize auth with React Native persistence. Fallback to getAuth if not available.
// let auth;
// try {
//   auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
// } catch (err) {
//   // fallback (shouldn't usually happen in modern expo)
//   auth = getAuth(app);
// }

// const db = getFirestore(app);

// export { app, auth, db };









// import { initializeApp } from "firebase/app";
// import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAcOHgu5q-wKMa9z0ngyKe_PBBSLbYRRyo",
//   authDomain: "nasa-space-apps-8cb18.firebaseapp.com",
//   projectId: "nasa-space-apps-8cb18",
//   storageBucket: "nasa-space-apps-8cb18.firebasestorage.app",
//   messagingSenderId: "999080727769",
//   appId: "1:999080727769:web:2f3400e827bdbb7bb91ac8"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// // Enable Auth Persistence
// setPersistence(auth, browserLocalPersistence);










// // firebase.js or firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAcOHgu5q-wKMa9z0ngyKe_PBBSLbYRRyo",
//   authDomain: "nasa-space-apps-8cb18.firebaseapp.com",
//   projectId: "nasa-space-apps-8cb18",
//   storageBucket: "nasa-space-apps-8cb18.firebasestorage.app",
//   messagingSenderId: "999080727769",
//   appId: "1:999080727769:web:2f3400e827bdbb7bb91ac8"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);





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
