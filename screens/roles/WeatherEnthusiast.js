// screens/roles/WeatherEnthusiast.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WeatherEnthusiast({ route, navigation }) {
  const role = route.params?.role || 'Weather Enthusiast';
  const roleDocId = route.params?.roleDocId || null;

  const confirmRole = async () => {
    // If a pre-saved role doc exists, mark it confirmed (will be linked later on signup)
    try {
      if (roleDocId) {
        const ref = doc(db, 'selected_roles', roleDocId);
        await updateDoc(ref, { confirmed: true });
      }
    } catch (err) {
      console.log('Error confirming role', err);
    }
    // Navigate to registration (not farmers/fishermen -> email)
    navigation.navigate('RegisterEmail', { roleDocId });
  };

  return (
    <LinearGradient colors={['#07060A', '#2B004C']} style={styles.container}>
      <Text style={styles.title}>Welcome {role}</Text>

      <Text style={styles.info}>You'll get curated weather content as a {role}.</Text>

      <TouchableOpacity style={styles.confirmBtn} onPress={confirmRole}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Continue</Text>
      </TouchableOpacity>

      <View style={{ position: 'absolute', top: 44, left: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#fff' }}>Back</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { color: '#fff', fontSize: 24, marginBottom: 16 },
  info: { color: '#ddd', textAlign: 'center', marginBottom: 30 },
  confirmBtn: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
    backgroundColor: '#4a1ca0'
  }
});
