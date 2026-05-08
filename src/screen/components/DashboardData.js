import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const DashBoardData = ({ name, protocol, status, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.protocol}>Protocol: {protocol}</Text>
        <Text style={status === 'Active' ? styles.active : styles.inactive}>
          {status}
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
  protocol: { fontSize: 12, color: '#555', marginBottom: 4 },
  active: { fontSize: 12, fontWeight: 'bold', color: '#0dba13ff' },
  inactive: { fontSize: 12, fontWeight: 'bold', color: '#c41c22ff' },
  view: { fontSize: 13, fontWeight: 'bold', color: '#0D253C' },
});

export default DashBoardData;
