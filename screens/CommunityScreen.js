// screens/CommunityHubScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav'; // Import BottomNav component

export default function CommunityHubScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('groups');

  const stats = [
    { label: 'Members', value: '12.8k' },
    { label: 'Events', value: '2.1k' },
    { label: 'Groups', value: '1.8k' },
    { label: 'Chat', value: '12' },
  ];

  const groups = [
    { id: 1, name: 'Negombo Farmers Alliance', status: 'Active', members: '155 members', desc: 'Tomorrow looks great for harvesting', badge: true },
    { id: 2, name: 'West Coast Fishermen', status: 'Active', members: '80 members', desc: 'Storms warning for tomorrow morning', badge: false },
    { id: 3, name: 'Sri Lankan Weather Tracking Community', status: 'Active', members: '234 members', desc: 'Amazing sunset photos yesterday', badge: false },
  ];

  const events = [
    { id: 1, name: 'Workshop on Modern Farming Techniques and Crop Protection Strategies', time: '07/10/2025 02:17 PM', location: 'Negombo Community Center', attendees: '30 attending' },
    { id: 2, name: 'Safety Equipment Check for All Fishing Vessels', time: '08/10/2025 10:47 AM', location: 'Dumping Harbor', attendees: '15 attending' },
  ];

  const emergencies = [
    { id: 1, title: 'Storm Warning', desc: 'Moderate storms, medium risk. Negombo to Chilaw coastal areas. Fishermen advised to avoid deep sea beyond 10 miles', severity: 'high', type: 'Storm' },
    { id: 2, title: 'Heavy Rain Advisory', desc: 'Heavy rains expected in central farming regions. Consider delaying harvesting activities and securing crops', severity: 'medium', type: 'Rain' },
  ];

  const chats = [
    { id: 1, name: 'General Weather Chat', lastMsg: 'User: Great day ahead!', time: '2 min ago', unread: 3 },
    { id: 2, name: 'Farmer Support Group', lastMsg: 'Admin: New tips shared', time: '10 min ago', unread: 0 },
    { id: 3, name: 'Emergency Alerts', lastMsg: 'System: Storm update', time: '1 hour ago', unread: 1 },
  ];

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      {['groups', 'events', 'emergency', 'chat'].map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
          {activeTab === tab && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderGroups = () => (
    <ScrollView style={[styles.content, { marginBottom: 70 }]}>
      <View style={styles.searchRow}>
        <TextInput style={styles.searchInput} placeholder="Search groups" placeholderTextColor="#aaa" />
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>All groups</Text>
        </TouchableOpacity>
      </View>
      {groups.map(group => (
        <TouchableOpacity key={group.id} style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupName}>{group.name}</Text>
            <View style={[styles.statusBadge, group.status === 'Active' && styles.activeBadge]}>
              <Text style={styles.statusText}>{group.status}</Text>
            </View>
          </View>
          <Text style={styles.groupMembers}>{group.members} in Negombo</Text>
          <Text style={styles.groupDesc}>{group.desc}</Text>
          {group.badge && <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderEvents = () => (
    <ScrollView style={styles.content}>
      <View style={styles.eventsHeader}>
        <Text style={styles.eventsTitle}>Upcoming Events</Text>
        <TouchableOpacity style={styles.createEventBtn}>
          <Text style={styles.createEventText}>+ Create Event</Text>
        </TouchableOpacity>
      </View>
      {events.map(event => (
        <TouchableOpacity key={event.id} style={styles.eventCard}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventLocation}>{event.location}</Text>
          <Text style={styles.eventAttendees}>{event.attendees}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderEmergency = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.emergencyTitle}>Emergency & Response</Text>
      {emergencies.map(emergency => (
        <View key={emergency.id} style={[styles.alertCard, { backgroundColor: emergency.severity === 'high' ? '#fee2e2' : '#fef3c7' }]}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>{emergency.title}</Text>
            <Ionicons name={emergency.severity === 'high' ? 'warning' : 'information-circle'} size={20} color="#dc2626" />
          </View>
          <Text style={styles.alertDesc}>{emergency.desc}</Text>
          <View style={styles.alertFooter}>
            <TouchableOpacity style={styles.viewDetailsBtn}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareText}>Share Alert</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.contactBtn}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.contactText}>119/110</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactBtn}>
          <Ionicons name="boat" size={20} color="#fff" />
          <Text style={styles.contactText}>94 11 4564</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactBtn}>
          <Ionicons name="alert-circle" size={20} color="#fff" />
          <Text style={styles.contactText}>94 11 2606</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderChat = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.chatTitle}>All Chats</Text>
      {chats.map(chat => (
        <TouchableOpacity key={chat.id} style={styles.chatCard}>
          <View style={styles.chatAvatar} />
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>{chat.name}</Text>
            <Text style={styles.chatLastMsg}>{chat.lastMsg}</Text>
          </View>
          <View style={styles.chatMeta}>
            <Text style={styles.chatTime}>{chat.time}</Text>
            {chat.unread > 0 && <View style={styles.unreadBadge}><Text style={styles.unreadText}>{chat.unread}</Text></View>}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'groups': return renderGroups();
      case 'events': return renderEvents();
      case 'emergency': return renderEmergency();
      case 'chat': return renderChat();
      default: return renderGroups();
    }
  };

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SkyTrace Community</Text>
        <Text style={styles.headerSubtitle}>Connect, share and learn with weather enthusiasts, farmers, fishermen, and researchers</Text>
        <View style={styles.statsRow}>
          {stats.map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Community Hub */}
      <View style={styles.hubSection}>
        <Text style={styles.hubTitle}>Community Hub</Text>
        <View style={styles.actionBtns}>
          <TouchableOpacity style={styles.createBtn}>
            <Text style={styles.createText}>+ Create Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emergencyBtn}>
            <Text style={styles.emergencyText}>🚨</Text>
          </TouchableOpacity>
        </View>
        {renderTabBar()}
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 70 },
  backButton: { padding: 10, position: 'absolute', top: 40, left: 20, zIndex: 10 },
  header: { padding: 20, paddingTop: 80 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  headerSubtitle: { color: '#ccc', fontSize: 14, marginBottom: 20, lineHeight: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  statCard: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#aaa', fontSize: 12 },
  hubSection: { flex: 1, paddingHorizontal: 20 },
  hubTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  actionBtns: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  createBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)' },
  createText: { color: '#fff', fontSize: 14 },
  emergencyBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ef4444', alignItems: 'center', justifyContent: 'center' },
  emergencyText: { color: '#fff', fontSize: 20 },
  tabBar: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 4, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', position: 'relative' },
  activeTab: { borderRadius: 6 },
  tabText: { color: '#aaa', fontSize: 14, fontWeight: '500' },
  activeTabText: { color: '#fff' },
  activeIndicator: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: '#fff' },
  content: { flex: 1 },
  searchRow: { flexDirection: 'row', marginBottom: 20 },
  searchInput: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', marginRight: 10 },
  filterBtn: { paddingHorizontal: 15, paddingVertical: 12, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)' },
  filterText: { color: '#fff' },
  groupCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 15, marginBottom: 15, position: 'relative' },
  groupHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  groupName: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, backgroundColor: 'rgba(34,197,94,0.2)' },
  activeBadge: { backgroundColor: 'rgba(34,197,94,0.2)' },
  statusText: { color: '#22c55e', fontSize: 12 },
  groupMembers: { color: '#aaa', fontSize: 12, marginBottom: 5 },
  groupDesc: { color: '#ccc', fontSize: 14 },
  newBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#ef4444', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  newBadgeText: { color: '#fff', fontSize: 10 },
  eventsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  eventsTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  createEventBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)' },
  createEventText: { color: '#fff', fontSize: 14 },
  eventCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 15, marginBottom: 15 },
  eventName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  eventTime: { color: '#aaa', fontSize: 12, marginBottom: 5 },
  eventLocation: { color: '#aaa', fontSize: 12, marginBottom: 5 },
  eventAttendees: { color: '#ccc', fontSize: 14 },
  emergencyTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  alertCard: { borderRadius: 12, padding: 15, marginBottom: 15 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  alertTitle: { color: '#dc2626', fontSize: 16, fontWeight: 'bold', flex: 1 },
  alertDesc: { color: '#666', fontSize: 14, marginBottom: 15, lineHeight: 20 },
  alertFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  viewDetailsBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.2)' },
  viewDetailsText: { color: '#fff', fontSize: 12 },
  shareBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, backgroundColor: 'rgba(59,130,246,0.2)' },
  shareText: { color: '#3b82f6', fontSize: 12 },
  contactRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  contactBtn: { backgroundColor: '#3b82f6', borderRadius: 10, padding: 15, alignItems: 'center', flex: 1, marginHorizontal: 5 },
  contactText: { color: '#fff', fontSize: 12, marginTop: 5 },
  chatTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  chatCard: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 15, marginBottom: 15, alignItems: 'center' },
  chatAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#aaa', marginRight: 15 },
  chatInfo: { flex: 1 },
  chatName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  chatLastMsg: { color: '#ccc', fontSize: 14 },
  chatMeta: { alignItems: 'flex-end' },
  chatTime: { color: '#aaa', fontSize: 12, marginBottom: 5 },
  unreadBadge: { backgroundColor: '#ef4444', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, minWidth: 20, alignItems: 'center' },
  unreadText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});