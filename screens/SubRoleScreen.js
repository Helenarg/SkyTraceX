// screens/SelectRoleScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

export default function SelectRoleScreen() {
  const [selectedRole, setSelectedRole] = useState("Weather Enthusiast");
  const [language, setLanguage] = useState("EN");
  const navigation = useNavigation();

  const roles = [
    {
      id: "Weather Enthusiast",
      title: "Weather Enthusiast",
      desc: "Track weather patterns and make predictions",
      icon: "🌦️",
    },
    {
      id: "Professional Forecaster",
      title: "Professional Forecaster",
      desc: "Plan hiking, camping and outdoor adventure",
      icon: "📈",
    },
    {
      id: "Outdoor Activities",
      title: "Outdoor Activities",
      desc: "Contribute professional weather insights",
      icon: "⛰️",
    },
    {
      id: "Stargazers",
      title: "Stargazers",
      desc: "Explore night sky and celestial events",
      icon: "☁️",
    },
  ];

  const handleContinue = async () => {
    try {
      // Save user to Firestore
      await addDoc(collection(db, "users"), {
        role: selectedRole,
        language: language,
        createdAt: new Date(),
      });
    } catch (error) {
      console.warn("Firestore save failed:", error);
    }

    navigation.navigate("Home", { role: selectedRole, language });
  };

  return (
    <LinearGradient colors={["#0F172A", "#1E1B4B"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.contentWrapper}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.logoText}>☁️ SkyTrace</Text>
          <View style={styles.languageSwitch}>
            {["EN", "සිං", "த"].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.langBtn, language === lang && styles.langBtnSelected]}
                onPress={() => setLanguage(lang)}
              >
                <Text
                  style={[styles.langText, language === lang && styles.langTextSelected]}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Tell more about yourself</Text>
        <Text style={styles.subtitle}>
          What interests you most?
        </Text>

        {/* Role Cards */}
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: Platform.OS === "web" ? 30 : 20,
          }}
        >
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[styles.card, selectedRole === role.id && styles.cardSelected]}
              onPress={() => setSelectedRole(role.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.icon}>{role.icon}</Text>
              <Text style={styles.cardTitle}>{role.title}</Text>
              <Text style={styles.cardDesc}>{role.desc}</Text>
              {selectedRole === role.id && (
                <Text style={styles.selectedLabel}>Selected</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <LinearGradient
            colors={["#00E0FF", "#A020F0"]}
            style={styles.gradientBtn}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === "web" ? 40 : height * 0.05,
  },
  scrollContainer: { 
    alignItems: 'center', 
    paddingTop: 50, 
    paddingBottom: 20,
    paddingHorizontal: 16 // Add horizontal padding to prevent content overflow
  },
  contentWrapper: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? 800 : width * .85, // Keeps layout centered on web
    alignSelf: "center",
    paddingHorizontal: 16, // Add horizontal padding to prevent content overflow
    margin: "auto",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Platform.OS === "web" ? 25 : height * 0.03,
  },
  logoText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "white",
  },
  languageSwitch: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 10,
    overflow: "hidden",
  },
  langBtn: { paddingVertical: 5, paddingHorizontal: 12 },
  langBtnSelected: { backgroundColor: "#06B6D4" },
  langText: { color: "#94A3B8", fontWeight: "600" },
  langTextSelected: { color: "white" },
  title: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: Platform.OS === "web" ? 12 : height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: Platform.OS === "web" ? 30 : height * 0.03,
  },
  card: {
    backgroundColor: "#1E293B",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: Platform.OS === "web" ? 20 : 5,
    alignItems: "center",
    width: "100%",
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#06B6D4",
  },
  icon: { fontSize: width * 0.08, marginBottom: 8 },
  cardTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: width * 0.033,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 8,
  },
  selectedLabel: {
    fontSize: width * 0.032,
    color: "#06B6D4",
    fontWeight: "600",
  },
  button: {
    width: "100%",
    marginTop: Platform.OS === "web" ? 20 : height * 0.02,
    marginBottom: Platform.OS === "web" ? 30 : height * 0.03,
  },
  gradientBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});
