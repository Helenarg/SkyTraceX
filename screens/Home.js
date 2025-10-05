import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons'; // For back button icon
import { AuthContext } from '../context/AuthProvider';
import { getUserLocation, fetchWeatherData, computeMetrics } from '../services/WeatherService';
import BottomNav from '../components/BottomNav'; // Import BottomNav component

const screenWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [weatherData, setWeatherData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [hourlyRainProbs, setHourlyRainProbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const location = await getUserLocation();
        if (location) {
          const data = await fetchWeatherData(location.lat, location.lon, userData?.role || 'general');
          const processedData = computeMetrics(data, userData?.role || 'general');
          setWeatherData(processedData);

          // Prepare chart data for temperature
          const tempData = data.find((param) => param.parameter === 't_2m:C');
          if (tempData) {
            const dates = tempData.coordinates[0].dates.map((entry) =>
              new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            );
            const values = tempData.coordinates[0].dates.map((entry) => entry.value);

            setChartData({
              labels: dates.slice(0, 6), // Show only the first 6 time points for readability
              datasets: [{ data: values.slice(0, 6) }], // Corresponding temperature values
            });
          }

          // Predict hourly rain probabilities
          const predictions = predictHourlyRain(data);
          setHourlyRainProbs(predictions);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [userData]);

  // Rain Prediction Algorithm
  const predictHourlyRain = (hourlyData) => {
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

      predictions.push({ hour, rainProb: Math.round(prob), willRain });
    }
    return predictions;
  };

  // Helper function to extract hourly data
  const extractHourly = (hourlyData, parameter, index) => {
    const paramData = hourlyData.find((item) => item.parameter === parameter);
    if (!paramData || !paramData.coordinates[0]?.dates[index]) return null;
    return paramData.coordinates[0].dates[index].value;
  };

  // Render hourly rain predictions
  const renderHourlyRain = () => {
    if (!hourlyRainProbs || hourlyRainProbs.length === 0) {
      return <Text style={styles.detail}>No hourly rain predictions available.</Text>;
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
        {hourlyRainProbs.map((prediction, index) => (
          <View key={index} style={styles.hourlyCard}>
            <Text style={styles.hour}>{prediction.hour}</Text>
            <Text style={[styles.prob, prediction.willRain && styles.rainProb]}>
              {prediction.rainProb}% {prediction.willRain ? '☔' : '☀️'}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  if (loading) {
    return (
      <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" style={styles.loading} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Weather Dashboard</Text>
        <Text style={styles.subtitle}>
          Personalized for {userData?.role || 'General User'}, {userData?.name || 'User'}!
        </Text>

        {/* Weather Summary */}
        {weatherData && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Overview</Text>
            <Text style={styles.detail}>
              Temp: {(weatherData.summary.temp ?? 0).toFixed(1)}°C | Humidity: {(weatherData.summary.humidity ?? 0).toFixed(0)}%
            </Text>
            <Text style={styles.detail}>
              Wind Speed: {(weatherData.summary.windSpeed ?? 0).toFixed(1)} m/s | Pressure: {(weatherData.summary.pressure ?? 0).toFixed(0)} hPa
            </Text>
            <Text style={styles.detail}>
              Precipitation: {(weatherData.summary.precip ?? 0).toFixed(1)} mm
            </Text>
          </View>
        )}

        {/* Sunrise and Sunset */}
        {weatherData && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sunrise & Sunset</Text>
            <Text style={styles.detail}>Sunrise: {weatherData.sunrise || 'N/A'}</Text>
            <Text style={styles.detail}>Sunset: {weatherData.sunset || 'N/A'}</Text>
          </View>
        )}

        {/* Temperature Chart */}
        {chartData && (
          <View style={[styles.card, styles.chartContainer]}>
            <Text style={styles.cardTitle}>Temperature Over Time</Text>
            <LineChart
              data={{
                labels: chartData.labels,
                datasets: chartData.datasets,
              }}
              width={screenWidth - 60} // Adjust width to fit the screen with padding
              height={220}
              chartConfig={{
                backgroundColor: '#1E1E1E',
                backgroundGradientFrom: '#1E1E1E',
                backgroundGradientTo: '#1E1E1E',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 194, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#00C2FF',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
                alignSelf: 'center', // Center the chart horizontally
              }}
            />
          </View>
        )}

        {/* Hourly Rain Prediction */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hourly Rain Prediction</Text>
          {renderHourlyRain()}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 70, paddingTop: 70 },
  scroll: { padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#ccc', fontSize: 16, marginBottom: 20 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  detail: { color: '#ccc', fontSize: 14, marginBottom: 5 },
  hourlyScroll: { marginTop: 10 },
  hourlyCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    width: 80,
  },
  hour: { color: '#fff', fontSize: 14, marginBottom: 5 },
  prob: { color: '#ccc', fontSize: 14 },
  rainProb: { color: '#ef4444', fontWeight: 'bold' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  backButton: { padding: 10, position: 'absolute', top: 40, left: 20, zIndex: 10 },
});