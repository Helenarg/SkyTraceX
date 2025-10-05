// screens/RegisterEmailScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterEmailScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get language and role from route.params
  const { language, role } = route.params;

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        language: language, // Save selected language
        role: role, // Save selected role
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created successfully!");
      navigation.replace("Home"); // Navigate to the home screen
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Image source={require("../assets/Team SkyTrace.png")} style={{ width: 100, height: 100, marginBottom: 20 }} />
      <Text style={styles.h1}>Create Account</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.5)"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <LinearGradient colors={["#00E0FF", "#A020F0"]} style={styles.gradient}>
          <Text style={styles.btnText}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginEmail")} style={{ marginTop: 12 }}>
        <Text style={{ color: "#fff", textDecorationLine: "underline" }}>Login with Email</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 60 },
  h1: { color: "#fff", fontSize: 18, marginBottom: 20 },
  input: { width: "80%", padding: 12, borderRadius: 10, marginBottom: 12, backgroundColor: "rgba(255,255,255,0.04)", color: "#fff" },
  button: { width: "80%", borderRadius: 30, overflow: "hidden" },
  gradient: { padding: 12, alignItems: "center" },
  btnText: { color: "#000", fontWeight: "700" },
});

