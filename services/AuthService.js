import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const TOKEN_URL = 'https://login.meteomatics.com/api/v1/token';
const USERNAME = 'skytrace_perera_tharusha';
const PASSWORD = 'vfK56ZmAQMCXr5oIR7xi';
const TOKEN_CACHE_KEY = 'meteomatics_token';
const TOKEN_EXPIRY = 2 * 60 * 60 * 1000; // 2 hours

export const getAccessToken = async () => {
  try {
    const cachedToken = await AsyncStorage.getItem(TOKEN_CACHE_KEY);
    if (cachedToken) {
      const { token, expires } = JSON.parse(cachedToken);
      if (Date.now() < expires) {
        console.log('Using cached token');
        return token;
      }
    }

    const credentials = btoa(`${USERNAME}:${PASSWORD}`);
    const response = await fetch(TOKEN_URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Token fetch failed: ${response.status} - ${await response.text()}`);
    }

    const { access_token: token, expires_in } = await response.json();
    const expires = Date.now() + expires_in * 1000;
    await AsyncStorage.setItem(TOKEN_CACHE_KEY, JSON.stringify({ token, expires }));
    console.log('New token fetched');
    return token;
  } catch (error) {
    console.error('Token error:', error);
    Alert.alert('Auth Error', 'Check username/password in .env');
    return null;
  }
};