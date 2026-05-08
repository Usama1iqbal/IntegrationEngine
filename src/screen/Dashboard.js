import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { getAllServers } from '../API/Home2';

import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import Box from './components/Box';
import Button from './components/Button';
import DashBoardData from './components/DashboardData';
import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';

const DashBoard = ({ navigation }) => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      const data = await getAllServers();
      setServers(data);
    } catch (error) {
      console.log('Fetch fail: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  const total_servers_conected = servers?.length;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollViewContainer>
        <Header title="Dashboard" fontSize={24} />
        <Box total_servers_connected={total_servers_conected} />

        <View style={styles.serverHeaderRow}>
          <Header title="Server" fontSize={20} />
          <Button
            title="Add Server"
            onPress={() => navigation.navigate('AddServer')}
          />
        </View>

        {/* <View style={[styles.serverHeaderRow, styles.headerBorder]}>
          <Text style={styles.middleTitle}>Server Name</Text>
          <Text style={styles.middleTitle}>Protocol</Text>
          <Text style={styles.middleTitle}>Status</Text>
          <Text style={styles.middleTitle}>Detail</Text>
        </View> */}

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0D253C"
            style={{ marginTop: 20 }}
          />
        ) : (
          servers.map((item, index) => (
            <DashBoardData
              key={item.server_id || index}
              name={item.name}
              protocol={item.protocol}
              status={item.status}
              onPress={() =>
                navigation.navigate('ServerDetail', { server: item })
              }
            />
          ))
        )}
      </ScrollViewContainer>

      <NavigationHomeEndPointRoutesLogs anavigation={navigation} activeTab="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 5,
  },
  middleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#aaa',
  },
});

export default DashBoard;
