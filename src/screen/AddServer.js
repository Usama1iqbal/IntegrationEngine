import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
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

  const { mutate: addServer } = useMutation({
    mutationFn: addServerToDB,
    onSuccess: () => {
      Alert.alert('Success', 'Added!');
      navigation.navigate('DashBoard');
    },
    onError: error => {
      const detail = error.response?.data?.detail;
      const message =
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
          ? detail.map(d => d.msg).join(', ')
          : error.message || 'Connection fail';
      Alert.alert('Backend Error', message);
    },
  });

  const handleAddServer = () => {
    if (!name || !ip || !port) {
      Alert.alert('Error');
      return;
    }
    addServer({ name, ip, port: parseInt(port, 10), protocol, category });
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
