// screens/RegisterMobileScreen.js
import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig, auth } from "../firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function RegisterMobileScreen({ navigation, route }) {
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  // Get language and role from route.params
  const { language, role } = route.params;

  const startPhoneAuth = async () => {
    if (!name || !phone) {
      Alert.alert("Missing Fields", "Please enter your name and phone number.");
      return;
    }

    try {
      // Start phone authentication
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier.current);
      setVerificationId(confirmation.verificationId);
      Alert.alert("OTP Sent", "A verification code has been sent to your phone.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const confirmOtp = async () => {
    if (!otp) {
      Alert.alert("Missing OTP", "Please enter the OTP sent to your phone.");
      return;
    }

    try {
      // Confirm OTP
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await auth.signInWithCredential(credential);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        phone: phone,
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
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
      <Text style={styles.h1}>Register with Mobile</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="+94XXXXXXXXX"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {!verificationId ? (
        <TouchableOpacity style={styles.button} onPress={startPhoneAuth}>
          <LinearGradient colors={["#00E0FF", "#A020F0"]} style={styles.gradient}>
            <Text style={styles.btnText}>Send OTP</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.input}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={confirmOtp}>
            <LinearGradient colors={["#00E0FF", "#A020F0"]} style={styles.gradient}>
              <Text style={styles.btnText}>Confirm OTP</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
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
