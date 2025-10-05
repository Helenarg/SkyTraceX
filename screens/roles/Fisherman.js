// screens/roles/Fisherman.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // For back button icon
import { AuthContext } from '../../context/AuthProvider';
import BottomNav from '../../components/BottomNav'; // Import BottomNav component
import Header from '../../components/Header';
import FishingZoneSelector from '../../components/FishingZoneSelector';
import SeaConditionsCards from '../../components/SeaConditionsCards';
import FishingConditionsSummary from '../../components/FishingConditionsSummary';
import ActionButtons from '../../components/ActionButtons';

export default function Fisherman({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [name, setName] = useState('');

  useEffect(() => {
    if (userData?.name) setName(userData.name);
    else if (user?.displayName) setName(user.displayName);
  }, [user, userData]);

  const seaConditions = [
    { icon: '🌊', value: '1.5m', label: 'Wave Height', status: 'Safe' },
    { icon: '🌬', value: '25km/h', label: 'Wind Speed', status: 'Caution' },
    { icon: '⛈', value: '30%', label: 'Storm Risk', status: 'Low' },
    { icon: '👁', value: '8km', label: 'Visibility', status: 'Good' },
  ];

  const actions = [
    { label: 'Generate Report', onPress: () => console.log('Generate Report') },
    { label: 'Sea Conditions Map', onPress: () => console.log('Sea Conditions Map') },
    { label: 'Weather Alerts', onPress: () => console.log('Weather Alerts') },
    { label: 'Community', onPress: () => console.log('Community') },
  ];

  return (
    <LinearGradient colors={['#0A0B14', '#270054']} style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.h1}>Welcome{ name ? `, ${name}` : '' }!</Text>

        <Header title="Fishermen Dashboard" location="Colombo, Sri Lanka" status="Online" />
        <FishingZoneSelector onZoneSelect={() => console.log('Zone Selected')} onBoatSelect={() => console.log('Boat Selected')} />
        <SeaConditionsCards conditions={seaConditions} />
        <FishingConditionsSummary safetyPercentage={85} />
        <ActionButtons actions={actions} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 70 },
  scrollContainer: { alignItems: 'center', paddingTop: 50, paddingBottom: 20 },
  h1: { color: '#fff', fontSize: 22, marginBottom: 20 },
  section: { width: '90%', marginBottom: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, marginBottom: 8, textAlign: 'center' },
  sectionSubtitle: { color: '#ccc', fontSize: 14, marginBottom: 15, textAlign: 'center' },
  selectRow: { flexDirection: 'row', justifyContent: 'space-around' },
  selectCard: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 15, 
    borderRadius: 10, 
    width: '45%', 
    alignItems: 'center' 
  },
  selectLabel: { color: '#ccc', fontSize: 12, marginBottom: 5 },
  selectValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
  conditionCard: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    width: '45%', 
    marginVertical: 5 
  },
  conditionIcon: { fontSize: 24, marginBottom: 5 },
  conditionValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  conditionLabel: { color: '#ccc', fontSize: 12, marginBottom: 5, textAlign: 'center' },
  conditionStatus: { color: '#10B981', fontSize: 12, fontWeight: 'bold' },
  safeCard: { 
    backgroundColor: 'rgba(16,185,129,0.2)', 
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  safePercent: { color: '#10B981', fontSize: 24, fontWeight: 'bold' },
  safeText: { color: '#fff', fontSize: 14, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', width: '90%' },
  actionBtn: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 12, 
    borderRadius: 10, 
    width: '45%', 
    alignItems: 'center', 
    marginVertical: 5 
  },
  actionBtnText: { color: '#fff', fontSize: 14 },
  alertCard: { 
    backgroundColor: 'rgba(239,68,68,0.2)', 
    padding: 15, 
    borderRadius: 10, 
    width: '90%', 
    alignItems: 'center',
    marginTop: 10 
  },
  alertTitle: { color: '#EF4444', fontSize: 16, fontWeight: 'bold' },
  alertText: { color: '#fff', fontSize: 14 },
  backButton: { padding: 10, position: 'absolute', top: 40, left: 20, zIndex: 10 },
});