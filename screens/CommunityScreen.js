// screens/CommunityScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthProvider';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const { width } = Dimensions.get('window');

export default function CommunityScreen({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock stats - replace with Firestore query if needed
  const stats = [
    { label: 'Members', value: '12.8K', color: '#00E0FF' },
    { label: 'Posts', value: '2.3K', color: '#4ECDC4' },
    { label: 'Groups', value: '1.8K', color: '#45B7D1' },
    { label: 'Events', value: '12', color: '#96CEB4' },
  ];

  // Mock data for tabs
  const mockGroups = [
    { id: 1, name: 'Negombo Farmers Alliance', desc: '155 members in Negombo', status: 'New', icon: '🌾', members: 155, time: 'Tomorrow looks great for harvesting' },
    { id: 2, name: 'West Coast Fishermen', desc: '80 members', status: 'Active', icon: '⚓', members: 80, time: 'Storm warning for tomorrow morning', updated: '30 min ago' },
    { id: 3, name: 'Sri Lankan Weather Enthusiasts LK', desc: '234 members', status: '', icon: '☁️', members: 234, time: 'Amazing sunset photos yesterday' },
  ];

  const mockEvents = [
    { id: 1, name: 'Workshop on Preseason Farming Techniques and Crop Protection Strategies', desc: 'About monsoon preparation', time: '07/10/2025 @ 2:30 PM', location: 'Negombo Community Center', attendees: 15 },
    { id: 2, name: 'Safety Equipment Check for Fish Processing', desc: 'Safety briefing', time: '08/10/2025 @ 10:00 AM', location: 'Negombo Fish Market', attendees: 20 },
  ];

  const mockEmergencies = [
    { id: 1, name: 'Storm Warning', desc: 'Medium risk along Chilaw coast. Fishermen advised to avoid deep sea beyond 10 miles', time: 'View Details', share: 'Share Alert' },
    { id: 2, name: 'Heavy Rain Advisory', desc: 'Heavy rains expected in central regions. Consider delaying harvest activities and securing crops', time: 'View Details', share: 'Share Alert' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          setName(userData.name || user.displayName || 'User');
          // Fetch real data from Firestore collections: 'groups', 'events', 'emergencies'
          // Example for groups:
          // const groupsSnapshot = await getDocs(collection(db, 'groups'));
          // setGroups(groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          setGroups(mockGroups);
          setEvents(mockEvents);
          setEmergencies(mockEmergencies);
        } catch (error) {
          console.error('Error fetching community data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEmergencies = emergencies.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
        <Text style={styles.loadingText}>Loading community...</Text>
      </LinearGradient>
    );
  }

  const renderStat = ({ item }) => (
    <View style={[styles.statCard, { borderColor: item.color }]}>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statLabel}>{item.label}</Text>
    </View>
  );

  const renderGroup = ({ item }) => (
    <TouchableOpacity style={styles.groupCard}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupIcon}>{item.icon}</Text>
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.groupDesc}>{item.desc}</Text>
        </View>
        {item.status && <View style={styles.statusBadge}><Text style={styles.statusText}>{item.status}</Text></View>}
      </View>
      <Text style={styles.groupTime}>{item.time}</Text>
      {item.updated && <Text style={styles.groupUpdated}>{item.updated}</Text>}
    </TouchableOpacity>
  );

  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDesc}>{item.desc}</Text>
      <View style={styles.eventFooter}>
        <Text style={styles.eventTime}>{item.time}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <Text style={styles.eventAttendees}>{item.attendees} attending</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmergency = ({ item }) => (
    <View style={styles.emergencyCard}>
      <Text style={styles.emergencyName}>{item.name}</Text>
      <Text style={styles.emergencyDesc}>{item.desc}</Text>
      <View style={styles.emergencyButtons}>
        <TouchableOpacity style={styles.emergencyButton}><Text style={styles.emergencyButtonText}>{item.time}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.emergencyButton}><Text style={styles.emergencyButtonText}>{item.share}</Text></TouchableOpacity>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'groups':
        return (
          <FlatList
            data={filteredGroups}
            renderItem={renderGroup}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.tabContentList}
          />
        );
      case 'events':
        return (
          <FlatList
            data={filteredEvents}
            renderItem={renderEvent}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.tabContentList}
          />
        );
      case 'emergency':
        return (
          <FlatList
            data={filteredEmergencies}
            renderItem={renderEmergency}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.tabContentList}
          />
        );
      case 'chat':
        return (
          <View style={styles.chatPlaceholder}>
            <Ionicons name="chatbubble-outline" size={80} color="rgba(255,255,255,0.3)" />
            <Text style={styles.chatText}>Chat features coming soon!</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <LinearGradient
                colors={['rgba(255,255,255,0.1)', 'transparent']}
                style={styles.headerGradient}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
                  <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                  <Text style={styles.greeting}>SKYTRACE Community</Text>
                  <Text style={styles.subtitle}>
                    Connect, share & learn with weather-focused farmers, fishers &
                    researchers
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={styles.profileButton}
                >
                  <Ionicons name="person-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </LinearGradient>
              <FlatList
                data={stats}
                renderItem={renderStat}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.statsContainer}
              />
            </View>

            {/* Community Hub */}
            <View style={styles.hubSection}>
              <Text style={styles.hubTitle}>Community Hub</Text>
              <View style={styles.hubButtons}>
                <TouchableOpacity style={styles.createButton}>
                  <Text style={styles.createButtonText}>Create Group</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.emergencyHubButton}
                  onPress={() => setActiveTab('emergency')}
                >
                  <Ionicons name="warning" size={16} color="#fff" />
                  <Text style={styles.emergencyHubText}>Emergency</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Tab Bar */}
            <View style={styles.tabBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search groups..."
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <View style={styles.tabButtons}>
                {['groups', 'events', 'emergency', 'chat'].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.tabButton,
                      activeTab === tab && styles.activeTabButton,
                    ]}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === tab && styles.activeTabText,
                      ]}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Text>
                    {activeTab === tab && <View style={styles.tabUnderline} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        }
        renderItem={null} // No data for the main FlatList
        ListFooterComponent={
          <View style={styles.contentSection}>{renderTabContent()}</View>
        }
      />
      <View style={styles.bottomNavbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="stats-chart" size={24} color="#fff" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            /* Already on Community */
          }}
        >
          <Ionicons name="people" size={24} color="#fff" />
          <Text style={styles.navText}>Community</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 50 },
  headerGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  backButton: { padding: 5 },
  headerContent: { alignItems: 'center', flex: 1 },
  greeting: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 14, textAlign: 'center', marginTop: 5 },
  profileButton: { padding: 5 },
  statsContainer: { paddingVertical: 10 },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    borderWidth: 1,
    minWidth: 70,
  },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  mainContent: { flex: 1, paddingHorizontal: 20 },
  hubSection: { marginBottom: 20 },
  hubTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  hubButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  createButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  createButtonText: { color: '#fff', fontSize: 14 },
  emergencyHubButton: {
    backgroundColor: '#FF4444',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyHubText: { color: '#fff', fontSize: 14, marginLeft: 5 },
  tabBar: { marginBottom: 20 },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
  },
  tabButtons: { flexDirection: 'row', justifyContent: 'space-around' },
  tabButton: { paddingVertical: 10 },
  activeTabButton: { },
  tabText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  tabUnderline: { height: 2, backgroundColor: '#00E0FF', alignSelf: 'center', marginTop: 5, width: 30 },
  contentSection: { flex: 1 },
  tabContentList: { flex: 1 },
  groupCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  groupHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  groupIcon: { fontSize: 24, marginRight: 10 },
  groupInfo: { flex: 1 },
  groupName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  groupDesc: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  statusBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: { color: '#fff', fontSize: 12 },
  groupTime: { color: '#fff', fontSize: 14 },
  groupUpdated: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  eventCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  eventName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  eventDesc: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 10 },
  eventFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventTime: { color: '#fff', fontSize: 14 },
  eventLocation: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  eventAttendees: { color: '#00E0FF', fontSize: 14, fontWeight: 'bold' },
  emergencyCard: {
    backgroundColor: 'rgba(255,68,68,0.2)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  emergencyName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  emergencyDesc: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 10 },
  emergencyButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  emergencyButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  emergencyButtonText: { color: '#fff', fontSize: 12 },
  chatPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  chatText: { color: 'rgba(255,255,255,0.7)', fontSize: 16, marginTop: 10 },
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
  },
  navItem: { alignItems: 'center' },
  navText: { color: '#fff', fontSize: 12, marginTop: 5 },
  loadingText: { color: '#fff', fontSize: 16, textAlign: 'center', flex: 1, justifyContent: 'center' },
});