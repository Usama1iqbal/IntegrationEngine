import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ServerList = ({ logs = [], navigation }) => {  // ✅ navigation prop add kiya
  const renderItem = ({ item }) => {
    const isSuccess = item.status?.toLowerCase() === 'success';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('MessageView', { log_id: item.id })}  // ✅ navigate on press
      >
        {/* Left - Status Icon */}
        <View style={styles.iconContainer}>
          <View style={[styles.statusCircle, { borderColor: isSuccess ? '#27AE60' : '#EB5757' }]}>
            <Text style={{ fontSize: 14 }}>{isSuccess ? '✓' : '✗'}</Text>
          </View>
        </View>

        {/* Middle - Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.engineName}>{item.engineName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={[styles.status, { color: isSuccess ? '#27AE60' : '#EB5757' }]}>
            {item.status}
          </Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>

        {/* Right - Arrow */}
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={logs}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No logs available</Text>
        </View>
      }
    />
  );
};

// styles same rehne do

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 100, // space for bottom nav
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
  },
  infoContainer: {
    flex: 1,
  },
  engineName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  timestamp: {
    fontSize: 11,
    color: '#aaa',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  arrow: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: '300',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default ServerList;