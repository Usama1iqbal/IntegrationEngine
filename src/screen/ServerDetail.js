import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextInputField from './components/TextInputField';
import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';
import Button from './components/Button';

const ServerDetail = ({ route, navigation }) => {
  const server = route.params?.server || {};

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollViewContainer>
        <Header title="Server Details" fontSize={25} />

        <TextInputField title="Server Name" value={server.name} />
        <TextInputField title="Protocol" value={server.protocol} />
        <TextInputField title="Status" value={server.status} />
        <TextInputField title="IP" value={server.ip} />
        <TextInputField title="Port" value={String(server.port || '')} />
        <TextInputField title="Category" value={String(server.category || '')} />

        {/* <View style={styles.buttonRow}>
          <Button title="Edit" onPress={() => console.log('Edit')} />
          <Button title="Delete" onPress={() => console.log('Delete')} />
        </View> */}
      </ScrollViewContainer>
      <NavigationHomeEndPointRoutesLogs activeTab="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 30,
    marginBottom: 100,
  },
});

export default ServerDetail;