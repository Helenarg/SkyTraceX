import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const HourlyPredictionsRow = ({ predictions }) => {
  if (!predictions || predictions.length === 0) {
    return <Text style={styles.detail}>No hourly rain predictions available.</Text>;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
      {predictions.map((prediction, index) => (
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

const styles = StyleSheet.create({
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
  detail: { color: '#ccc', fontSize: 14, marginBottom: 5 },
});

export default HourlyPredictionsRow;