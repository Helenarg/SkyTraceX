import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // For location icon

export default function WeatherConditionsCard({ location, date, condition, icon, onPress }) {
  return (
    <View style={styles.card}>
      {/* Location */}
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={18} color="#00E0FF" />
        <Text style={styles.locationText}>{location}</Text>
      </View>

      {/* Date */}
      <Text style={styles.dateText}>{date}</Text>

      {/* Weather Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.weatherIcon}>{icon}</Text>
      </View>

      {/* Condition Button */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <LinearGradient colors={["#00E0FF", "#A020F0"]} style={styles.gradientBtn}>
          <Text style={styles.buttonText}>{condition}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    color: '#00E0FF',
    fontSize: 16,
    marginLeft: 5,
  },
  dateText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  weatherIcon: {
    fontSize: 40,
    color: '#FFD700', // Gold color for sunny icon
  },
  button: {
    width: '80%',
  },
  gradientBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});