import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ActionButtons({ actions }) {
  return (
    <View style={styles.row}>
      {actions.map((action, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={action.onPress}>
          <Text style={styles.text}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', padding: 20 },
  button: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: { color: '#fff', fontSize: 14 },
});