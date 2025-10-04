// services/MeteomaticsService.js
import { Alert } from 'react-native';

const METEOMATICS_API_URL = 'https://api.meteomatics.com';
const API_KEY = 'YOUR_METEOMATICS_API_KEY'; // Replace with your actual API key from Meteomatics

export const fetchWeatherData = async (lat, lon, startDate, endDate, parameters) => {
  try {
    const paramsString = parameters.join(':');
    const url = `${METEOMATICS_API_URL}/${startDate}--${endDate}:PT1H/${paramsString}/${lat},${lon}/json?access_token=${API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    Alert.alert('Error', `Failed to fetch weather data: ${error.message}`);
    return null;
  }
};

// Computed metrics based on PDF guidelines
export const computeSkyVisibilityIndex = (cloudCover, visibility, humidity) => {
  // Simple weighted score: 100 - cloud_cover, adjusted by visibility and humidity
  const baseIndex = 100 - (cloudCover || 0);
  const adjusted = baseIndex * (visibility || 100) / 100 * (1 - (humidity || 50) / 200);
  return Math.max(0, Math.min(100, Math.round(adjusted)));
};

export const computeWindAdvisory = (windSpeed, gusts) => {
  const speed = windSpeed || 0;
  const gust = gusts || 0;
  return Math.max(speed, gust) > 10 ? 'High' : Math.max(speed, gust) > 5 ? 'Moderate' : 'Low';
};