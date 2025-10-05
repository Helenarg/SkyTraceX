import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const getUserLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access needed for forecasts.');
      return null;
    }
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    return { lat: location.coords.latitude, lon: location.coords.longitude };
  } catch (error) {
    console.error('Location error:', error);
    Alert.alert('Location Error', 'Using fallback location (Colombo, LK).');
    return { lat: 6.9271, lon: 79.8612 };
  }
};