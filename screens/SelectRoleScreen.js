// // screens/SelectRoleScreen.js
// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// export default function SelectRoleScreen({ navigation }) {
//   const roles = ["Farmer", "Fisherman", "General User"];

//   const handleSelect = (role) => {
//     if (role === "Farmer") {
//       navigation.navigate("RegisterMobile", { role: "Farmer" });
//     } else if (role === "Fisherman") {
//       navigation.navigate("RegisterMobile", { role: "Fisherman" });
//     } else if (role === "General User") {
//       navigation.navigate("SubRole");
//     }
//   };

//   return (
//     <LinearGradient colors={["#0A002E", "#3B007A"]} style={styles.container}>
//       <TouchableOpacity
//         style={styles.back}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={26} color="#fff" />
//       </TouchableOpacity>

//       <Text style={styles.title}>Select Your Role</Text>
//       {roles.map((role) => (
//         <TouchableOpacity
//           key={role}
//           style={styles.button}
//           onPress={() => handleSelect(role)}
//         >
//           <LinearGradient
//             colors={["#5A00C3", "#9B4DFF"]}
//             style={styles.buttonGradient}
//           >
//             <Text style={styles.text}>{role}</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       ))}
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   back: { position: "absolute", top: 60, left: 20 },
//   title: { color: "#fff", fontSize: 22, marginBottom: 30 },
//   button: { width: 220, marginVertical: 10, borderRadius: 20, overflow: "hidden" },
//   buttonGradient: { padding: 15, alignItems: "center" },
//   text: { color: "#fff", fontSize: 16 },
// });








// // screens/SelectRoleScreen.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function SelectRoleScreen({ navigation }) {

//   const onSelectRole = (role) => {
//     if (role === 'Farmer' || role === 'Fisherman') {
//       // go to mobile registration flow (as requested)
//       navigation.navigate('RegisterMobile', { role });
//     } else if (role === 'GeneralUser') {
//       navigation.navigate('SubRole', { role });
//     }
//   };

//   return (
//     <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
//       <Text style={styles.h1}>What describes you best?</Text>

//       <TouchableOpacity style={styles.card} onPress={() => onSelectRole('Farmer')}>
//         <Text style={styles.cardText}>Farmer</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card} onPress={() => onSelectRole('Fisherman')}>
//         <Text style={styles.cardText}>Fisherman</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card} onPress={() => onSelectRole('GeneralUser')}>
//         <Text style={styles.cardText}>General User</Text>
//       </TouchableOpacity>

//       <View style={{ marginTop: 20 }}>
//         <TouchableOpacity onPress={() => navigation.navigate('LoginEmail')}>
//           <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>Already have an account? Login</Text>
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', paddingTop: 50 },
//   h1: { color: '#fff', fontSize: 22, marginBottom: 20 },
//   card: { width: '80%', padding: 18, borderRadius: 14, marginVertical: 10, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center' },
//   cardText: { color: '#fff', fontSize: 16 }
// });














// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import { db } from "../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";

// const { width, height } = Dimensions.get("window");

// export default function SkyTraceWelcome() {
//   const [selectedRole, setSelectedRole] = useState("Farmer");
//   const [language, setLanguage] = useState("EN");
//   const navigation = useNavigation();

//   const handleContinue = async () => {
//     try {
//       // Save to Firestore
//       await addDoc(collection(db, "users"), {
//         role: selectedRole,
//         language: language,
//         createdAt: new Date(),
//       });
//     } catch (error) {
//       console.warn("Firestore save failed:", error);
//     }

//     // Navigate to SubRoleScreen if General User, else Home
//     if (selectedRole === "General") {
//       navigation.navigate("SubRoleScreen", { role: selectedRole, language });
//     } else {
//       navigation.navigate("Home", { role: selectedRole, language });
//     }
//   };

