// // screens/SubRoleScreen.js
// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// export default function SubRoleScreen({ navigation }) {
//   const subRoles = [
//     { name: "Weather Enthusiast", page: "WeatherEnthusiast" },
//     { name: "Professional Forecaster", page: "Forecaster" },
//     { name: "Outdoor Activities", page: "OutdoorActivities" },
//     { name: "Stargazer", page: "Stargazer" },
//   ];

//   const handleSelect = (role, page) => {
//     // Navigate to RegisterEmail with role
//     navigation.navigate("RegisterEmail", { role, nextPage: page });
//   };

//   return (
//     <LinearGradient colors={["#0A002E", "#3B007A"]} style={styles.container}>
//       <TouchableOpacity
//         style={styles.back}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={26} color="#fff" />
//       </TouchableOpacity>

//       <Text style={styles.title}>Choose Your Category</Text>
//       {subRoles.map((r) => (
//         <TouchableOpacity
//           key={r.name}
//           style={styles.button}
//           onPress={() => handleSelect(r.name, r.page)}
//         >
//           <LinearGradient
//             colors={["#5A00C3", "#9B4DFF"]}
//             style={styles.buttonGradient}
//           >
//             <Text style={styles.text}>{r.name}</Text>
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
//   button: { width: 250, marginVertical: 10, borderRadius: 20, overflow: "hidden" },
//   buttonGradient: { padding: 15, alignItems: "center" },
//   text: { color: "#fff", fontSize: 16 },
// });















// screens/SubRoleScreen.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function SubRoleScreen({ navigation, route }) {
//   const { role } = route.params || {};

//   const onSelect = (subrole) => {
//     // for general users we default to email registration
//     navigation.navigate('RegisterEmail', { role, subrole });
//   };

//   return (
//     <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
//       <Text style={styles.h1}>What interests you most?</Text>

//       <TouchableOpacity style={styles.card} onPress={() => onSelect('Weather Enthusiast')}>
//         <Text style={styles.cardText}>Weather Enthusiast</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card} onPress={() => onSelect('Professional Forecaster')}>
//         <Text style={styles.cardText}>Professional Forecaster</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card} onPress={() => onSelect('Outdoor Activities')}>
//         <Text style={styles.cardText}>Outdoor Activities</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card} onPress={() => onSelect('Stargazers')}>
//         <Text style={styles.cardText}>Stargazers</Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', paddingTop: 50 },
//   h1: { color: '#fff', fontSize: 18, marginBottom: 25 },
//   card: { width: '80%', padding: 18, borderRadius: 14, marginVertical: 10, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center' },
//   cardText: { color: '#fff', fontSize: 15 }
// });






// if the user select (Weather Enthusiast, Professional Forecaster, Outdoor Activities, Stargazers) we navigate to RegisterEmail with role after that it will redirect to the relevant page (WeatherEnthusiast, Forecaster, OutdoorActivities, Stargazer)









// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function SubRoleScreen({ navigation, route }) {
//   const { role } = route.params || {};

//   const onSelect = (subrole) => {
//     // Navigate to RegisterEmail with both role and subrole
//     navigation.navigate('RegisterEmail', { role, subrole });
//   };

//   return (
//     <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
//       <Text style={styles.h1}>What interests you most?</Text>

//       <TouchableOpacity style={styles.card} onPress={() => onSelect('Weather Enthusiast')}>
//         <Text style={styles.cardText}>Weather Enthusiast</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card} onPress={() => onSelect('Professional Forecaster')}>
//         <Text style={styles.cardText}>Professional Forecaster</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card} onPress={() => onSelect('Outdoor Activities')}>
//         <Text style={styles.cardText}>Outdoor Activities</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.card} onPress={() => onSelect('Stargazers')}>
//         <Text style={styles.cardText}>Stargazers</Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', paddingTop: 50 },
//   h1: { color: '#fff', fontSize: 18, marginBottom: 25 },
//   card: { width: '80%', padding: 18, borderRadius: 14, marginVertical: 10, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center' },
//   cardText: { color: '#fff', fontSize: 15 }
// });







import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SubRoleScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get role + language from previous screen
  const { role, language } = route.params || {};

  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { id: "weather", title: "🌦️ Weather Updates" },
    { id: "farming", title: "🌾 Farming Tips" },
    { id: "market", title: "💰 Market Prices" },
    { id: "community", title: "👥 Farmer Community" },
    { id: "ai", title: "🤖 Agriculture AI Assistant" },
  ];

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleContinue = () => {
    if (selectedInterests.length === 0) {
      Alert.alert("Please select at least one interest");
      return;
    }
    navigation.replace("SelectRoleScreen", {
      role,
      language,
      interests: selectedInterests,
    });
  };

  return (
    <LinearGradient colors={["#0F172A", "#1E1B4B"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose Your Interests</Text>
        <Text style={styles.subtitle}>
          Select what you’d like to see on your {role} dashboard
        </Text>

        <View style={styles.cardContainer}>
          {interests.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                selectedInterests.includes(item.id) && styles.cardSelected,
              ]}
              onPress={() => toggleInterest(item.id)}
            >
              <Text
                style={[
                  styles.cardText,
                  selectedInterests.includes(item.id) && styles.cardTextSelected,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <LinearGradient colors={["#00E0FF", "#A020F0"]} style={styles.gradientBtn}>
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16, // ✅ mobile-friendly horizontal padding
    paddingTop: 30, // ✅ spacing from top
    paddingBottom: 50, // ✅ bottom padding to avoid cutoff
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  cardContainer: { marginTop: 10 },
  card: {
    backgroundColor: "#1E293B",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#06B6D4",
    backgroundColor: "#334155",
  },
  cardText: { color: "#CBD5E1", fontSize: 15, textAlign: "center" },
  cardTextSelected: { color: "white", fontWeight: "600" },
  button: { marginTop: 30, marginBottom: 20 }, // ✅ better mobile spacing
  gradientBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
