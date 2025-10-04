// // screens/SplashScreen.js
// import React, { useEffect } from 'react';
// import { View, Image, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { auth } from '../firebase';

// export default function SplashScreen({ navigation }) {
//   useEffect(() => {
//     const goNext = () => {
//       const user = auth.currentUser;
//       if (user) {
//         navigation.replace('Home');
//       } else {
//         navigation.replace('Language');
//       }
//     };
//     const t = setTimeout(goNext, 1600);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <LinearGradient colors={['#07060A', '#2B004C']} style={styles.container}>
//       <Image source={require('../assets/Team SkyTrace.png')} style={styles.logo} />
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   logo: { width: 140, height: 140, resizeMode: 'contain' }
// });






// // screens/SplashScreen.js
// import React, { useEffect } from "react";
// import { View, Image, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebaseConfig"; // ✅ make sure this matches your actual file name (firebaseConfig.js)

// // ✅ SplashScreen Component
// export default function SplashScreen({ navigation }) {
//   useEffect(() => {
//     // Check Firebase authentication state
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         navigation.replace("Home");
//       } else {
//         navigation.replace("Language");
//       }
//     });

//     // Cleanup on unmount
//     return () => unsubscribe();
//   }, []);

//   return (
//     <LinearGradient
//       colors={["#07060A", "#2B004C"]}
//       style={styles.container}
//     >
//       <Image
//         source={require("../assets/Team SkyTrace.png")} // ✅ ensure file name has no spaces
//         style={styles.logo}
//       />
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logo: {
//     width: 140,
//     height: 140,
//     resizeMode: "contain",
//   },
// });






// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Language');
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Image source={require('../assets/Team SkyTrace.png')} style={styles.logo} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 300, height: 300, resizeMode: 'contain' }
});
