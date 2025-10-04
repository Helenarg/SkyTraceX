// // screens/LoginEmailScreen.js
// import React, { useState } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from './firebaseConfig';

// export default function LoginEmailScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const login = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
//     } catch (err) {
//       console.log(err);
//       Alert.alert('Login failed', err.message || 'Could not login.');
//     }
//   };

//   return (
//     <LinearGradient colors={['#07060A', '#2B004C']} style={styles.container}>
//       <Image source={require('../assets/logo.png')} style={styles.logo} />
//       <Text style={styles.title}>Login</Text>

//       <TextInput placeholder="Email" placeholderTextColor="#ccc" style={styles.input} value={email} onChangeText={setEmail} />
//       <TextInput placeholder="Password" placeholderTextColor="#ccc" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

//       <TouchableOpacity style={styles.loginBtn} onPress={login}>
//         <Text style={{ color: '#fff' }}>Log in</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('RegisterEmail')} style={{ marginTop: 12 }}>
//         <Text style={{ color: '#fff' }}>Don't have an account? Register</Text>
//       </TouchableOpacity>

//       <View style={{ position: 'absolute', top: 44, left: 16 }}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={{ color: '#fff' }}>Back</Text>
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
//   logo: { width: 100, height: 100, marginBottom: 14, resizeMode: 'contain' },
//   title: { color: '#fff', fontSize: 20, marginBottom: 10 },
//   input: { width: '85%', padding: 12, borderRadius: 10, backgroundColor: '#121212', color: '#fff', marginBottom: 12 },
//   loginBtn: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 24, backgroundColor: '#4a1ca0' }
// });














// screens/LoginEmailScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthProvider';

export default function LoginEmailScreen({ navigation }) {
  const { loginWithEmail } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (!email || !password) {
      Alert.alert('Missing', 'Please enter email and password');
      return;
    }
    try {
      await loginWithEmail(email, password);
      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Login Error', err.message);
    }
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Image source={require('../assets/Team SkyTrace.png')} style={{ width: 100, height: 100, marginBottom: 20 }} />
      <Text style={styles.h1}>Login</Text>
      <TextInput placeholder="Email" placeholderTextColor="rgba(255,255,255,0.5)" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" placeholderTextColor="rgba(255,255,255,0.5)" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={submit}>
        <LinearGradient colors={["#00E0FF", "#A020F0"]} style={styles.gradient}>
          <Text style={styles.btnText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigation.navigate('RegisterEmail')}>
        <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  h1: { color: '#fff', fontSize: 18, marginBottom: 20 },
  input: { width: '80%', padding: 12, borderRadius: 10, marginBottom: 12, backgroundColor: 'rgba(255,255,255,0.04)', color: '#fff' },
  button: { width: '80%', borderRadius: 30, overflow: 'hidden' },
  gradient: { padding: 12, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: '700' }
});
