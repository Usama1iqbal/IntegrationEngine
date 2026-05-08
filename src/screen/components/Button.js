import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margine: 10,
    padding: 10,
    backgroundColor: '#2D3E50', // Dark Blue
    paddingVertical: 10, // Height khud adjust hogi
    paddingHorizontal: 10, // Side padding
    borderRadius: 10,
    width: 120,
  },
  buttonText: {
    color: 'white',
    justifyContent: 'center',
  },
});

export default Button;
