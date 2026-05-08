import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const RouteData = ({ name, src_server, dest_server, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.src_server}>
          <Text style={{ fontWeight: 'bold', color: '#0D253C' }}>Source: </Text>
          {src_server}
        </Text>
        <Text style={styles.dest_server}>
          <Text style={{ fontWeight: 'bold', color: '#0D253C' }}>Destination: </Text>
          {dest_server}
        </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.view}>View {'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardLeft: { flex: 1 },
  name: { fontSize: 15, fontWeight: 'bold', color: '#0D253C', marginBottom: 4 },
  src_server: { fontSize: 12, color: '#555', marginBottom: 4 },
  dest_server: { fontSize: 12, color: '#555', marginBottom: 4 },
  view: { fontSize: 13, fontWeight: 'bold', color: '#0D253C' },
});

export default RouteData;
