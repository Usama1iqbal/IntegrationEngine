import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { addServerToDB } from '../API/Home';

import TextInputField from './components/TextInputField';
import Button from './components/Button';
import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';
import ScrollViewContainer from './components/ScrollViewContainer';
import Dropdown from './components/Dropdown';
import Header from '../screen/components/Header';

const AddServer = ({ navigation }) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [name, setName] = useState('');
  const [protocol, setProtocol] = useState('FHIR');
  const [category, setCategory] = useState('EHR');

  const handleAddServer = async () => {
    if (!name || !ip || !port) {
      Alert.alert('Error');
      return;
    }

    const payload = {
      name: name,
      ip: ip,
      port: parseInt(port, 10),
      protocol: protocol,
      category: category,
    };

    try {
      console.log('Sending Payload:', JSON.stringify(payload));
      const response = await addServerToDB(payload);

      if (response) {
        Alert.alert('Success ', 'Added!');
        navigation.navigate('DashBoard');
      }
    } catch (error) {
      const detail = error.response?.data?.detail;

      const message =
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
          ? detail.map(d => d.msg).join(', ')
          : error.message || 'Connection fail';

      Alert.alert('Backend Error', message);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollViewContainer>
        <Header title="Add Server" fontSize={25} />

        <TextInputField
          title="Server IP"
          placeholder="e.g. 8.8.8.8"
          value={ip}
          onChangeText={setIp}
        />
        <TextInputField
          title="Server Port"
          placeholder="e.g. 443"
          value={port}
          keyboardType="numeric"
          onChangeText={setPort}
        />
        <TextInputField
          title="Server Name"
          placeholder="Enter Server Name"
          value={name}
          onChangeText={setName}
        />

        <View style={{ marginTop: 10 }}>
          <Dropdown
            title="Protocol"
            options={['FHIR', 'HL7']}
            onSelect={val => setProtocol(val)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Dropdown
            title="Category"
            options={['EHR', 'LIS', 'Payer', 'PHR']}
            onSelect={val => setCategory(val)}
          />
        </View>

        <View style={{ marginVertical: 50, alignItems: 'center' }}>
          <Button title="Add Server" onPress={handleAddServer} />
        </View>
      </ScrollViewContainer>

      <NavigationHomeEndPointRoutesLogs />
    </View>
  );
};

export default AddServer;
