import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { predictHourlyRain } from '../services/WeatherService'; // Import prediction algorithm

export default function AIProbabilityForecast({ weatherData }) {
  const [probabilities, setProbabilities] = useState([]);

  useEffect(() => {
    if (weatherData && weatherData.hourly) {
      const predictions = predictHourlyRain(weatherData.hourly);
      calculateProbabilities(predictions);
    }
  }, [weatherData]);

  const calculateProbabilities = (predictions) => {
    const veryHot = predictions.filter((p) => p.temp >= 35).length / predictions.length * 100;
    const veryCold = predictions.filter((p) => p.temp <= 5).length / predictions.length * 100;
    const veryWet = predictions.filter((p) => p.rainProb >= 70).length / predictions.length * 100;
    const veryWindy = predictions.filter((p) => p.windSpeed >= 15).length / predictions.length * 100;
    const veryUncomfortable = predictions.filter((p) => p.humidity >= 80).length / predictions.length * 100;

    setProbabilities([
      { label: 'Very Hot', value: Math.round(veryHot), icon: '🔥' },
      { label: 'Very Cold', value: Math.round(veryCold), icon: '❄️' },
      { label: 'Very Wet', value: Math.round(veryWet), icon: '🌧️' },
      { label: 'Very Windy', value: Math.round(veryWindy), icon: '💨' },
      { label: 'Very Uncomfortable', value: Math.round(veryUncomfortable), icon: '⚠️' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Probability Forecast</Text>
      <Text style={styles.subtitle}>Machine learning predictions based on weather data</Text>
      {probabilities.map((prob, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.icon}>{prob.icon}</Text>
          <Text style={styles.label}>{prob.label}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${prob.value}%` }]} />
          </View>
          <Text style={styles.value}>{prob.value}%</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2E',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  progressBar: {
    flex: 2,
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#00C2FF',
  },
  value: {
    color: '#fff',
    fontSize: 14,
  },
});