import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FishingConditionsSummary({ safetyPercentage }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good Fishing Conditions</Text>
      <Text style={styles.subtitle}>Safe to fish within 10 nautical miles. Moderate wind conditions expected.</Text>
      <View style={styles.card}>
        <Text style={styles.percentage}>{safetyPercentage}% Safe</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { color: '#fff', fontSize: 18, marginBottom: 10 },
  subtitle: { color: '#94A3B8', fontSize: 14, marginBottom: 15 },
  card: {
    backgroundColor: 'rgba(16,185,129,0.2)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  percentage: { color: '#10B981', fontSize: 24, fontWeight: 'bold' },
});