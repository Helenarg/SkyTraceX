// context/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import SelectRoleScreen from '../screens/SelectRoleScreen';
import SubRoleScreen from '../screens/SubRoleScreen';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // firebase user object
  const [userData, setUserData] = useState(null); // Firestore user doc (has name, role, subrole)
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usr) => {
      setUser(usr);
      if (usr) {
        // load Firestore user doc
        try {
          const d = await getDoc(doc(db, 'users', usr.uid));
          if (d.exists()) setUserData(d.data());
          else setUserData(null);
        } catch (e) {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const registerWithEmail = async (name, email, password, roleObj) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // update displayName
    try {
      await updateProfile(cred.user, { displayName: name });
    } catch (e) {
      // not critical
    }

    // Save to Firestore
    const userDoc = { name, email, ...roleObj };
    await setDoc(doc(db, 'users', uid), userDoc, { merge: true });

    // update local state will be refreshed on onAuthStateChanged
    return cred;
  };

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, userData, initializing, registerWithEmail, loginWithEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};





