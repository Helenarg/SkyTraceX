import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherCard({ title, value, status, description, icon }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.statusContainer}>
        <Text style={[styles.status, status === 'Good' ? styles.goodStatus : styles.badStatus]}>{status}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '45%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
    color: '#00E0FF',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    backgroundColor: 'rgba(16,185,129,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  goodStatus: {
    color: '#10B981',
  },
  badStatus: {
    color: '#EF4444',
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
});