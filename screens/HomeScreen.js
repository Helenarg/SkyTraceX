// screens/HomeScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthProvider';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user, userData, logout, setUserData } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [subrole, setSubrole] = useState('');
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [activities, setActivities] = useState([]);

  // Updated mock data to match screenshot styling (e.g., Very Hot with icon)
  const mockWeather = {
    temp: 30,
    condition: 'partly cloudy',
    precip: 20,
    location: 'Colombo, Sri Lanka',
    probabilities: [
      { label: 'Very Hot', percent: 15, color: '#FF6B6B', barColor: '#00E0FF', icon: 'thermometer-outline' },
      { label: 'Very Wet', percent: 25, color: '#4ECDC4', barColor: '#00E0FF', icon: 'water-outline' },
      { label: 'Very Windy', percent: 40, color: '#45B7D1', barColor: '#00E0FF', icon: 'cloudy-outline' }, // Replaced "windy-outline"
      { label: 'Very Uncomfortable', percent: 20, color: '#96CEB4', barColor: '#00E0FF', icon: 'sad-outline' },
    ],
    planner: [
      { title: 'Best Stargazing', desc: 'Clear skies, low humidity', day: 'Tonight' },
      { title: 'Perfect for Hiking', desc: '70% comfortable temperature, light winds', day: 'Friday' },
      { title: 'Good for Photography', desc: 'Interesting cloud formations, golden hour lighting', day: 'Saturday 3 PM' },
    ],
    hourly: [
      { time: '2 PM', temp: 28 },
      { time: '3 PM', temp: 30 },
      { time: '4 PM', temp: 31 },
      { time: '5 PM', temp: 29 },
      { time: '6 PM', temp: 27 },
    ],
    alerts: [
      { type: 'Wind Advisory', desc: '15-35 mph with gusts up to 45 mph', time: '2:00 PM - 6:00 PM' },
    ],
  };

  const mockActivities = [
    { icon: '🌾', title: 'Farmer Community shared harvest timing' },
    { icon: '⚓', title: 'Marine Safety issued storm warning for' },
    { icon: '🎣', title: 'Fishermen Network reports excellent catch in Negombo' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setName(data.name || user.displayName || 'User');
            setRole(data.role || '');
            setSubrole(data.subrole || '');
          }
          // Fetch recent activities from Firestore
          const activitiesSnapshot = await getDocs(collection(db, 'activities'));
          const activitiesList = activitiesSnapshot.docs.map(doc => doc.data());
          setActivities(activitiesList.length > 0 ? activitiesList : mockActivities);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
    // TODO: Fetch real weather data from Meteomatics via backend (e.g., cloud_cover:p for visibility index)
    // Parameters from PDF: t_2m:C, relative_humidity_2m:p, wind_speed_10m:ms, etc.
    // Compute: visibilityIndex = 100 - cloud_cover (or weighted)
    // For probabilities: Derive from NASA/ML models if integrated
    setWeatherData(mockWeather); // Use mock for now
  }, [user]);

  const handleChangeRole = () => {
    Alert.alert(
      'Change Role',
      'This will reset your current role and subrole. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: async () => {
            if (user) {
              try {
                const userDocRef = doc(db, 'users', user.uid);
                await updateDoc(userDocRef, { role: '', subrole: '' });
                setRole('');
                setSubrole('');
                setUserData({ ...userData, role: '', subrole: '' });
                navigation.navigate('SelectRole');
              } catch (error) {
                console.error('Error updating role:', error);
                Alert.alert('Error', 'Failed to update role. Please try again.');
              }
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Splash');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading || !weatherData) {
    return (
      <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
        <Text style={styles.loadingText}>Loading your home page...</Text>
      </LinearGradient>
    );
  }

  const renderProbability = ({ item }) => (
    <View style={styles.probRow}>
      <View style={styles.probIconContainer}>
        <Ionicons name={item.icon} size={20} color={item.color} />
        <Text style={[styles.probLabel, { color: item.color }]}>{item.label}</Text>
      </View>
      <View style={styles.probBarContainer}>
        <View style={[styles.probBar, { backgroundColor: item.barColor, width: `${item.percent}%` }]} />
      </View>
      <Text style={styles.probPercent}>{item.percent}%</Text>
    </View>
  );

  const renderPlanner = ({ item }) => (
    <View style={styles.plannerCard}>
      <Text style={styles.plannerTitle}>{item.title}</Text>
      <Text style={styles.plannerDesc}>{item.desc}</Text>
      <TouchableOpacity style={styles.plannerDay}>
        <Text style={styles.plannerDayText}>{item.day}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHourly = ({ item }) => (
    <View style={styles.hourlyItem}>
      <Text style={styles.hourlyTime}>{item.time}</Text>
      <Text style={styles.hourlyTemp}>{item.temp}°</Text>
    </View>
  );

  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <Text style={styles.activityIcon}>{item.icon}</Text>
      <Text style={styles.activityTitle}>{item.title}</Text>
    </View>
  );

  const renderAlert = ({ item }) => (
    <View style={styles.alertCard}>
      <Ionicons name="warning" size={20} color="#FFD700" />
      <Text style={styles.alertTitle}>{item.type} {item.desc}</Text>
      <Text style={styles.alertTime}>{item.time}</Text>
      <TouchableOpacity style={styles.alertButton}>
        <Text style={styles.alertButtonText}>View Sea Conditions</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      {/* Enhanced Header with Gradient Welcome */}
      <View style={styles.header}>
        <LinearGradient colors={['rgba(255,255,255,0.1)', 'transparent']} style={styles.headerGradient}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Hello {name},</Text>
            <Text style={styles.welcome}>welcome back!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileButton}>
            <Ionicons name="person-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.weatherHero}>
          <Text style={styles.weatherSummary}>
            Today in {weatherData.location}: {weatherData.temp}°C, {weatherData.condition}, {weatherData.precip}% chance of rain
          </Text>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationText}>{weatherData.location} 📍</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Probability Forecast</Text>
          <Text style={styles.sectionSubtitle}>Machine learning based on NASA Earth observation data</Text>
          <FlatList
            data={weatherData.probabilities}
            renderItem={renderProbability}
            keyExtractor={(item) => item.label}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Planner</Text>
          <Text style={styles.sectionSubtitle}>Best times for outdoor activities this week</Text>
          <FlatList
            data={weatherData.planner}
            renderItem={renderPlanner}
            keyExtractor={(item) => item.title}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hourly Forecast</Text>
          <FlatList
            data={weatherData.hourly}
            renderItem={renderHourly}
            keyExtractor={(item) => item.time}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity Report</Text>
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.title}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickButton}>
              <Text style={styles.quickButtonText}>Check Crop Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickButton}>
              <Text style={styles.quickButtonText}>View Sea Conditions</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.quickButtonFull}>
            <Text style={styles.quickButtonText}>Join Community</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather Alerts</Text>
          <FlatList
            data={weatherData.alerts}
            renderItem={renderAlert}
            keyExtractor={(item) => item.type}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Try Weather Command</Text>
          <Text style={styles.commandText}>What's the weather like? Or "What's up with this?"</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => { /* Already on Home */ }}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="stats-chart" size={24} color="#fff" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Community')}>
          <Ionicons name="people" size={24} color="#fff" />
          <Text style={styles.navText}>Community</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingBottom: 70, // Add extra padding to the bottom to avoid overlap with the navbar
  },
  header: { paddingHorizontal: 20, paddingTop: 50 },
  headerGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
  },
  backButton: { padding: 5 },
  headerContent: {
    alignItems: 'center',
    flex: 1,
  },
  greeting: { 
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  welcome: { 
    color: '#A0A0FF', 
    fontSize: 18, 
    fontStyle: 'italic',
    textAlign: 'center',
  },
  profileButton: { padding: 5 },
  weatherHero: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  weatherSummary: { 
    color: '#fff', 
    fontSize: 16, 
    textAlign: 'center',
    marginBottom: 10,
  },
  locationButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  locationText: { 
    color: '#ADD8E6', 
    fontSize: 14 
  },
  scrollContent: { 
    flex: 1, 
    paddingHorizontal: 20,
    paddingBottom: 70, // Ensure content doesn't overlap with the navbar
  },
  section: { marginBottom: 30 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  sectionSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 15 },
  probRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15, 
    backgroundColor: 'rgba(255,255,255,0.03)', 
    borderRadius: 12, 
    padding: 12 
  },
  probIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
  probIcon: { marginRight: 8 },
  probLabel: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '600',
    marginLeft: 8,
  },
  probBarContainer: { 
    flex: 1, 
    height: 6, 
    backgroundColor: 'rgba(0,224,255,0.2)', 
    borderRadius: 3, 
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  probBar: { 
    height: '100%', 
    borderRadius: 3,
  },
  probPercent: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
  plannerCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  plannerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  plannerDesc: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 10 },
  plannerDay: { 
    backgroundColor: '#4169E1', 
    borderRadius: 20, 
    paddingVertical: 5, 
    paddingHorizontal: 15, 
    alignSelf: 'flex-end' 
  },
  plannerDayText: { color: '#fff', fontSize: 14 },
  hourlyItem: { alignItems: 'center', marginRight: 20 },
  hourlyTime: { color: '#fff', fontSize: 14 },
  hourlyTemp: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  activityIcon: { fontSize: 20, marginRight: 10 },
  activityTitle: { color: '#fff', fontSize: 14 },
  quickActionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  quickButton: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    borderRadius: 10, 
    padding: 15, 
    flex: 0.48, 
    alignItems: 'center' 
  },
  quickButtonFull: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    borderRadius: 10, 
    padding: 15, 
    alignItems: 'center', 
    marginTop: 10 
  },
  quickButtonText: { color: '#fff', fontSize: 14 },
  alertCard: {
    backgroundColor: 'rgba(255,0,0,0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  alertTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  alertTime: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 10 },
  alertButton: { 
    backgroundColor: '#8B0000', 
    borderRadius: 5, 
    padding: 5, 
    alignSelf: 'flex-start' 
  },
  alertButtonText: { color: '#fff', fontSize: 12 },
  commandText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.37)', // Transparent dark background for the navbar
  },
  navItem: { alignItems: 'center' },
  navText: { color: '#fff', fontSize: 12, marginTop: 5 },
  loadingText: { color: '#fff', fontSize: 16, textAlign: 'center', flex: 1, justifyContent: 'center' },
});