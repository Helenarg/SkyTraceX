import { getAccessToken } from './AuthService';

const API_BASE = 'https://api.meteomatics.com';

export const fetchWeatherData = async (lat, lon, params) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Failed to get auth token');

  const now = new Date().toISOString();
  const end = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours later

  const url = `${API_BASE}/${now}--${end}:PT1H/${params}/${lat},${lon}/json?access_token=${token}`;
  console.log('API Request URL:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${await response.text()}`);
    }
    const json = await response.json();
    console.log('Weather Data:', json.data);
    return json.data;
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
};