import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

export default function SettingsScreen({ navigation }) {
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const uid = auth.currentUser?.uid;
    let imageUrl = null;

    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePics/${uid}.jpg`);
      await uploadBytes(storageRef, blob);
      imageUrl = await getDownloadURL(storageRef);
    }

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      bio,
      ...(imageUrl && { profilePic: imageUrl }),
    });

    Alert.alert("Profile Updated!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: image || "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Update your bio..."
        placeholderTextColor="#94A3B8"
        value={bio}
        onChangeText={setBio}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", alignItems: "center", padding: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "#00E0FF", marginVertical: 30 },
  input: { width: "90%", color: "white", borderWidth: 1, borderColor: "#334155", borderRadius: 10, padding: 10 },
  button: { backgroundColor: "#00E0FF", padding: 10, borderRadius: 10, marginTop: 20, width: "60%", alignItems: "center" },
  buttonText: { color: "#0F172A", fontWeight: "bold" },
});