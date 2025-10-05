// services/WeatherService.js
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const API_BASE = 'https://api.meteomatics.com';
const TOKEN_URL = 'https://login.meteomatics.com/api/v1/token';
const USERNAME = 'skytrace_perera_tharusha'; 
const PASSWORD = 'vfK56ZmAQMCXr5oIR7xi'; 
const CACHE_KEY = 'weather_data';
const TOKEN_CACHE_KEY = 'meteomatics_token';
const CACHE_EXPIRY = 15 * 60 * 1000; // 15min for data
const TOKEN_EXPIRY = 2 * 60 * 60 * 1000; // 2h for token

// Fetch/refresh OAuth token using username/password Basic Auth
const getAccessToken = async () => {
  if (!USERNAME || !PASSWORD) {
    throw new Error('Missing METEOMATICS_USERNAME or METEOMATICS_PASSWORD in .env');
  }

  try {
    const cachedToken = await AsyncStorage.getItem(TOKEN_CACHE_KEY);
    if (cachedToken) {
      const { token, expires } = JSON.parse(cachedToken);
      if (Date.now() < expires) {
        console.log('Using cached token');
        return token;
      }
    }

    // Fetch new token with Basic Auth
    const credentials = btoa(`${USERNAME}:${PASSWORD}`);
    const response = await fetch(TOKEN_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (!response.ok) {
      throw new Error(`Token fetch failed: ${response.status} - ${await response.text()}`);
    }
    const { access_token: token, expires_in } = await response.json();
    const expires = Date.now() + (expires_in * 1000);
    await AsyncStorage.setItem(TOKEN_CACHE_KEY, JSON.stringify({ token, expires }));
    console.log('New token fetched');
    return token;
  } catch (error) {
    console.error('Token error:', error);
    Alert.alert('Auth Error', 'Check username/password in .env');
    return null;
  }
};

// Auto-fetch location (unchanged from your patterns)
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

// Fetch weather data (exact HTML/PDF format: dates, PT1H, params, ?access_token)
export const fetchWeatherData = async (lat, lon, role = 'general') => {
  const token = await getAccessToken();
  if (!token) throw new Error('Failed to get auth token');

  const now = new Date().toISOString(); // Current time in ISO 8601 format
  const end = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours later in ISO 8601 format

  // Use only supported parameters for Sri Lanka
  const params = [
    "t_2m:C", // Temperature at 2 meters
    "relative_humidity_2m:p", // Relative humidity at 2 meters
    "wind_speed_10m:ms", // Wind speed at 10 meters
    "msl_pressure:hPa", // Mean sea level pressure
    "precip_1h:mm", // Precipitation in the last hour
    "sunrise:sql", // Sunrise time
    "sunset:sql", // Sunset time
    "wind_gusts_10m_1h:ms", // Wind gusts in the last hour
  ].join(",");

  const url = `${API_BASE}/${now}--${end}:PT1H/${params}/${lat},${lon}/json?access_token=${token}`;
  console.log('API Request URL:', url); // Debug: Exact call

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${await response.text()}`);
    }
    const json = await response.json();
    console.log('Weather Data:', json.data); // Debug: Log the weather data
    return json.data;
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
};

// Role-specific params (from HTML/PDF + features; comma-separated codes)
const getRoleParams = (role) => {
  const base = 't_2m:C,relative_humidity_2m:p,wind_speed_10m:ms,msl_pressure:hPa,precip_1h:mm,sunrise:sql,sunset:sql,wind_gusts_10m_1h:ms,cloud_cover:p,visibility:m'; // Core from PDF
  switch (role) {
    case 'farmer':
      return `${base},soil_moisture_index_-15cm:idx,evapotranspiration_00h:mm,leaf_wetness:idx,growing_degree_days_accumulated:gdd,phytophthora_negative:idx`;
    case 'fisherman':
      return `${base},significant_wave_height:m,t_sea_sfc:C,ocean_current_speed:ms,tidal_amplitude:cm`;
    case 'stargazer':
      return `${base},moon_phase:idx,moon_elevation:d,sun_elevation:d`;
    case 'enthusiast':
    case 'outdoor':
      return `${base},pollen:grainsm3,air_quality:idx,grass_pollen_warning:idx,leisure_bbq:idx,leisure_hiking:idx`;
    default:
      return base;
  }
};

// Compute metrics (PDF examples: visibilityIndex = 100 - cloud_cover; wind advisory >10 m/s)
export const computeMetrics = (data, role) => {
  // Helper function to extract the most recent value for a parameter
  const extractLatest = (parameter) => {
    const paramData = data.find((item) => item.parameter === parameter);
    if (paramData && paramData.coordinates[0]?.dates.length > 0) {
      return paramData.coordinates[0].dates[0].value; // Get the first entry in 'dates'
    }
    return null;
  };

  // Extract the most recent values for temperature, wind speed, precipitation, pressure, and humidity
  const temp = extractLatest('t_2m:C'); // Temperature
  const windSpeed = extractLatest('wind_speed_10m:ms'); // Wind speed
  const precip = extractLatest('precip_1h:mm'); // Precipitation
  const pressure = extractLatest('msl_pressure:hPa'); // Pressure
  const humidity = extractLatest('relative_humidity_2m:p'); // Humidity

  // Extract sunrise and sunset times (convert from GMT to local time)
  const sunriseGMT = extractLatest('sunrise:sql');
  const sunsetGMT = extractLatest('sunset:sql');
  const sunrise = sunriseGMT ? new Date(sunriseGMT).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
  const sunset = sunsetGMT ? new Date(sunsetGMT).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  // Role-specific metrics
  let roleData = {};
  let roleAlert = null;

  if (role === 'farmer') {
    const soilMoisture = extractLatest('soil_moisture_index_-15cm:idx');
    roleData = {
      irrigationNeed: soilMoisture < 0.3 ? 'Irrigation needed' : 'Optimal',
    };
    roleAlert = soilMoisture < 0.3 ? 'Irrigation needed' : null;
  } else if (role === 'fisherman') {
    const waveHeight = extractLatest('significant_wave_height:m');
    roleData = {
      waveTideSafety: waveHeight > 2 ? 'Rough seas' : 'Safe',
    };
    roleAlert = waveHeight > 2 ? 'Rough seas' : null;
  }

  return {
    summary: { temp, windSpeed, precip, pressure, humidity },
    sunrise,
    sunset,
    roleAlert,
    ...roleData,
    hourly: data, // Full array for trends/charts
  };
};

export const predictHourlyRain = (hourlyData) => {
  if (!hourlyData || hourlyData.length < 4) return [];

  const predictions = [];
  const numHours = hourlyData[0]?.coordinates[0]?.dates?.length || 0;

  for (let i = 3; i < numHours; i++) {
    const temp = extractHourly(hourlyData, 't_2m:C', i);
    const humidity = extractHourly(hourlyData, 'relative_humidity_2m:p', i);
    const pressure = extractHourly(hourlyData, 'msl_pressure:hPa', i);
    const windSpeed = extractHourly(hourlyData, 'wind_speed_10m:ms', i);
    const precip = extractHourly(hourlyData, 'precip_1h:mm', i);

    let lagPrecip = 0, lagHumidity = 0;
    for (let lag = 1; lag <= 3; lag++) {
      lagPrecip += extractHourly(hourlyData, 'precip_1h:mm', i - lag) || 0;
      lagHumidity += extractHourly(hourlyData, 'relative_humidity_2m:p', i - lag) || 0;
    }
    lagPrecip /= 3;
    lagHumidity /= 3;

    let linear = 0;
    linear += (precip || 0) * 80;
    linear += ((humidity || 0) / 100) * 15;
    linear += ((1013 - (pressure || 1013)) * 0.1) * 10;
    linear += (temp >= 20 && temp <= 30 ? 10 : (temp < 15 ? -5 : 0));
    linear += (windSpeed > 10 ? -10 : (windSpeed > 2 && windSpeed < 5 ? 5 : 0));
    linear += lagPrecip * 20 + ((lagHumidity / 100) * 10);

    const prob = Math.min(100, Math.max(0, 100 / (1 + Math.exp(-linear / 100))));
    const willRain = prob > 50;
    const hour = new Date(hourlyData[0].coordinates[0].dates[i]?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    predictions.push({ hour, rainProb: Math.round(prob), willRain, temp, windSpeed, humidity });
  }
  return predictions;
};

// Helper function to extract hourly data
export const extractHourly = (hourlyData, parameter, index) => {
  const paramData = hourlyData.find((item) => item.parameter === parameter);
  if (!paramData || !paramData.coordinates[0]?.dates[index]) return null;
  return paramData.coordinates[0].dates[index].value;
};

export const predictFarmingConditions = (weatherData) => {
  // Helper function to extract the most recent value for a parameter
  const { temp, windSpeed, precip, pressure, humidity } = weatherData.summary;  
  
  // Calculate drought risk based on precipitation
  const droughtRisk = precip < 0.1 ? 100 : 0; // High risk if precipitation is less than 0.1 mm

  // Calculate flood risk based on precipitation
  const floodRisk = precip > 10 ? 100 : 0; // High risk if precipitation exceeds 10 mm

  // Return the calculated conditions
  return {
    droughtRisk,
    floodRisk,
    avgTemp: Math.round(temp), // Average temperature
  };
};