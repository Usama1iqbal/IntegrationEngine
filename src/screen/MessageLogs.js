import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import Header from './components/Header';
import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';
import ServerList from './components/ServerList';
import { getLogs } from '../API/Home';

const MessageLogs = ({ navigation }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await getLogs();
      console.log('API Data:', data); 

      const formatted = data.map(item => ({
        id: item.log_id.toString(),
        engineName: item.operation_heading,
        description: item.operation_message,
        status: item.status,
        timestamp: item.datetime,
      }));

      console.log('Formatted:', formatted); 
      setLogs(formatted);
    } catch (err) {
      console.log('Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
    
      <Header title="Message Logs" fontSize={24} />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2F80ED"
          style={{ marginTop: 40 }}
        />
      ) : (
        <ServerList logs={logs} navigation={navigation} /> 
      )}

      <NavigationHomeEndPointRoutesLogs
        activeTab="Logs"
        navigation={navigation}
      />
    </View>
  );
};

export default MessageLogs;
