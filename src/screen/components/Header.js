import React from 'react';
import { Text, Style, StyleSheet, TextInput } from 'react-native';
const Header = ({ title, onPress, style, fontSize }) => {
  return (
    <Text style={[styles.Header, { fontSize }]} onPress={() => console.log('')}>
      {title}
    </Text>
  );
};
const styles = StyleSheet.create({
  Header: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#0D253C',
    marginBottom: 20,
    marginTop: 10,
  },
});
export default Header;
