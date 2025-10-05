import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import BottomNav from "../components/BottomNav"; // Import BottomNav component

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const userDoc = await getDoc(doc(db, "users", uid));
        setUserData(userDoc.data());
      }
    };
    const fetchPosts = async () => {
      const postsSnapshot = await getDocs(collection(db, "posts"));
      const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData.filter((p) => p.userId === auth.currentUser?.uid));
    };

    Promise.all([fetchUser(), fetchPosts()]).then(() => setLoading(false));
  }, []);

  const renderHeader = () => (
    <View>
      {/* Navbar with Back Button */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Profile</Text>
      </View>

      <View style={styles.header}>
        <Image
          source={{ uri: userData?.profilePic || "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userData?.name || "User Name"}</Text>
          <Text style={styles.bio}>{userData?.bio || "Your bio here..."}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={26} color="#00E0FF" />
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{posts.length}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{userData?.followers?.length || 0}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{userData?.following?.length || 0}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your Posts</Text>
    </View>
  );

  if (loading) {
    return (
      <LinearGradient colors={["#0A0B14", "#270054"]} style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#00E0FF" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.postsGrid}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        )}
      />
      {/* Bottom Navbar */}
      <BottomNav navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 70 }, // Adjust padding for BottomNav
  loadingContainer: { justifyContent: "center", alignItems: "center" },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backButton: { padding: 10 },
  navTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  header: { flexDirection: "row", alignItems: "center", margin: 60, justifyContent: "space-between" },
  profileImage: { width: 90, height: 90, borderRadius: 50, borderWidth: 2, borderColor: "#00E0FF" },
  infoContainer: { flex: 1, marginLeft: 30 },
  name: { fontSize: 20, fontWeight: "bold", color: "white" },
  bio: { color: "#94A3B8", marginTop: 4 },
  stats: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 15 },
  statBox: { alignItems: "center" },
  statNumber: { color: "white", fontWeight: "bold", fontSize: 18 },
  statLabel: { color: "#94A3B8" },
  sectionTitle: { color: "white", fontSize: 18, marginLeft: 20, marginVertical: 10 },
  postsGrid: { paddingHorizontal: 10 },
  postImage: { width: 110, height: 110, margin: 5, borderRadius: 10 },
});