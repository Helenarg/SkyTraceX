// screens/HomeScreen.js (formerly DashboardScreen.js)
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit'; // Import LineChart
import { AuthContext } from '../context/AuthProvider';
import { getUserLocation, fetchWeatherData, computeMetrics } from '../services/WeatherService';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const { user, userData } = useContext(AuthContext);
  const [weatherData, setWeatherData] = useState(null);
  const [chartData, setChartData] = useState(null);
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

            console.log('Data:', data);
            console.log('Weather Data:', weatherData);
          }
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [userData]);

  if (loading) {
    return (
      <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" style={styles.loading} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0A0B14", "#270054"]} style={styles.container}>
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
            {weatherData.roleAlert && <Text style={styles.alert}>{weatherData.roleAlert}</Text>}
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
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  alert: { color: '#ef4444', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  chartContainer: {
    alignItems: 'center', // Center the chart horizontally
    justifyContent: 'center', // Center the chart vertically
    padding: 10, // Add padding around the chart
  },
});