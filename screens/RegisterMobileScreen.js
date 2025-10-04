// // // screens/RegisterMobileScreen.js
// // import React, { useRef, useState } from 'react';
// // import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// // import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { auth, app } from '../firebase';
// // import { PhoneAuthProvider } from 'firebase/auth';

// // export default function RegisterMobileScreen({ navigation, route }) {
// //   const [phone, setPhone] = useState('');
// //   const [sending, setSending] = useState(false);
// //   const recaptchaVerifier = useRef(null);

// //   const onSend = async () => {
// //     if (!phone) return Alert.alert('Enter mobile number with country code, e.g. +9471xxxxxxx');

// //     try {
// //       setSending(true);
// //       // verifyPhoneNumber returns a verificationId on RN
// //       const verificationId = await PhoneAuthProvider.verifyPhoneNumber(auth, phone, recaptchaVerifier.current);
// //       setSending(false);
// //       navigation.navigate('OTP', { verificationId, phone, roleDocId: route.params?.roleDocId });
// //     } catch (err) {
// //       setSending(false);
// //       console.log(err);
// //       Alert.alert('Error sending OTP', err.message || JSON.stringify(err));
// //     }
// //   };

// //   return (
// //     <LinearGradient colors={['#07060A', '#2B004C']} style={styles.container}>
// //       <FirebaseRecaptchaVerifierModal
// //         ref={recaptchaVerifier}
// //         firebaseConfig={app.options}
// //       />

// //       <Text style={styles.title}>Create account (mobile)</Text>

// //       <TextInput
// //         placeholder="+94XXXXXXXXX"
// //         placeholderTextColor="#ccc"
// //         style={styles.input}
// //         value={phone}
// //         onChangeText={setPhone}
// //         keyboardType="phone-pad"
// //       />

// //       <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
// //         <Text style={{ color: '#fff' }}>{sending ? 'Sending...' : 'Send OTP'}</Text>
// //       </TouchableOpacity>

// //       <View style={{ position: 'absolute', top: 44, left: 16 }}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Text style={{ color: '#fff' }}>Back</Text>
// //         </TouchableOpacity>
// //       </View>

// //     </LinearGradient>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
// //   title: { color: '#fff', fontSize: 20, marginBottom: 16 },
// //   input: { width: '85%', padding: 12, borderRadius: 10, backgroundColor: '#121212', color: '#fff', marginBottom: 12 },
// //   sendBtn: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 24, backgroundColor: '#4a1ca0' }
// // });





// // RegisterMobileScreen.js
// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { getAuth, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
// import { db, firebaseConfig } from "../firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";

// export default function RegisterMobileScreen() {
//   const [name, setName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [verificationId, setVerificationId] = useState(null);
//   const [otp, setOtp] = useState("");

//   const recaptchaVerifier = React.useRef(null);
//   const auth = getAuth();
//   const navigation = useNavigation();

//   // Send OTP
//   const sendVerification = async () => {
//     try {
//       const phoneProvider = new PhoneAuthProvider(auth);
//       const id = await phoneProvider.verifyPhoneNumber(
//         phoneNumber,
//         recaptchaVerifier.current
//       );
//       setVerificationId(id);
//       Alert.alert("Verification code sent to your phone!");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   // Confirm OTP
//   const confirmCode = async () => {
//     try {
//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       const userCredential = await signInWithCredential(auth, credential);
//       const user = userCredential.user;

//       // Save user in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         name: name,
//         phone: phoneNumber,
//         role: null, // will be updated later
//       });

//       navigation.replace("SelectRoleScreen");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={firebaseConfig}
//       />

//       <Text style={styles.title}>Register with Mobile</Text>

//       <TextInput
//         placeholder="Enter your name"
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Enter phone number (+94...)"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//         style={styles.input}
//       />

//       {!verificationId ? (
//         <TouchableOpacity onPress={sendVerification}>
//           <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.button}>
//             <Text style={styles.buttonText}>Send OTP</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       ) : (
//         <>
//           <TextInput
//             placeholder="Enter OTP"
//             value={otp}
//             onChangeText={setOtp}
//             keyboardType="number-pad"
//             style={styles.input}
//           />
//           <TouchableOpacity onPress={confirmCode}>
//             <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.button}>
//               <Text style={styles.buttonText}>Confirm OTP</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </>
//       )}
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 20 },
//   input: {
//     backgroundColor: "white",
//     width: "80%",
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 8,
//   },
//   button: {
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//     alignItems: "center",
//     width: 200,
//   },
//   buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
// });















// screens/RegisterMobileScreen.js
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig, auth } from '../firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';

export default function RegisterMobileScreen({ navigation, route }) {
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const startPhoneAuth = async () => {
    if (!name || !phone) {
      Alert.alert('Missing', 'Please enter your name and phone number');
      return;
    }
    try {
      // phone must be in format +countrycode...
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier.current);
      // pass confirmation and name and role to OTP screen
      navigation.navigate('Otp', { verification: confirmation, role: route.params?.role, name });
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
      <Text style={styles.h1}>Register with mobile</Text>

      <TextInput
        placeholder="Full name"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="+94XXXXXXXXX"
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={startPhoneAuth}>
        <LinearGradient colors={["#00E0FF", "#A020F0"]} style={styles.gradient}>
          <Text style={styles.btnText}>Send OTP</Text>
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
