// // screens/roles/Farmer.js
// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AuthContext } from '../../context/AuthProvider';

// export default function Farmer() {
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

// screens/roles/Farmer.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthProvider';

export default function Farmer({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [name, setName] = useState('');

  useEffect(() => {
    if (userData?.name) setName(userData.name);
    else if (user?.displayName) setName(user.displayName);
  }, [user, userData]);

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Text style={styles.h1}>Welcome{ name ? `, ${name}` : '' }!</Text>

      {/* Today's Farming Conditions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Farming Conditions</Text>
        <Text style={styles.sectionSubtitle}>Weather probability affecting your crops</Text>
        
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardValue}>65%</Text>
            <Text style={styles.cardLabel}>Tan</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>15%</Text>
            <Text style={styles.cardLabel}>Drought</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>25%</Text>
            <Text style={styles.cardLabel}>Flood</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardValue}>30°C</Text>
            <Text style={styles.cardLabel}>Temp</Text>
          </View>
        </View>
      </View>

      {/* Seasonal Rice Farming Calendar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seasonal Rice Farming</Text>
        
        <View style={styles.calendarRow}>
          <TouchableOpacity style={[styles.monthCard, { backgroundColor: '#10B981' }]}>
            <Text style={styles.monthLabel}>Oct</Text>
            <Text style={styles.monthPhase}>Plant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.monthCard, { backgroundColor: '#10B981' }]}>
            <Text style={styles.monthLabel}>Nov</Text>
            <Text style={styles.monthPhase}>Plant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.monthCard, { backgroundColor: '#84CC16' }]}>
            <Text style={styles.monthLabel}>Dec</Text>
            <Text style={styles.monthPhase}>Grow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.monthCard, { backgroundColor: '#84CC16' }]}>
            <Text style={styles.monthLabel}>Jan</Text>
            <Text style={styles.monthPhase}>Grow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.monthCard, { backgroundColor: '#D97706' }]}>
            <Text style={styles.monthLabel}>Feb</Text>
            <Text style={styles.monthPhase}>Harvest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.monthCard, { backgroundColor: '#D97706' }]}>
            <Text style={styles.monthLabel}>Mar</Text>
            <Text style={styles.monthPhase}>Harvest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50 },
  h1: { color: '#fff', fontSize: 22, marginBottom: 20 },
  section: { width: '90%', marginBottom: 30 },
  sectionTitle: { color: '#fff', fontSize: 18, marginBottom: 8, textAlign: 'center' },
  sectionSubtitle: { color: '#ccc', fontSize: 14, marginBottom: 15, textAlign: 'center' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
  card: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    width: '45%', 
    marginVertical: 5 
  },
  cardValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  cardLabel: { color: '#ccc', fontSize: 12 },
  calendarRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
  monthCard: { 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    width: '30%', 
    marginVertical: 5 
  },
  monthLabel: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  monthPhase: { color: '#ccc', fontSize: 12 }
});