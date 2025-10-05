// screens/roles/Farmer.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // For back button icon
import { AuthContext } from '../../context/AuthProvider';
import BottomNav from '../../components/BottomNav'; // Import BottomNav component
import WeatherConditionsCard from '../../components/WeatherConditionsCard'; // Import WeatherConditionsCard component
import { getUserLocation, fetchWeatherData, computeMetrics, predictFarmingConditions } from '../../services/WeatherService'; // Import WeatherService functions

export default function Farmer({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [farmingConditions, setFarmingConditions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.name) setName(userData.name);
    else if (user?.displayName) setName(user.displayName);

    const fetchWeather = async () => {
      try {
        const location = await getUserLocation(); // Get user's location
        if (location) {
          const data = await fetchWeatherData(location.lat, location.lon, userData?.role || 'farmer'); // Fetch weather data
          const processedData = computeMetrics(data, userData?.role || 'farmer'); // Process weather data
          const conditions = predictFarmingConditions(processedData); // Predict farming conditions
          setWeatherData({ ...processedData, location }); // Combine location and weather data
          setFarmingConditions(conditions); // Set farming conditions
          console.log("Fetched weather data:", processedData);
          console.log("Predicted farming conditions:", conditions);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [userData]);

  if (loading) {
    return (
      <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" style={styles.loading} />
      </LinearGradient>
    );
  }

  const locationName = weatherData?.location?.name || "Unknown Location";
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const condition = weatherData?.summary?.precip > 0.5 ? "Rainy Conditions" : "Good Conditions";
  const icon = weatherData?.summary?.precip > 0.5 ? "🌧️" : "☀️";
  
  const handlePress = () => {
    console.log("Weather conditions button pressed!");
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Weather Conditions Card */}
        <WeatherConditionsCard
          location={locationName}
          date={date}
          condition={condition}
          icon={icon}
          onPress={handlePress}
        />

        <Text style={styles.h1}>Welcome{ name ? `, ${name}` : '' }!</Text>

        {/* Today's Farming Conditions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Farming Conditions</Text>
          <Text style={styles.sectionSubtitle}>Weather probability affecting your crops</Text>
          
          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardValue}>{farmingConditions.droughtRisk}%</Text>
              <Text style={styles.cardLabel}>Drought Risk</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardValue}>{farmingConditions.floodRisk}%</Text>
              <Text style={styles.cardLabel}>Flood Risk</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardValue}>{farmingConditions.avgTemp}°C</Text>
              <Text style={styles.cardLabel}>Avg Temp</Text>
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
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 70 },
  scrollContainer: { alignItems: 'center', paddingTop: 50, paddingBottom: 20 },
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
  monthPhase: { color: '#ccc', fontSize: 12 },
  backButton: { padding: 10, position: 'absolute', top: 40, left: 20, zIndex: 10 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});