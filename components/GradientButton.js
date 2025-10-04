import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function GradientBackground({ children }) {
  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.gradient}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 }
});
