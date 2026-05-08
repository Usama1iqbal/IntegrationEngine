import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const Box = ({total_servers_connected}) => {
  return (
    <View style={styles.statsCard}>
      <View>
        <Text style={styles.statText}>
          Total Server Connected:{' '}
          <Text style={{ fontWeight: 'normal' }}>{total_servers_connected}</Text>
        </Text>
        <Text style={styles.statText}>
          Today's Message Received:{' '}
          <Text style={{ fontWeight: 'normal' }}>10</Text>
        </Text>
        <Text style={styles.statText}>
          Today's Message Sent: <Text style={{ fontWeight: 'normal' }}>10</Text>
        </Text>
        <Text style={styles.statText}>
          Today's Error: <Text style={{ fontWeight: 'normal' }}>0</Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0a0b0eff',
    marginBottom: 30,

    // Shadow
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  statText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0D253C',
    marginBottom: 8,
  },

  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D253C',
  },
});
export default Box;