//   const roles = [
//     {
//       id: "Farmer",
//       title: "Farmer / ගොවියා / விவசாயி",
//       desc: "Weather insights for crop planning and agriculture",
//       icon: "🌱",
//     },
//     {
//       id: "Fisherman",
//       title: "Fisherman / මාළුව / மீனவர்",
//       desc: "Sea conditions and safety alerts for fishing",
//       icon: "🌊",
//     },
//     {
//       id: "General",
//       title: "General User / සාමාන්‍ය පරිශීලක / பொதுப் பயனர்",
//       desc: "Weather and astronomy for everyday life",
//       icon: "☁️",
//     },
//   ];

//   return (
//     <LinearGradient colors={["#0F172A", "#1E1B4B"]} style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <Text style={styles.logoText}>☁️ SkyTrace</Text>
//         <View style={styles.languageSwitch}>
//           {["EN", "සිං", "த"].map((lang) => (
//             <TouchableOpacity
//               key={lang}
//               style={[
//                 styles.langBtn,
//                 language === lang && styles.langBtnSelected,
//               ]}
//               onPress={() => setLanguage(lang)}
//             >
//               <Text
//                 style={[
//                   styles.langText,
//                   language === lang && styles.langTextSelected,
//                 ]}
//               >
//                 {lang}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Title */}
//       <Text style={styles.title}>Welcome to SkyTrace</Text>
//       <Text style={styles.subtitle}>
//         Select your primary use case to get specialized weather insights for Sri
//         Lanka
//       </Text>

//       {/* Role Cards */}
//       <ScrollView
//         style={{ width: "100%" }}
//         contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
//       >
//         {roles.map((role) => (
//           <TouchableOpacity
//             key={role.id}
//             style={[styles.card, selectedRole === role.id && styles.cardSelected]}
//             onPress={() => setSelectedRole(role.id)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.icon}>{role.icon}</Text>
//             <Text style={styles.cardTitle}>{role.title}</Text>
//             <Text style={styles.cardDesc}>{role.desc}</Text>
//             {selectedRole === role.id && (
//               <Text style={styles.selectedLabel}>Selected</Text>
//             )}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Continue Button */}
//       <TouchableOpacity style={styles.button} onPress={handleContinue}>
//         <LinearGradient
//           colors={["#00E0FF", "#A020F0"]}
//           style={styles.gradientBtn}
//         >
//           <Text style={styles.buttonText}>Continue</Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: width * 0.05,
//     paddingTop: height * 0.05,
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   topBar: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: height * 0.03,
//   },
//   logoText: {
//     fontSize: width * 0.06,
//     fontWeight: "bold",
//     color: "white",
//   },
//   languageSwitch: {
//     flexDirection: "row",
//     backgroundColor: "#1E293B",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   langBtn: { paddingVertical: 5, paddingHorizontal: 12 },
//   langBtnSelected: { backgroundColor: "#06B6D4" },
//   langText: { color: "#94A3B8", fontWeight: "600" },
//   langTextSelected: { color: "white" },
//   title: {
//     fontSize: width * 0.065,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     marginBottom: height * 0.01,
//   },
//   subtitle: {
//     fontSize: width * 0.035,
//     color: "#CBD5E1",
//     textAlign: "center",
//     marginBottom: height * 0.03,
//   },
//   card: {
//     backgroundColor: "#1E293B",
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//     borderRadius: 15,
//     marginBottom: 15,
//     alignItems: "center",
//     width: "100%",
//   },
//   cardSelected: {
//     borderWidth: 2,
//     borderColor: "#06B6D4",
//   },
//   icon: { fontSize: width * 0.08, marginBottom: 8 },
//   cardTitle: {
//     fontSize: width * 0.045,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     marginBottom: 6,
//   },
//   cardDesc: {
//     fontSize: width * 0.033,
//     color: "#94A3B8",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   selectedLabel: { fontSize: width * 0.032, color: "#06B6D4", fontWeight: "600" },
//   button: {
//     width: "100%",
//     marginTop: height * 0.02,
//     marginBottom: height * 0.03,
//   },
//   gradientBtn: { borderRadius: 12, paddingVertical: 14, alignItems: "center" },
//   buttonText: {
//     color: "white",
//     fontSize: width * 0.045,
//     fontWeight: "bold",
//   },
// });





