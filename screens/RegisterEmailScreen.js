// // RegisterEmailScreen.js
// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";

// export default function RegisterEmailScreen() {
//   const navigation = useNavigation();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user info in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         name: name,
//         email: email,
//         role: null, // will be updated after role selection
//       });

//       navigation.replace("SelectRoleScreen"); // Navigate to role selection
//     } catch (error) {
//       console.error("Error registering:", error.message);
//     }
//   };

//   return (
//     <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
//       <Text style={styles.title}>Register with Email</Text>

//       <TextInput
//         placeholder="Enter your name"
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Enter your password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />

//       <TouchableOpacity onPress={handleRegister}>
//         <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.button}>
//           <Text style={styles.buttonText}>Register</Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 20 },
//   input: {
//     backgroundColor: "white",
//     width: "80%",
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 8,
//   },
//   button: {
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//     alignItems: "center",
//     width: 200,
//   },
//   buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
// });












// screens/RegisterEmailScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthProvider';

export default function RegisterEmailScreen({ navigation, route }) {
  const { registerWithEmail } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const role = route.params?.role;
  const subrole = route.params?.subrole;

  const submit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing', 'Please fill all fields');
      return;
    }
    try {
      const roleObj = { role, subrole };
      await registerWithEmail(name, email, password, roleObj);
      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Register Error', err.message);
    }
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Image source={require('../assets/Team SkyTrace.png')} style={{ width: 100, height: 100, marginBottom: 20 }} />
      <Text style={styles.h1}>Create account</Text>

      <TextInput placeholder="Full name" placeholderTextColor="rgba(255,255,255,0.5)" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" placeholderTextColor="rgba(255,255,255,0.5)" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" placeholderTextColor="rgba(255,255,255,0.5)" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={submit}>
        <LinearGradient colors={["#00E0FF", "#A020F0"]} style={styles.gradient}>
          <Text style={styles.btnText}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginEmail')} style={{ marginTop: 12 }}>
        <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>Login with email</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  h1: { color: '#fff', fontSize: 18, marginBottom: 20 },
  input: { width: '80%', padding: 12, borderRadius: 10, marginBottom: 12, backgroundColor: 'rgba(255,255,255,0.04)', color: '#fff' },
  button: { width: '80%', borderRadius: 30, overflow: 'hidden' },
  gradient: { padding: 12, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: '700' }
});

