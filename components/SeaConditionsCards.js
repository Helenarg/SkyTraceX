import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SeaConditionsCards({ conditions }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Sea Conditions</Text>
      <View style={styles.row}>
        {conditions.map((condition, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.icon}>{condition.icon}</Text>
            <Text style={styles.value}>{condition.value}</Text>
            <Text style={styles.label}>{condition.label}</Text>
            <Text style={[styles.status, condition.status === 'Safe' ? styles.safe : styles.caution]}>
              {condition.status}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { color: '#fff', fontSize: 18, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  icon: { fontSize: 24, marginBottom: 5 },
  value: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  label: { color: '#94A3B8', fontSize: 12 },
  status: { fontSize: 12, fontWeight: 'bold' },
  safe: { color: '#10B981' },
  caution: { color: '#F59E0B' },
});