// when they select "General User" it will navigate to "SubRoleScreen" instead of "Interests" screen after finishing the regsiter process.
// if they select "Farmer" or "Fisherman" it will navigate to "Fisherman.js or Farmer.js" screen after finishing the register process.








// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import { db } from "../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";

// const { width, height } = Dimensions.get("window");

// export default function SkyTraceWelcome() {
//   const [selectedRole, setSelectedRole] = useState("Farmer");
//   const [language, setLanguage] = useState("EN");
//   const navigation = useNavigation();

//   const handleContinue = async () => {
//     try {
//       // Save to Firestore
//       await addDoc(collection(db, "users"), {
//         role: selectedRole,
//         language: language,
//         createdAt: new Date(),
//       });
//     } catch (error) {
//       console.warn("Firestore save failed:", error);
//     }

//     // Navigate to SubRoleScreen if General User, else Home
//     if (selectedRole === "General") {
//       navigation.navigate("SubRoleScreen", { role: selectedRole, language });
//     } else {
//       navigation.navigate("Home", { role: selectedRole, language });
//     }
//   };

//   const roles = [
//     {
//       id: "Farmer",
//       title: "Farmer / ගොවියා / விவசாயி",
//       desc: "Weather insights for crop planning and agriculture",
//       icon: "🌱",
//     },
//     {
//       id: "Fisherman",
//       title: "Fisherman / මාළුව / மீனவர்",
//       desc: "Sea conditions and safety alerts for fishing",
//       icon: "🌊",
//     },
//     {
//       id: "General",
//       title: "General User / සාමාන්‍ය පරිශීලක / பொதுப் பயனர்",
//       desc: "Weather and astronomy for everyday life",
//       icon: "☁️",
//     },
//   ];

//   return (
//     <LinearGradient colors={["#0F172A", "#1E1B4B"]} style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <Text style={styles.logoText}>☁️ SkyTrace</Text>
//         <View style={styles.languageSwitch}>
//           {["EN", "සිං", "த"].map((lang) => (
//             <TouchableOpacity
//               key={lang}
//               style={[
//                 styles.langBtn,
//                 language === lang && styles.langBtnSelected,
//               ]}
//               onPress={() => setLanguage(lang)}
//             >
//               <Text
//                 style={[
//                   styles.langText,
//                   language === lang && styles.langTextSelected,
//                 ]}
//               >
//                 {lang}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Title */}
//       <Text style={styles.title}>Welcome to SkyTrace</Text>
//       <Text style={styles.subtitle}>
//         Select your primary use case to get specialized weather insights for Sri
//         Lanka
//       </Text>

