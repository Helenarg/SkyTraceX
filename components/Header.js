import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title, location, status }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      <Text style={[styles.status, status === 'Online' ? styles.online : styles.offline]}>
        {status === 'Online' ? '● Online Ready' : '● Offline'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  location: { color: '#94A3B8', fontSize: 14 },
  status: { fontSize: 14, fontWeight: 'bold' },
  online: { color: '#10B981' },
  offline: { color: '#EF4444' },
});