import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // For icons
import BottomNav from '../../components/BottomNav'; // Import BottomNav component

export default function FarmerReport({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  const [selectedActivity, setSelectedActivity] = useState('Planting');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleActivityChange = (activity) => {
    setSelectedActivity(activity);
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Field Location Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Field Location</Text>
          <TouchableOpacity style={styles.mapCard}>
            <Ionicons name="location-outline" size={24} color="#00E0FF" />
            <Text style={styles.mapText}>Interactive Sri Lanka Map</Text>
            <Text style={styles.mapSubtitle}>Select a district below to pin your location</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are you planning?</Text>
          <View style={styles.activityRow}>
            <TouchableOpacity
              style={[styles.activityCard, selectedActivity === 'Planting' && styles.selectedActivity]}
              onPress={() => handleActivityChange('Planting')}
            >
              <Text style={styles.activityText}>Planting</Text>
              <Text style={styles.activitySubtitle}>Sowing seeds or transplanting seedlings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.activityCard, selectedActivity === 'Harvesting' && styles.selectedActivity]}
              onPress={() => handleActivityChange('Harvesting')}
            >
              <Text style={styles.activityText}>Harvesting</Text>
              <Text style={styles.activitySubtitle}>Collecting mature crops</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.activityCard, selectedActivity === 'Fertilizing' && styles.selectedActivity]}
              onPress={() => handleActivityChange('Fertilizing')}
            >
              <Text style={styles.activityText}>Fertilizing</Text>
              <Text style={styles.activitySubtitle}>Applying nutrients to crops</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Date for</Text>
          <View style={styles.dateRow}>
            <TouchableOpacity style={styles.dateCard} onPress={() => handleDateChange('Today')}>
              <Text style={styles.dateText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateCard} onPress={() => handleDateChange('Tomorrow')}>
              <Text style={styles.dateText}>Tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateCard} onPress={() => handleDateChange('Next Week')}>
              <Text style={styles.dateText}>Next Week</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
        </View>

        {/* Weather Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather Dashboard Summary</Text>
          <View style={styles.weatherRow}>
            <View style={[styles.weatherCard, { backgroundColor: '#10B981' }]}>
              <Text style={styles.weatherValue}>72%</Text>
              <Text style={styles.weatherLabel}>Good Conditions</Text>
            </View>
            <View style={[styles.weatherCard, { backgroundColor: '#F59E0B' }]}>
              <Text style={styles.weatherValue}>20%</Text>
              <Text style={styles.weatherLabel}>Risky Conditions</Text>
            </View>
            <View style={[styles.weatherCard, { backgroundColor: '#EF4444' }]}>
              <Text style={styles.weatherValue}>8%</Text>
              <Text style={styles.weatherLabel}>Poor Conditions</Text>
            </View>
          </View>
        </View>

        {/* Detailed Weather Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Weather Breakdown</Text>
          <View style={styles.breakdownRow}>
            <View style={styles.breakdownCard}>
              <Text style={styles.breakdownValue}>72%</Text>
              <Text style={styles.breakdownLabel}>Rain Probability</Text>
            </View>
            <View style={styles.breakdownCard}>
              <Text style={styles.breakdownValue}>65%</Text>
              <Text style={styles.breakdownLabel}>Soil Moisture</Text>
            </View>
            <View style={styles.breakdownCard}>
              <Text style={styles.breakdownValue}>26-30°C</Text>
              <Text style={styles.breakdownLabel}>Temperature</Text>
            </View>
            <View style={styles.breakdownCard}>
              <Text style={styles.breakdownValue}>12 km/h</Text>
              <Text style={styles.breakdownLabel}>Wind Speed</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 70 },
  scrollContainer: { alignItems: 'center', paddingTop: 50, paddingBottom: 20 },
  backButton: { padding: 10, position: 'absolute', top: 40, left: 20, zIndex: 10 },
  section: { width: '90%', marginBottom: 30 },
  sectionTitle: { color: '#fff', fontSize: 18, marginBottom: 8, textAlign: 'center' },
  mapCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  mapText: { color: '#00E0FF', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  mapSubtitle: { color: '#ccc', fontSize: 14, textAlign: 'center' },
  activityRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
  activityCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedActivity: { backgroundColor: '#00E0FF' },
  activityText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  activitySubtitle: { color: '#ccc', fontSize: 12, textAlign: 'center' },
  dateRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  dateCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  dateText: { color: '#fff', fontSize: 14 },
  selectedDate: { color: '#ccc', fontSize: 14, marginTop: 10, textAlign: 'center' },
  weatherRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  weatherCard: {
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  weatherValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  weatherLabel: { color: '#ccc', fontSize: 12, textAlign: 'center' },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', width: '100%' },
  breakdownCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    marginVertical: 5,
    alignItems: 'center',
  },
  breakdownValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  breakdownLabel: { color: '#ccc', fontSize: 12, textAlign: 'center' },
});