//       {/* Role Cards */}
//       <ScrollView
//         style={{ width: "100%" }}
//         contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
//       >
//         {roles.map((role) => (
//           <TouchableOpacity
//             key={role.id}
//             style={[styles.card, selectedRole === role.id && styles.cardSelected]}
//             onPress={() => setSelectedRole(role.id)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.icon}>{role.icon}</Text>
//             <Text style={styles.cardTitle}>{role.title}</Text>
//             <Text style={styles.cardDesc}>{role.desc}</Text>
//             {selectedRole === role.id && (
//               <Text style={styles.selectedLabel}>Selected</Text>
//             )}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Continue Button */}
//       <TouchableOpacity style={styles.button} onPress={handleContinue}>
//         <LinearGradient
//           colors={["#00E0FF", "#A020F0"]}
//           style={styles.gradientBtn}
//         >
//           <Text style={styles.buttonText}>Continue</Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: width * 0.05,
//     paddingTop: height * 0.05,
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   topBar: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: height * 0.03,
//   },
//   logoText: {
//     fontSize: width * 0.06,
//     fontWeight: "bold",
//     color: "white",
//   },
//   languageSwitch: {
//     flexDirection: "row",
//     backgroundColor: "#1E293B",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   langBtn: { paddingVertical: 5, paddingHorizontal: 12 },
//   langBtnSelected: { backgroundColor: "#06B6D4" },
//   langText: { color: "#94A3B8", fontWeight: "600" },
//   langTextSelected: { color: "white" },
//   title: {
//     fontSize: width * 0.065,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     marginBottom: height * 0.01,
//   },
//   subtitle: {
//     fontSize: width * 0.035,
//     color: "#CBD5E1",
//     textAlign: "center",
//     marginBottom: height * 0.03,
//   },
//   card: {
//     backgroundColor: "#1E293B",
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//     borderRadius: 15,
//     marginBottom: 15,
//     alignItems: "center",
//     width: "100%",
//   },
//   cardSelected: {
//     borderWidth: 2,
//     borderColor: "#06B6D4",
//   },
//   icon: { fontSize: width * 0.08, marginBottom: 8 },
//   cardTitle: {
//     fontSize: width * 0.045,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     marginBottom: 6,
//   },
//   cardDesc: {
//     fontSize: width * 0.033,
//     color: "#94A3B8",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   selectedLabel: { fontSize: width * 0.032, color: "#06B6D4", fontWeight: "600" },
//   button: {
//     width: "100%",
//     marginTop: height * 0.02,
//     marginBottom: height * 0.03,
//   },
//   gradientBtn: { borderRadius: 12, paddingVertical: 14, alignItems: "center" },
//   buttonText: {
//     color: "white",
//     fontSize: width * 0.045,
//     fontWeight: "bold",
//   },
// });









// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Platform,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import { db } from "../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";

// const { width, height } = Dimensions.get("window");

// export default function SkyTraceWelcome() {
//   const [selectedRole, setSelectedRole] = useState("Farmer");
//   const [language, setLanguage] = useState("EN");
//   const navigation = useNavigation();

//   const handleContinue = async () => {
//     try {
//       // Save to Firestore
//       await addDoc(collection(db, "users"), {
//         role: selectedRole,
//         language: language,
//         createdAt: new Date(),
//       });
//     } catch (error) {
//       console.warn("Firestore save failed:", error);
//     }

//     // Navigate to SubRoleScreen if General User, else Home
//     if (selectedRole === "General") {
//       navigation.navigate("SubRoleScreen", { role: selectedRole, language });
//     } else {
//       navigation.navigate("Home", { role: selectedRole, language });
//     }
//   };

//   const roles = [
//     {
//       id: "Farmer",
//       title: "Farmer / ගොවියා / விவசாயி",
//       desc: "Weather insights for crop planning and agriculture",
//       icon: "🌱",
//     },
//     {
//       id: "Fisherman",
//       title: "Fisherman / මාළුව / மீனவர்",
//       desc: "Sea conditions and safety alerts for fishing",
//       icon: "🌊",
//     },
//     {
//       id: "General",
//       title: "General User / සාමාන්‍ය පරිශීලක / பொதுப் பயனர்",
//       desc: "Weather and astronomy for everyday life",
//       icon: "☁️",
//     },
//   ];

//   return (
//     <LinearGradient colors={["#0F172A", "#1E1B4B"]} style={styles.container}>
//       <View style={styles.contentWrapper}>
//         {/* Top Bar */}
//         <View style={styles.topBar}>
//           <Text style={styles.logoText}>☁️ SkyTrace</Text>
//           <View style={styles.languageSwitch}>
//             {["EN", "සිං", "த"].map((lang) => (
//               <TouchableOpacity
//                 key={lang}
//                 style={[
//                   styles.langBtn,
//                   language === lang && styles.langBtnSelected,
//                 ]}
//                 onPress={() => setLanguage(lang)}
//               >
//                 <Text
//                   style={[
//                     styles.langText,
//                     language === lang && styles.langTextSelected,
//                   ]}
//                 >
//                   {lang}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>Welcome to SkyTrace</Text>
//         <Text style={styles.subtitle}>
//           Select your primary use case to get specialized weather insights for
//           Sri Lanka
//         </Text>

