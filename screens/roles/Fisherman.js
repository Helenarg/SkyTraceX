// // screens/roles/Fisherman.js
// import React, { useContext, useEffect, useState } from 'react';
// import { Text, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AuthContext } from '../../context/AuthProvider';

// export default function Fisherman() {
//   const { user, userData } = useContext(AuthContext);
//   const [name, setName] = useState('');
//   useEffect(() => {
//     if (userData?.name) setName(userData.name);
//     else if (user?.displayName) setName(user.displayName);
//   }, [user, userData]);

//   return (
//     <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
//       <Text style={styles.text}>Welcome{ name ? `, ${name}` : '' }!</Text>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center'}, text: { color: '#fff', fontSize: 20 } });

// screens/roles/Fisherman.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthProvider';

export default function Fisherman({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [name, setName] = useState('');

  useEffect(() => {
    if (userData?.name) setName(userData.name);
    else if (user?.displayName) setName(user.displayName);
  }, [user, userData]);

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.h1}>Welcome{ name ? `, ${name}` : '' }!</Text>

        {/* Your Fishing Zone Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Fishing Zone</Text>
          
          <View style={styles.selectRow}>
            <TouchableOpacity style={styles.selectCard}>
              <Text style={styles.selectLabel}>Select Zone Area</Text>
              <Text style={styles.selectValue}>Gulf of Mannar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectCard}>
              <Text style={styles.selectLabel}>Boat Type</Text>
              <Text style={styles.selectValue}>Trawler</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Sea Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Sea Conditions</Text>
          
          <View style={styles.cardRow}>
            <View style={styles.conditionCard}>
              <Text style={styles.conditionIcon}>🌊</Text>
              <Text style={styles.conditionValue}>1.5m</Text>
              <Text style={styles.conditionLabel}>Wave Height</Text>
              <Text style={styles.conditionStatus}>Safe</Text>
            </View>
            <View style={styles.conditionCard}>
              <Text style={styles.conditionIcon}>🌬</Text>
              <Text style={styles.conditionValue}>25km/h</Text>
              <Text style={styles.conditionLabel}>Wind Speed</Text>
              <Text style={styles.conditionStatus}>Caution</Text>
            </View>
            <View style={styles.conditionCard}>
              <Text style={styles.conditionIcon}>⛈</Text>
              <Text style={styles.conditionValue}>30%</Text>
              <Text style={styles.conditionLabel}>Storm Risk</Text>
              <Text style={styles.conditionStatus}>Low</Text>
            </View>
            <View style={styles.conditionCard}>
              <Text style={styles.conditionIcon}>👁</Text>
              <Text style={styles.conditionValue}>8km</Text>
              <Text style={styles.conditionLabel}>Visibility</Text>
              <Text style={styles.conditionStatus}>Good</Text>
            </View>
          </View>
        </View>

        {/* Good Fishing Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Good Fishing Conditions</Text>
          <Text style={styles.sectionSubtitle}>Moderate wind conditions expected</Text>
          
          <View style={styles.safeCard}>
            <Text style={styles.safePercent}>85% Safe</Text>
            <Text style={styles.safeText}>Good within 10 nautical miles</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Weather Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Sea Conditions Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Weather Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Community</Text>
          </TouchableOpacity>
        </View>

        {/* Wind Advisory Alert */}
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>⚠️ Wind Advisory</Text>
          <Text style={styles.alertText}>25km/h expected this afternoon</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  alertText: { color: '#fff', fontSize: 14 }
});