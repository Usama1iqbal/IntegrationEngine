import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const BlueButton = ({ title, onPress, style }) => {
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
    marginTop: 70,

    backgroundColor: '#2F80ED',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 40,
    width: 200,

    alignItems: 'center',
    justifyContent: 'center',

    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    justifyContent: 'center',
  },
});

export default BlueButton;
