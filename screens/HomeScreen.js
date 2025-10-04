// // HomeScreen.js
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { auth, db } from "../firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// export default function HomeScreen() {
//   const [name, setName] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         if (userDoc.exists()) {
//           setName(userDoc.data().name);
//         }
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.container}>
//       <Text style={styles.title}>Welcome {name} 👋</Text>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 26, fontWeight: "bold", color: "white" },
// });











// screens/HomeScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const { user, userData, logout } = useContext(AuthContext);
  const [name, setName] = useState('');

  useEffect(() => {
    // Prefer Firestore userData.name, fallback to auth displayName
    if (userData?.name) setName(userData.name);
    else if (user?.displayName) setName(user.displayName);
    else setName('');
  }, [user, userData]);

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100, marginBottom: 20 }} />
      <Text style={styles.h1}>Welcome{ name ? `, ${name}` : '' }!</Text>

      <TouchableOpacity style={styles.smallBtn} onPress={() => navigation.navigate('SelectRole')}>
        <Text style={styles.smallBtnText}>Change Role</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.smallBtn} onPress={() => logout()}>
        <Text style={styles.smallBtnText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  h1: { color: '#fff', fontSize: 20, marginBottom: 20 },
  smallBtn: { marginTop: 12, padding: 12, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.04)' },
  smallBtnText: { color: '#fff' }
});
