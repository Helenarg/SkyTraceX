// screens/roles/SkyForecast.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthProvider';

export default function SkyForecast({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [name, setName] = useState('');

  useEffect(() => {
    if (userData?.name) setName(userData.name);
    else if (user?.displayName) setName(user.displayName);
  }, [user, userData]);

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>Welcome{ name ? `, ${name}` : '' }!</Text>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sky Forecast</Text>
          <Text style={styles.headerSubtitle}>Current Location: Colombo, Sri Lanka</Text>
        </View>

        {/* Sky Visibility Index */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sky Visibility Index</Text>
          <Text style={styles.sectionSubtitle}>Real time conditions for astronomy and sky watching</Text>
          
          <View style={styles.cardRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>92%</Text>
              <Text style={styles.metricLabel}>Visibility</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>15%</Text>
              <Text style={styles.metricLabel}>Cloud Cover</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>88%</Text>
              <Text style={styles.metricLabel}>Moon Brightness</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>30%</Text>
              <Text style={styles.metricLabel}>Light Pollution</Text>
            </View>
          </View>

          <Text style={styles.conditionText}>Excellent conditions for stargazing and astrophotography</Text>
          <TouchableOpacity style={styles.helpBtn}>
            <Text style={styles.helpBtnText}>Need help with Sky?</Text>
          </TouchableOpacity>
        </View>

        {/* Weather Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colombo, Sri Lanka Conditions</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Precipitation</Text>
              <View style={[styles.bar, { width: '30%' }]} />
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Wind Speed</Text>
              <View style={[styles.bar, { width: '50%' }]} />
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Pressure</Text>
              <View style={[styles.bar, { width: '80%' }]} />
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Moon Phase</Text>
              <View style={[styles.bar, { width: '60%' }]} />
            </View>
          </View>

          <View style={styles.summaryBottom}>
            <Text style={styles.summaryValue}>28°C</Text>
            <Text style={styles.summaryValue}>72%</Text>
            <Text style={styles.summaryValue}>15 km/h</Text>
          </View>
        </View>

        {/* All Sky Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Sky Recommendations</Text>
          <Text style={styles.sectionSubtitle}>Personalized recommendations based on current conditions</Text>
          
          <View style={styles.recommendCard}>
            <Text style={styles.recommendTitle}>Deep Sky Photography</Text>
            <Text style={styles.recommendBar}>95%</Text>
            <Text style={styles.recommendTime}>Best time: 11:00 PM - 4:00 AM</Text>
          </View>

          <View style={styles.recommendCard}>
            <Text style={styles.recommendTitle}>Planetary Observation</Text>
            <Text style={styles.recommendBar}>85%</Text>
            <Text style={styles.recommendTime}>Best time: 10:00 PM - 2:00 AM</Text>
          </View>

          <View style={styles.recommendCard}>
            <Text style={styles.recommendTitle}>Meteor Watching</Text>
            <Text style={styles.recommendBar}>92%</Text>
            <Text style={styles.recommendTime}>Best time: 12:00 AM - 4:00 AM</Text>
          </View>
        </View>

        {/* Upcoming Astronomical Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Astronomical Events</Text>
          
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>Meteor Shower over your location</Text>
            <Text style={styles.eventDetail}>Visible with 60 meteors per hour</Text>
            <Text style={styles.eventTime}>Tonight 10:00 PM - 4:00 AM</Text>
            <TouchableOpacity style={styles.reminderBtn}>
              <Text style={styles.reminderBtnText}>Set Reminder</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>Jupiter Opposition</Text>
            <Text style={styles.eventDetail}>Closest to Earth</Text>
            <Text style={styles.eventTime}>Tomorrow 9:00 PM - 5:00 AM</Text>
            <TouchableOpacity style={styles.reminderBtn}>
              <Text style={styles.reminderBtnText}>Set Reminder</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>International Space Station</Text>
            <Text style={styles.eventDetail}>Bright pass over Colombo</Text>
            <Text style={styles.eventTime}>Sep 15 2:00 AM - 2:47 AM</Text>
            <TouchableOpacity style={styles.reminderBtn}>
              <Text style={styles.reminderBtnText}>Set Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Astrophotography Assistant */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Astrophotography Assistant</Text>
          <Text style={styles.sectionSubtitle}>AI photo analysis and detection</Text>
          
          <View style={styles.photoCard}>
            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadText}>Upload Photo</Text>
            </TouchableOpacity>
            <Text style={styles.chooseText}>Choose Mode</Text>
            <View style={styles.modeRow}>
              <TouchableOpacity style={styles.modeBtn}>
                <Text style={styles.modeText}>Best Milky Way</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modeBtn}>
                <Text style={styles.modeText}>Moon Phase</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.communityRow}>
            <View style={styles.communityCard}>
              <Text style={styles.communityTitle}>Recent Community Photos</Text>
              <View style={styles.placeholderImage} />
            </View>
            <View style={styles.communityCard}>
              <Text style={styles.communityTitle}>Moon Phase: New Moon</Text>
              <View style={styles.placeholderImage} />
            </View>
          </View>
        </View>

        {/* 30-Day Weather Forecast */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>30-Day Weather Forecast</Text>
          <Text style={styles.sectionSubtitle}>Colombo District</Text>
          
          <View style={styles.forecastGraph}>
            {/* Placeholder for graph - in real impl, use Recharts or similar */}
            <Text style={styles.graphPlaceholder}>[Monthly Forecast Graph]</Text>
          </View>
          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadBtnText}>Download Report</Text>
          </TouchableOpacity>
        </View>

        {/* AI Sky Learning Forecast */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colombo, Sri Lanka Forecast</Text>
          <Text style={styles.sectionSubtitle}>AI Learning forecast based on NASA Earth observation data</Text>
          
          <View style={styles.aiCardRow}>
            <View style={styles.aiCard}>
              <Text style={styles.aiLabel}>Very Wet</Text>
              <View style={[styles.aiBar, { width: '15%' }]} />
            </View>
            <View style={styles.aiCard}>
              <Text style={styles.aiLabel}>Very Dry</Text>
              <View style={[styles.aiBar, { width: '25%' }]} />
            </View>
          </View>
        </View>

        {/* Smart Planner */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Planner</Text>
          
          <View style={styles.plannerCard}>
            <Text style={styles.plannerTitle}>Best for Stargazing this week</Text>
            <Text style={styles.plannerTime}>9:00 PM - 12:00 AM, Low Sky</Text>
            <TouchableOpacity style={styles.targetBtn}>
              <Text style={styles.targetBtnText}>Target</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.plannerCard}>
            <Text style={styles.plannerTitle}>Perfect for Hiking</Text>
            <Text style={styles.plannerTime}>Sunset, comfortable temperature, light winds</Text>
            <TouchableOpacity style={styles.targetBtn}>
              <Text style={styles.targetBtnText}>Fri</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.plannerCard}>
            <Text style={styles.plannerTitle}>Good for Cloud Photography</Text>
            <Text style={styles.plannerTime}>1-2 hours post sunset</Text>
            <TouchableOpacity style={styles.targetBtn}>
              <Text style={styles.targetBtnText}>Sat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hourly Forecast */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hourly Forecast</Text>
          
          <View style={styles.hourlyRow}>
            <View style={styles.hourlyItem}>
              <Text style={styles.hourlyTime}>2 PM</Text>
              <Text style={styles.hourlyTemp}>72°</Text>
              <View style={[styles.hourlyCloud, { width: '20%' }]} />
            </View>
            <View style={styles.hourlyItem}>
              <Text style={styles.hourlyTime}>3 PM</Text>
              <Text style={styles.hourlyTemp}>74°</Text>
              <View style={[styles.hourlyCloud, { width: '30%' }]} />
            </View>
            {/* Add more hours as needed */}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionText}>Check Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionText}>View Sea Conditions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weather Alerts */}
        <View style={styles.alertSection}>
          <Text style={styles.sectionTitle}>Weather Alerts</Text>
          
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>Wind Advisory 15-35 mph with gusts up to 45 mph</Text>
            <Text style={styles.alertTime}>2:00 PM - 8:00 PM</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: 'center', paddingBottom: 20 },
  h1: { color: '#fff', fontSize: 22, marginTop: 50, marginBottom: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { color: '#ccc', fontSize: 14 },
  section: { width: '90%', marginBottom: 25 },
  sectionTitle: { color: '#fff', fontSize: 18, marginBottom: 8, textAlign: 'center' },
  sectionSubtitle: { color: '#ccc', fontSize: 14, marginBottom: 15, textAlign: 'center' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
  metricCard: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    width: '45%', 
    marginVertical: 5 
  },
  metricValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  metricLabel: { color: '#ccc', fontSize: 12 },
  conditionText: { color: '#10B981', fontSize: 14, textAlign: 'center', marginBottom: 10 },
  helpBtn: { 
    backgroundColor: 'rgba(0,224,255,0.2)', 
    padding: 10, 
    borderRadius: 10, 
    alignSelf: 'center' 
  },
  helpBtnText: { color: '#00E0FF', fontSize: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  summaryItem: { width: '22%', alignItems: 'center' },
  summaryLabel: { color: '#ccc', fontSize: 12, marginBottom: 5 },
  bar: { height: 4, backgroundColor: '#00E0FF', borderRadius: 2 },
  summaryBottom: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  recommendCard: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  recommendTitle: { color: '#fff', fontSize: 16, marginBottom: 5 },
  recommendBar: { color: '#00E0FF', fontSize: 14, marginBottom: 5 },
  recommendTime: { color: '#ccc', fontSize: 12 },
  eventCard: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  eventTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  eventDetail: { color: '#ccc', fontSize: 12, marginBottom: 5 },
  eventTime: { color: '#fff', fontSize: 12, marginBottom: 10 },
  reminderBtn: { 
    backgroundColor: 'rgba(0,224,255,0.2)', 
    padding: 8, 
    borderRadius: 5, 
    alignSelf: 'center' 
  },
  reminderBtnText: { color: '#00E0FF', fontSize: 12 },
  photoCard: { alignItems: 'center', marginBottom: 15 },
  uploadBtn: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 20, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  uploadText: { color: '#fff', fontSize: 16 },
  chooseText: { color: '#fff', fontSize: 14, marginBottom: 10 },
  modeRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  modeBtn: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 10, 
    borderRadius: 5, 
    width: '45%' 
  },
  modeText: { color: '#fff', fontSize: 14, textAlign: 'center' },
  communityRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  communityCard: { width: '45%', alignItems: 'center' },
  communityTitle: { color: '#fff', fontSize: 14, marginBottom: 10 },
  placeholderImage: { 
    width: 80, 
    height: 80, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 10 
  },
  forecastGraph: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 10 
  },
  graphPlaceholder: { color: '#ccc', fontSize: 14 },
  downloadBtn: { 
    backgroundColor: 'rgba(0,224,255,0.2)', 
    padding: 12, 
    borderRadius: 10, 
    alignSelf: 'center' 
  },
  downloadBtnText: { color: '#00E0FF', fontSize: 14 },
  aiCardRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
  aiCard: { width: '45%', marginVertical: 5 },
  aiLabel: { color: '#ccc', fontSize: 12, marginBottom: 5 },
  aiBar: { height: 8, backgroundColor: '#00E0FF', borderRadius: 4 },
  plannerCard: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  plannerTitle: { color: '#fff', fontSize: 16, marginBottom: 5 },
  plannerTime: { color: '#ccc', fontSize: 12, marginBottom: 10 },
  targetBtn: { 
    backgroundColor: 'rgba(0,224,255,0.2)', 
    padding: 6, 
    borderRadius: 5, 
    alignSelf: 'center' 
  },
  targetBtnText: { color: '#00E0FF', fontSize: 12 },
  hourlyRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
  hourlyItem: { width: '20%', alignItems: 'center', marginVertical: 5 },
  hourlyTime: { color: '#fff', fontSize: 12 },
  hourlyTemp: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  hourlyCloud: { height: 4, backgroundColor: '#ccc', borderRadius: 2, marginTop: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  actionCard: { 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 12, 
    borderRadius: 10, 
    width: '45%' 
  },
  actionText: { color: '#fff', fontSize: 14, textAlign: 'center' },
  alertSection: { width: '90%', marginBottom: 20 },
  alertCard: { 
    backgroundColor: 'rgba(239,68,68,0.2)', 
    padding: 15, 
    borderRadius: 10 
  },
  alertTitle: { color: '#EF4444', fontSize: 16, fontWeight: 'bold' },
  alertTime: { color: '#fff', fontSize: 14 }
});