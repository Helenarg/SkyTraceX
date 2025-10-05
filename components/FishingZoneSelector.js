import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FishingZoneSelector({ onZoneSelect, onBoatSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fishing Zone</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.selector} onPress={onZoneSelect}>
          <Text style={styles.label}>Fishing Zone</Text>
          <Text style={styles.value}>Select zone area</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selector} onPress={onBoatSelect}>
          <Text style={styles.label}>Boat Type</Text>
          <Text style={styles.value}>Select boat type</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { color: '#fff', fontSize: 18, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  selector: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 10,
    width: '48%',
  },
  label: { color: '#94A3B8', fontSize: 12 },
  value: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});