//         {/* Role Cards */}
//         <ScrollView
//           style={{ width: "100%" }}
//           contentContainerStyle={{
//             alignItems: "center",
//             paddingBottom: Platform.OS === "web" ? 30 : 20,
//           }}
//         >
//           {roles.map((role) => (
//             <TouchableOpacity
//               key={role.id}
//               style={[
//                 styles.card,
//                 selectedRole === role.id && styles.cardSelected,
//               ]}
//               onPress={() => setSelectedRole(role.id)}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.icon}>{role.icon}</Text>
//               <Text style={styles.cardTitle}>{role.title}</Text>
//               <Text style={styles.cardDesc}>{role.desc}</Text>
//               {selectedRole === role.id && (
//                 <Text style={styles.selectedLabel}>Selected</Text>
//               )}
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Continue Button */}
//         <TouchableOpacity style={styles.button} onPress={handleContinue}>
//           <LinearGradient
//             colors={["#00E0FF", "#A020F0"]}
//             style={styles.gradientBtn}
//           >
//             <Text style={styles.buttonText}>Continue</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: width * 0.05,
//     paddingTop: Platform.OS === "web" ? 40 : height * 0.05,
//   },
//   contentWrapper: {
//     width: "100%",
//     maxWidth: 800, // Keeps layout centered on web
//     alignSelf: "center",
//   },
//   topBar: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: Platform.OS === "web" ? 25 : height * 0.03,
//   },
//   logoText: {
//     fontSize: width * 0.06,
//     fontWeight: "bold",
//     color: "white",
//   },
//   languageSwitch: {
//     flexDirection: "row",
//     backgroundColor: "#1E293B",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   langBtn: { paddingVertical: 5, paddingHorizontal: 12 },
//   langBtnSelected: { backgroundColor: "#06B6D4" },
//   langText: { color: "#94A3B8", fontWeight: "600" },
//   langTextSelected: { color: "white" },
//   title: {
//     fontSize: width * 0.065,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     marginBottom: Platform.OS === "web" ? 12 : height * 0.01,
//   },
//   subtitle: {
//     fontSize: width * 0.035,
//     color: "#CBD5E1",
//     textAlign: "center",
//     marginBottom: Platform.OS === "web" ? 30 : height * 0.03,
//   },
//   card: {
//     backgroundColor: "#1E293B",
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//     borderRadius: 15,
//     marginBottom: Platform.OS === "web" ? 20 : 15,
//     alignItems: "center",
//     width: "100%",
//   },
//   cardSelected: {
//     borderWidth: 2,
//     borderColor: "#06B6D4",
//   },
//   icon: { fontSize: width * 0.08, marginBottom: 8 },
//   cardTitle: {
//     fontSize: width * 0.045,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     marginBottom: 6,
//   },
//   cardDesc: {
//     fontSize: width * 0.033,
//     color: "#94A3B8",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   selectedLabel: {
//     fontSize: width * 0.032,
//     color: "#06B6D4",
//     fontWeight: "600",
//   },
//   button: {
//     width: "100%",
//     marginTop: Platform.OS === "web" ? 20 : height * 0.02,
//     marginBottom: Platform.OS === "web" ? 30 : height * 0.03,
//   },
//   gradientBtn: {
//     borderRadius: 12,
//     paddingVertical: 14,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: width * 0.045,
//     fontWeight: "bold",
//   },
// });











// screens/SelectRoleScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

