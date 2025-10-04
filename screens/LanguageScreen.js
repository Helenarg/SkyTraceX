// // screens/LanguageScreen.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import GradientButton from '../components/GradientButton';

// export default function LanguageScreen({ navigation }) {
//   const languages = ['Sinhala', 'Tamil', 'English'];

//   return (
//     <LinearGradient colors={['#07060A', '#2B004C']} style={styles.container}>
//       <Text style={styles.title}>Select your language</Text>

//       {languages.map((l) => (
//         <TouchableOpacity
//           key={l}
//           style={styles.langBtn}
//           onPress={() => navigation.navigate('SelectRole')}
//         >
//           <Text style={styles.langText}>{l}</Text>
//         </TouchableOpacity>
//       ))}

//       <View style={{ marginTop: 30 }}>
//         <GradientButton onPress={() => navigation.navigate('SelectRole')}>
//           Continue
//         </GradientButton>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
//   title: { color: '#fff', fontSize: 20, marginBottom: 24 },
//   langBtn: {
//     borderColor: '#fff',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 36,
//     marginVertical: 8,
//     width: 220,
//     alignItems: 'center'
//   },
//   langText: { color: '#fff' }
// });







// // screens/LanguageScreen.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function LanguageScreen({ navigation }) {
//   return (
//     <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
//       <Text style={styles.title}>Select your language</Text>
//       <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SelectRole')}>
//         <Text style={styles.btnText}>Sinhala</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SelectRole')}>
//         <Text style={styles.btnText}>Tamil</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SelectRole')}>
//         <Text style={styles.btnText}>English</Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { color: '#fff', fontSize: 18, marginBottom: 20 },
//   btn: {
//     width: '70%', padding: 12, borderRadius: 12, marginVertical: 8, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center'
//   },
//   btnText: { color: '#fff' }
// });








import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LanguageScreen({ navigation }) {
  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <Text style={styles.title}>Select your language</Text>
      {["සිංහල", "தமிழ்", "English"].map((lang, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate("SelectRole")}
        >
          <Text style={styles.buttonText}>{lang}</Text>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, color: "#fff", marginBottom: 20 },
  button: {
    width: "70%",
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18 },
});
