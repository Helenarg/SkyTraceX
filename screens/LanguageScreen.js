import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LanguageScreen({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    navigation.navigate("SelectRole", { language }); // Pass the selected language to SelectRoleScreen
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Text style={styles.title}>Select your language</Text>
      {["සිංහල", "தமிழ்", "English"].map((lang, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedLanguage === lang && styles.selectedButton,
          ]}
          onPress={() => handleLanguageSelect(lang)}
        >
          <Text style={styles.buttonText}>{lang}</Text>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, color: "#fff", marginBottom: 20 },
  button: {
    width: "70%",
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  selectedButton: { backgroundColor: "#00E0FF" },
  buttonText: { color: "#fff", fontSize: 18 },
});
