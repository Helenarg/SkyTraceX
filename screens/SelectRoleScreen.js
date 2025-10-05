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

const { width, height } = Dimensions.get("window");

export default function SelectRoleScreen({ route, navigation }) {
  const { language } = route.params; // Get the selected language from route.params
  const [selectedRole, setSelectedRole] = useState("Farmer");

  const roles = [
    {
      id: "Farmer",
      title: "Farmer / ගොවියා / விவசாயி",
      desc: "Weather insights for crop planning and agriculture",
      icon: "🌱",
    },
    {
      id: "Fisherman",
      title: "Fisherman / ධීවරයා / மீனவர்",
      desc: "Sea conditions and safety alerts for fishing",
      icon: "🌊",
    },
    {
      id: "General",
      title: "General User / සාමාන්‍ය පරිශීලක / பொதுப் பயனர்",
      desc: "Weather and astronomy for everyday life",
      icon: "☁️",
    },
  ];

  const handleContinue = () => {
    if (selectedRole === "General") {
      // Navigate to SubRoleScreen if the selected role is "General"
      navigation.navigate("SubRoleScreen", { language });
    } else if (selectedRole === "Fisherman") {
      // Navigate to SubRoleScreen if the selected role is "Fisherman"
      navigation.navigate("Fisherman", { language });
    } else {
      // Navigate to the authentication screen with the selected role and language
      navigation.navigate("Farmer", { role: selectedRole, language });
    }
  };

  return (
    <LinearGradient colors={["#0F172A", "#1E1B4B"]} style={styles.container}>
      <Text style={styles.title}>Welcome to SkyTrace</Text>
      <Text style={styles.subtitle}>
        Select your primary use case to get specialized weather insights for Sri Lanka
      </Text>

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

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <LinearGradient
          colors={["#00E0FF", "#A020F0"]}
          style={styles.gradientBtn}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, color: "#fff", marginBottom: 20 },
  subtitle: { fontSize: 16, color: "#ccc", marginBottom: 20 },
  card: {
    backgroundColor: "#1E293B",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    width: "90%",
  },
  cardSelected: { borderWidth: 2, borderColor: "#00E0FF" },
  icon: { fontSize: 40, marginBottom: 10 },
  cardTitle: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  cardDesc: { fontSize: 14, color: "#ccc", textAlign: "center" },
  selectedLabel: { fontSize: 14, color: "#00E0FF", marginTop: 5 },
  button: { width: "90%", marginTop: 20 },
  gradientBtn: { borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});