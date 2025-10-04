// // screens/OtpScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// import { auth, db } from '../firebaseConfig';
// import { doc, updateDoc } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function OtpScreen({ navigation, route }) {
//   const verificationId = route.params?.verificationId;
//   const [code, setCode] = useState('');
//   const roleDocId = route.params?.roleDocId || null;

//   const onConfirm = async () => {
//     try {
//       const credential = PhoneAuthProvider.credential(verificationId, code);
//       const userCredential = await signInWithCredential(auth, credential);

//       // link role doc to user
//       if (roleDocId) {
//         const ref = doc(db, 'selected_roles', roleDocId);
//         await updateDoc(ref, { uid: userCredential.user.uid, phone: userCredential.user.phoneNumber });
//       }

//       navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
//     } catch (err) {
//       console.log('OTP confirm error', err);
//       Alert.alert('Error verifying OTP', err.message || String(err));
//     }
//   };

//   return (
//     <LinearGradient colors={['#07060A', '#2B004C']} style={styles.container}>
//       <Text style={styles.title}>Verify your phone</Text>

//       <TextInput
//         placeholder="Enter OTP"
//         placeholderTextColor="#ccc"
//         style={styles.input}
//         keyboardType="number-pad"
//         value={code}
//         onChangeText={setCode}
//       />

//       <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
//         <Text style={{ color: '#fff' }}>Verify</Text>
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
//   title: { color: '#fff', fontSize: 20, marginBottom: 18 },
//   input: { width: '85%', padding: 12, borderRadius: 10, backgroundColor: '#121212', color: '#fff', marginBottom: 12 },
//   confirmBtn: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 24, backgroundColor: '#4a1ca0' }
// });










// screens/OtpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

export default function OtpScreen({ navigation, route }) {
  const [code, setCode] = useState('');
  const confirmation = route.params?.verification;
  const role = route.params?.role;
  const name = route.params?.name;

  const confirmCode = async () => {
    try {
      // some firebase responses return different shape; try to pick the verificationId
      const verificationId = confirmation?.verificationId || confirmation?._verificationId || confirmation?.verificationId;
      if (!verificationId) {
        Alert.alert('Error', 'Missing verification data.');
        return;
      }

      const credential = PhoneAuthProvider.credential(verificationId, code);
      const result = await signInWithCredential(auth, credential);

      // save user doc in Firestore with name and role
      const uid = result.user.uid;
      await setDoc(doc(db, 'users', uid), { name, role }, { merge: true });

      // update displayName on auth user if possible
      try {
        await updateProfile(result.user, { displayName: name });
      } catch (e) {
        // ignore if fails
      }

      navigation.replace('Home');
    } catch (err) {
      Alert.alert('OTP Error', err.message);
    }
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Text style={styles.h1}>Enter the OTP</Text>
      <TextInput
        placeholder="123456"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.button} onPress={confirmCode}>
        <LinearGradient colors={["#00E0FF", "#A020F0"]} style={styles.gradient}>
          <Text style={styles.btnText}>Verify</Text>
        </LinearGradient>
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
