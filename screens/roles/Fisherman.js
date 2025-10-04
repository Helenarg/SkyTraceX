// screens/roles/Fisherman.js
import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthProvider';

export default function Fisherman() {
  const { user, userData } = useContext(AuthContext);
  const [name, setName] = useState('');
  useEffect(() => {
    if (userData?.name) setName(userData.name);
    else if (user?.displayName) setName(user.displayName);
  }, [user, userData]);

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Text style={styles.text}>Welcome{ name ? `, ${name}` : '' }!</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center'}, text: { color: '#fff', fontSize: 20 } });