export default function SelectRoleScreen() {
  const [selectedRole, setSelectedRole] = useState("Farmer");
  const [language, setLanguage] = useState("EN");
  const navigation = useNavigation();

  const roles = [
    {
      id: "Farmer",
      title: "Farmer / ගොවියා / விவசாயி",
      desc: "Weather insights for crop planning and agriculture",
      icon: "🌱",
    },
    {
      id: "Fisherman",
      title: "Fisherman / මාළුව / மீனவர்",
      desc: "Sea conditions and safety alerts for fishing",
      icon: "🌊",
    },
    {
      id: "General",
      title: "General User / සාමාන්‍ය පරිශීලක / பொதுப் பயனர்",
      desc: "Weather and astronomy for everyday life",
      icon: "☁️",
    },
  ];

  const handleContinue = async () => {
    try {
      // Save user to Firestore
      await addDoc(collection(db, "users"), {
        role: selectedRole,
        language: language,
        createdAt: new Date(),
      });
    } catch (error) {
      console.warn("Firestore save failed:", error);
    }

    // Navigate based on selected role
    switch (selectedRole) {
      case "General":
        navigation.navigate("SubRoleScreen", { role: selectedRole, language });
        break;
      case "Farmer":
        navigation.navigate("Farmer", { role: selectedRole, language });
        break;
      case "Fisherman":
        navigation.navigate("Fisherman", { role: selectedRole, language });
        break;
      default:
        navigation.navigate("Home", { role: selectedRole, language });
    }
  };

  return (
    <LinearGradient colors={["#0F172A", "#1E1B4B"]} style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.logoText}>☁️ SkyTrace</Text>
          <View style={styles.languageSwitch}>
            {["EN", "සිං", "த"].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.langBtn, language === lang && styles.langBtnSelected]}
                onPress={() => setLanguage(lang)}
              >
                <Text
                  style={[styles.langText, language === lang && styles.langTextSelected]}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome to SkyTrace</Text>
        <Text style={styles.subtitle}>
          Select your primary use case to get specialized weather insights for Sri Lanka
        </Text>

        {/* Role Cards */}
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: Platform.OS === "web" ? 30 : 20,
          }}
        >
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[styles.card, selectedRole === role.id && styles.cardSelected]}
              onPress={() => setSelectedRole(role.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.icon}>{role.icon}</Text>
              <Text style={styles.cardTitle}>{role.title}</Text>
              <Text style={styles.cardDesc}>{role.desc}</Text>
              {selectedRole === role.id && (
                <Text style={styles.selectedLabel}>Selected</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <LinearGradient
            colors={["#00E0FF", "#A020F0"]}
            style={styles.gradientBtn}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === "web" ? 40 : height * 0.05,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 800, // keeps layout centered on web
    alignSelf: "center",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Platform.OS === "web" ? 25 : height * 0.03,
  },
  logoText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "white",
  },
  languageSwitch: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 10,
    overflow: "hidden",
  },
  langBtn: { paddingVertical: 5, paddingHorizontal: 12 },
  langBtnSelected: { backgroundColor: "#06B6D4" },
  langText: { color: "#94A3B8", fontWeight: "600" },
  langTextSelected: { color: "white" },
  title: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: Platform.OS === "web" ? 12 : height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: Platform.OS === "web" ? 30 : height * 0.03,
  },
  card: {
    backgroundColor: "#1E293B",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: Platform.OS === "web" ? 20 : 15,
    alignItems: "center",
    width: "100%",
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#06B6D4",
  },
  icon: { fontSize: width * 0.08, marginBottom: 8 },
  cardTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: width * 0.033,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 8,
  },
  selectedLabel: {
    fontSize: width * 0.032,
    color: "#06B6D4",
    fontWeight: "600",
  },
  button: {
    width: "100%",
    marginTop: Platform.OS === "web" ? 20 : height * 0.02,
    marginBottom: Platform.OS === "web" ? 30 : height * 0.03,
  },
  gradientBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});

// can you help me with the following navigation?
// If the user selects "General User" it will navigate to "SubRoleScreen"  after finishing the register process .
// if they select "Farmer" or "Fisherman" it will navigate to "Farmer.js or Fisherman.js" screen after finishing the register process.